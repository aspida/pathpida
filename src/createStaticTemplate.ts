import fs from 'fs'
import path from 'path'
import { replaceWithUnderscore } from './replaceWithUnderscore'

const normalizeBasePath = (basepath: string | undefined): string => {
  if (typeof basepath === 'string') return basepath.replace(/\/+$/, '')
  return ''
}

export default (input: string, basepath: string | undefined) => {
  const createPublicString = (targetDir: string, indent: string, url: string, text: string) => {
    const props: string[] = []

    indent += '  '

    fs.readdirSync(targetDir)
      .sort()
      .forEach(file => {
        const newUrl = `${url}/${file}`
        const target = path.posix.join(targetDir, file)
        const valFn = `${indent}${replaceWithUnderscore(file)}: <% next %>`

        if (fs.statSync(target).isFile()) {
          props.push(valFn.replace('<% next %>', `'${newUrl}'`))
        } else if (fs.statSync(target).isDirectory()) {
          props.push(
            createPublicString(
              target,
              indent,
              newUrl,
              valFn.replace('<% next %>', `{\n<% props %>\n${indent}}`)
            )
          )
        }
      })

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
