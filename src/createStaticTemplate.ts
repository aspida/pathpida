import fs from 'fs'
import path from 'path'
import { replaceWithUnderscore } from './replaceWithUnderscore'

const normalizeBasePath = (basepath: string | undefined): string => {
  if (typeof basepath === 'string') return basepath.replace(/\/+$/, '')
  return ''
}

export default (input: string, basepath: string | undefined) => {
  const createPublicString = (targetDir: string, indent: string, url: string, text: string) => {
    indent += '  '

    const files = fs.readdirSync(targetDir).sort()
    const replacedFiles = files.map(replaceWithUnderscore)
    const duplicatedInfo = replacedFiles.reduce<Record<string, number[]>>(
      (a, b, i) => ({ ...a, [b]: [...(a[b] ?? []), i] }),
      {}
    )
    const props: string[] = files
      .map((file, i) => {
        const newUrl = `${url}/${file}`
        const target = path.posix.join(targetDir, file)
        const replacedFile = replacedFiles[i]
        const valFn = `${indent}${
          duplicatedInfo[replacedFile].length > 1
            ? `${replacedFile}_${duplicatedInfo[replacedFile].indexOf(i)}`
            : replacedFile
        }: <% next %>`

        return fs.statSync(target).isFile()
          ? valFn.replace('<% next %>', `'${newUrl}'`)
          : fs.statSync(target).isDirectory()
          ? createPublicString(
              target,
              indent,
              newUrl,
              valFn.replace('<% next %>', `{\n<% props %>\n${indent}}`)
            )
          : ''
      })
      .filter(Boolean)

    return text.replace('<% props %>', props.join(',\n'))
  }

  const text = createPublicString(
    input,
    '',
    normalizeBasePath(basepath),
    `{\n<% props %>\n} as const`
  )

  return `\nexport const staticPath = ${text}\n\nexport type StaticPath = typeof staticPath\n`
}
