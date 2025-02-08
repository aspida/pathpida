import { parseAppDir } from './parseAppDir';
import { parsePagesDir } from './parsePagesDir';

export const createNextTemplate = (
  input: string | undefined,
  output: string,
  ignorePath: string | undefined,
  appDir: { input: string } | undefined,
  pageExtensions = ['tsx', 'ts', 'jsx', 'js'],
): string => {
  const appDirData = appDir
    ? parseAppDir(appDir.input, output, ignorePath)
    : { imports: [], text: '' };
  const pagesDir = input
    ? parsePagesDir(input, output, ignorePath, pageExtensions)
    : { imports: [], text: '' };
  const imports = [...appDirData.imports, ...pagesDir.imports];

  return `${imports.join('\n')}${imports.length ? '\n\n' : ''}${
    appDir
      ? `const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? \`?\${new URLSearchParams(query)}\` : '';
  return \`\${search}\${hash ? \`#\${hash}\` : ''}\`;
};

`
      : ''
  }export const pagesPath = {
${appDirData.text}${appDirData.text && pagesDir.text ? ',\n' : ''}${pagesDir.text}
};

export type PagesPath = typeof pagesPath;
`;
};
