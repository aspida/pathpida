import fs from 'fs';
import path from 'path';
import { createIg, isIgnored } from './isIgnored';
import { replaceWithUnderscore } from './replaceWithUnderscore';

export const createStaticTemplate = (
  input: string,
  basepath: string | undefined,
  ignorePath: string | undefined,
) => {
  const ig = createIg(ignorePath);
  const createPublicString = (
    targetDir: string,
    parentIndent: string,
    url: string,
    text: string,
  ) => {
    const indent = `  ${parentIndent}`;
    const files = fs.readdirSync(targetDir).sort();
    const replacedFiles = files.map(replaceWithUnderscore);
    const duplicatedInfo = replacedFiles.reduce<Record<string, number[]>>(
      (a, b, i) => ({ ...a, [b]: [...(a[b] ?? []), i] }),
      {},
    );
    const props: string[] = files
      .map((file, i) => {
        const newUrl = `${url}/${file}`;
        const target = path.posix.join(targetDir, file);

        if (isIgnored(ig, ignorePath, targetDir, file)) return '';

        const replacedFile = replacedFiles[i];
        const valFn = `${indent}${
          duplicatedInfo[replacedFile].length > 1
            ? `${replacedFile}_${duplicatedInfo[replacedFile].indexOf(i)}`
            : replacedFile
        }: <% next %>`;

        return fs.statSync(target).isFile()
          ? valFn.replace('<% next %>', `'${newUrl}'`)
          : fs.statSync(target).isDirectory()
            ? createPublicString(
                target,
                indent,
                newUrl,
                valFn.replace('<% next %>', `{\n<% props %>\n${indent}}`),
              )
            : '';
      })
      .filter(Boolean);

    return text.replace('<% props %>', props.join(',\n'));
  };

  const text = createPublicString(
    input,
    '',
    typeof basepath === 'string' ? basepath.replace(/\/+$/, '') : '',
    '{\n<% props %>\n} as const;',
  );

  return `\nexport const staticPath = ${text}\n\nexport type StaticPath = typeof staticPath;\n`;
};
