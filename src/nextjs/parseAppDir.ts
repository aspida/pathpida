import fs from 'fs';
import path from 'path';
import { createIg, isIgnored } from '../isIgnored';
import { parseQueryFromTS } from '../parseQueryFromTS';
import { replaceWithUnderscore } from '../replaceWithUnderscore';
import { Slugs } from './parsePagesDir';

export const createMethods = (
  indent: string,
  importName: string | undefined,
  slugs: Slugs,
  pathname: string
) =>
  `${indent}  $url: (url${importName?.startsWith('Query') ? '' : '?'}: { ${
    importName ? `query${importName.startsWith('Optional') ? '?' : ''}: ${importName}, ` : ''
  }hash?: string }) => ({ pathname: '${pathname}' as const${
    slugs.length
      ? `, query: { ${slugs.join(', ')}${
          importName ? `, ...url${importName.startsWith('Query') ? '' : '?'}.query` : ''
        } }`
      : importName
      ? `, query: url${importName.startsWith('Query') ? '' : '?'}.query`
      : ''
  }, hash: url${importName?.startsWith('Query') ? '' : '?'}.hash, path: \`${pathname
    .replace(/\[\[?\.\.\.(.*?)\]\]?/g, `\${$1?.join('/')}`)
    .replace(/\[(.*?)\]/g, `\${$1}`)}\${buildSuffix(url)}\` })`;

export const parseAppDir = (
  input: string,
  output: string,
  ignorePath: string | undefined
): { imports: string[]; text: string } => {
  const ig = createIg(ignorePath);
  const pageFileNames = ['page.tsx', 'page.jsx', 'page.js'];
  const imports: string[] = [];
  const getImportName = (file: string) => {
    const result = parseQueryFromTS(output, file, imports.length);

    if (result) {
      imports.push(result.importString);
      return result.importName;
    }
  };

  const createPathObjString = (
    targetDir: string,
    indent: string,
    url: string,
    slugs: Slugs,
    text: string,
    methodsOfIndexTsFile?: string
  ) => {
    indent += '  ';

    const props: string[] = fs
      .readdirSync(targetDir)
      .filter(file =>
        [
          !isIgnored(ig, ignorePath, targetDir, file),
          fs.statSync(path.posix.join(targetDir, file)).isDirectory()
        ].every(Boolean)
      )
      .sort()
      .map(file => {
        const newSlugs = [...slugs];
        const target = path.posix.join(targetDir, file);
        if (file.startsWith('(') && file.endsWith(')')) {
          return createPathObjString(target, indent.slice(2), url, newSlugs, '<% props %>');
        }

        const newUrl = `${url}/${file}`;
        let valFn = `${indent}${JSON.stringify(
          replaceWithUnderscore(file)
        )}: {\n<% next %>\n${indent}}`;

        if (file.startsWith('[') && file.endsWith(']')) {
          const slug = file.replace(/[.[\]]/g, '');
          valFn = `${indent}${`_${slug}`}: (${slug}${file.startsWith('[[') ? '?' : ''}: ${
            /\[\./.test(file) ? 'string[]' : 'string | number'
          }) => ({\n<% next %>\n${indent}})`;
          newSlugs.push(slug);
        }

        const indexFile = fs.readdirSync(target).find(name => pageFileNames.includes(name));

        return createPathObjString(
          target,
          indent,
          newUrl,
          newSlugs,
          valFn.replace('<% next %>', '<% props %>'),
          indexFile &&
            createMethods(
              indent,
              getImportName(path.posix.join(target, indexFile)),
              newSlugs,
              newUrl
            )
        );
      })
      .filter(Boolean);

    const joinedProps = props
      .reduce<string[]>((accumulator, current) => {
        const last = accumulator[accumulator.length - 1];

        if (last !== undefined) {
          const [a, ...b] = last.split('\n');
          const [x, ...y] = current.split('\n');

          if (a === x) {
            y.pop();
            const z = y.pop();
            const merged = [a, ...y, `${z},`, ...b].join('\n');
            return [...accumulator.slice(0, -1), merged];
          }
        }

        return [...accumulator, current];
      }, [])
      .join(',\n');

    return text.replace(
      '<% props %>',
      `${joinedProps}${
        methodsOfIndexTsFile ? `${props.length ? ',\n' : ''}${methodsOfIndexTsFile}` : ''
      }`
    );
  };

  const rootIndexFile = fs.readdirSync(input).find(name => pageFileNames.includes(name));
  const rootIndent = '';
  let rootMethods;

  if (rootIndexFile) {
    rootMethods = createMethods(
      rootIndent,
      getImportName(path.posix.join(input, rootIndexFile)),
      [],
      '/'
    );
  }

  const text = createPathObjString(input, rootIndent, '', [], '<% props %>', rootMethods);
  // console.log({ input, rootIndent, rootMethods, text })
  return { imports, text };
};
