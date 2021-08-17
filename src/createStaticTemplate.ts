import fs from 'fs'
import type { Ignore } from 'ignore'
import path from 'path'
import { replaceWithUnderscore } from './replaceWithUnderscore'

export default (input: string, basepath: string | undefined, ig: Ignore | undefined) => {
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
        if (ig?.ignores(target)) return ''

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
    typeof basepath === 'string' ? basepath.replace(/\/+$/, '') : '',
    `{\n<% props %>\n} as const`
  )

  return `\nexport const staticPath = ${text}\n\nexport type StaticPath = typeof staticPath\n`
}
