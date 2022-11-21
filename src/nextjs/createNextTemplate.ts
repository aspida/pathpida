import { parseAppDir } from './parseAppDir'
import { parsePagesDir } from './parsePagesDir'

export const createNextTemplate = (
  input: string | undefined,
  output: string,
  ignorePath: string | undefined,
  appDir: { input: string } | undefined,
  pageExtensions = ['tsx', 'ts', 'jsx', 'js']
): string => {
  const appDirData = appDir
    ? parseAppDir(appDir.input, output, ignorePath)
    : { imports: [], text: '' }
  const pagesDir = input
    ? parsePagesDir(input, output, ignorePath, pageExtensions, appDirData.imports.length)
    : { imports: [], text: '' }
  const imports = [...appDirData.imports, ...pagesDir.imports]

  return `${imports.join('\n')}${imports.length ? '\n\n' : ''}export const pagesPath = {\n${
    appDirData.text
  }${appDirData.text && pagesDir.text ? ',\n' : ''}${
    pagesDir.text
  }\n}\n\nexport type PagesPath = typeof pagesPath
`
}
