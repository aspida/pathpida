import fs from 'fs';
import path from 'path';
import { createHash } from './createHash';

export const parseQueryFromTS = (output: string, file: string) => {
  const fileData = fs.readFileSync(file, 'utf8');
  const typeName = ['Query', 'OptionalQuery'].find(type =>
    new RegExp(`export (interface ${type} ?{|type ${type} ?=)`).test(fileData)
  );

  if (!typeName) return;

  const importPath = path
    .relative(output, file)
    .replace(/\\/g, '/')
    .replace(/(\/index)?\.tsx?$/, '');
  const importName = `${typeName}_${createHash(importPath)}`;

  return {
    importName,
    importString: `import type { ${typeName} as ${importName} } from '${importPath}';`
  };
};
