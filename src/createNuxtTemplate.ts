import fs from 'fs';
import path from 'path';
import { createIg, isIgnored } from './isIgnored';
import { parseQueryFromTS } from './parseQueryFromTS';
import { replaceWithUnderscore } from './replaceWithUnderscore';

const createMethods = (
  indent: string,
  importName: string | undefined,
  pathname: string,
  trailingSlash: boolean
) =>
  `${indent}  $url: ` +
  (opt =>
    `(url${opt ? '?' : ''}: { ${
      importName ? `query${opt ? '?' : ''}: ${importName}${opt ? ' | undefined' : ''}, ` : ''
    }hash?: string | undefined }${opt ? ' | undefined' : ''})`)(!importName?.startsWith('Query')) +
  ` => ({ path: ${/\${/.test(pathname) ? '`' : "'"}${pathname}${
    trailingSlash || pathname === '' ? '/' : ''
  }${/\${/.test(pathname) ? '`' : "'"}${
    importName ? `, query: url${importName.startsWith('Query') ? '' : '?'}.query as any` : ''
  }, hash: url${importName?.startsWith('Query') ? '' : '?'}.hash })`;

const parseQueryFromVue = (file: string, suffix: number) => {
  const fileData = fs.readFileSync(file, 'utf8');
  const typeName = ['Query', 'OptionalQuery'].find(type =>
    new RegExp(`export (interface ${type} ?{|type ${type} ?= ?{)`).test(fileData)
  );

  if (!typeName) return;

  const queryRegExp = new RegExp(`export (interface ${typeName} ?{|type ${typeName} ?= ?{)`);
  const [, typeText, targetText] = fileData.split(queryRegExp);
  const { length } = targetText;
  let cursor = 0;
  let depth = 1;

  while (depth && cursor <= length) {
    if (targetText[cursor] === '}') {
      depth -= 1;
    } else if (targetText[cursor] === '{') {
      depth += 1;
    }

    cursor += 1;
  }

  const importName = `${typeName}${suffix}`;

  return {
    importName,
    importString: `${typeText.replace(typeName, importName)}${targetText
      .slice(0, cursor)
      .replace(/\r/g, '')};\n`
  };
};

export const createNuxtTemplate = (
  input: string,
  output: string,
  ignorePath: string | undefined,
  trailingSlash = false
) => {
  const ig = createIg(ignorePath);
  const imports: string[] = [];
  const getImportName = (file: string) => {
    const result = path.extname(file).startsWith('.ts')
      ? parseQueryFromTS(output, file, imports.length)
      : parseQueryFromVue(file, imports.length);

    if (result) {
      imports.push(result.importString);
      return result.importName;
    }
  };

  const createPathObjString = (
    targetDir: string,
    importBasePath: string,
    indent: string,
    url: string,
    text: string,
    methodsOfIndexTsFile?: string
  ) => {
    indent += '  ';

    const props: string[] = fs
      .readdirSync(targetDir)
      .filter(file =>
        [
          !file.startsWith('-'),
          !/\.s?css$/.test(file),
          !file.endsWith('.d.ts'),
          !isIgnored(ig, ignorePath, targetDir, file)
        ].every(Boolean)
      )
      .sort()
      .map((file, _, arr) => {
        const basename = path.basename(file, path.extname(file));
        let valFn = `${indent}${replaceWithUnderscore(basename)}: {\n<% next %>\n${indent}}`;
        let newUrl = `${url}/${basename}`;

        if (basename.startsWith('_')) {
          const slug = basename.slice(1);
          const isPassValNullable = basename !== file;
          valFn = `${indent}_${slug}: (${slug}${isPassValNullable ? '?' : ''}: string | number${
            isPassValNullable ? ' | undefined' : ''
          }) => ({\n<% next %>\n${indent}})`;
          newUrl = `${url}${
            isPassValNullable ? `\${${slug} !== undefined ? \`/\${${slug}}\` : ''}` : `/\${${slug}}`
          }`;
        }

        const target = path.posix.join(targetDir, file);

        if (fs.statSync(target).isFile() && basename !== 'index' && !arr.includes(basename)) {
          return valFn.replace(
            '<% next %>',
            createMethods(indent, getImportName(target), newUrl, trailingSlash)
          );
        } else if (fs.statSync(target).isDirectory()) {
          const indexFile = fs
            .readdirSync(target)
            .find(name => path.basename(name, path.extname(name)) === 'index');

          return createPathObjString(
            target,
            `${importBasePath}/${file}`,
            indent,
            newUrl,
            valFn.replace('<% next %>', '<% props %>'),
            indexFile &&
              createMethods(
                indent,
                getImportName(path.posix.join(target, indexFile)),
                newUrl,
                trailingSlash
              )
          );
        }

        return '';
      })
      .filter(Boolean);

    return text.replace(
      '<% props %>',
      `${props.join(',\n')}${
        methodsOfIndexTsFile ? `${props.length ? ',\n' : ''}${methodsOfIndexTsFile}` : ''
      }`
    );
  };

  const rootIndexFile = fs
    .readdirSync(input)
    .find(name => path.basename(name, path.extname(name)) === 'index');
  const rootIndent = '';
  let rootMethods;

  if (rootIndexFile) {
    rootMethods = createMethods(
      rootIndent,
      getImportName(path.posix.join(input, rootIndexFile)),
      '',
      trailingSlash
    );
  }

  const text = createPathObjString(input, '.', rootIndent, '', '{\n<% props %>\n}', rootMethods);
  const importsText = imports.filter(i => i.startsWith('import')).join('\n');
  const queriesText = imports.filter(i => !i.startsWith('import')).join('\n');

  return `import type { Plugin } from '@nuxt/types';
${importsText}${importsText && queriesText ? '\n' : ''}
${queriesText}${
    imports.length ? '\n' : ''
  }export const pagesPath = ${text};\n\nexport type PagesPath = typeof pagesPath;
`;
};
