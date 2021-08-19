import fs from 'fs'
import path from 'path'
import { createIg, isIgnored } from './isIgnored'
import { parseQueryFromTS } from './parseQueryFromTS'
import { replaceWithUnderscore } from './replaceWithUnderscore'

const createMethods = (
  indent: string,
  importName: string | undefined,
  pathname: string,
  trailingSlash: boolean
) =>
  `${indent}  $url: (url${importName?.startsWith('Query') ? '' : '?'}: { ${
    importName ? `query${importName.startsWith('Optional') ? '?' : ''}: ${importName}, ` : ''
  }hash?: string }) => \`${pathname}${trailingSlash || pathname === '' ? '/' : ''}${
    importName
      ? importName.startsWith('Query')
        ? `?\${dataToURLString(url.query)}`
        : `\${url?.query ? \`?\${dataToURLString(url.query)}\` : ''}`
      : ''
  }\${url${importName?.startsWith('Query') ? '' : '?'}.hash ? \`#\${url.hash}\` : ''}\``

const parseQueryFromSvelte = (file: string, suffix: number) => {
  const fileData = fs.readFileSync(file, 'utf8')
  const typeName = ['Query', 'OptionalQuery'].find(type =>
    new RegExp(`export (interface ${type} ?{|type ${type} ?= ?{)`).test(fileData)
  )

  if (!typeName) return

  const queryRegExp = new RegExp(`\n(.*?)export (interface ${typeName} ?{|type ${typeName} ?= ?{)`)
  const [, indent, typeText, targetText] = fileData.split(queryRegExp)
  const { length } = targetText
  let cursor = 0
  let depth = 1

  while (depth && cursor <= length) {
    if (targetText[cursor] === '}') {
      depth -= 1
    } else if (targetText[cursor] === '{') {
      depth += 1
    }

    cursor += 1
  }

  const importName = `${typeName}${suffix}`

  return {
    importName,
    importString: `${typeText.replace(typeName, importName)}${targetText
      .slice(0, cursor)
      .replace(/\r/g, '')
      .replace(new RegExp(`\n${indent}`, 'g'), '\n')}\n`
  }
}

export default (
  input: string,
  output: string,
  ignorePath: string | undefined,
  trailingSlash = false
) => {
  const ig = createIg(ignorePath)
  const imports: string[] = []
  const getImportName = (file: string) => {
    const result = path.extname(file).startsWith('.ts')
      ? parseQueryFromTS(output, file, imports.length)
      : parseQueryFromSvelte(file, imports.length)

    if (result) {
      imports.push(result.importString)
      return result.importName
    }
  }

  const createPathObjString = (
    targetDir: string,
    importBasePath: string,
    indent: string,
    url: string,
    text: string,
    methodsOfIndexTsFile?: string
  ) => {
    indent += '  '

    const files = fs
      .readdirSync(targetDir)
      .filter(
        file =>
          !file.startsWith('_') &&
          !/\.s?css$/.test(file) &&
          !file.endsWith('.d.ts') &&
          !isIgnored(ig, ignorePath, targetDir, file)
      )
    const props: string[] = [
      ...files,
      ...files
        .filter(f => {
          const target = path.posix.join(targetDir, f)
          return (
            fs.statSync(target).isDirectory() &&
            fs.readdirSync(target).some(name => name === 'index.json.js')
          )
        })
        .map(f => `${f}/index.json.js`)
    ]
      .sort()
      .map((file, _, arr) => {
        if (file.includes('/')) {
          const dirname = file.split('/')[0]
          let valFn = `${indent}${replaceWithUnderscore(dirname)}_json: {\n<% next %>\n${indent}}`
          let newUrl = `${url}/${dirname}.json`

          if (dirname.startsWith('[')) {
            const slug = dirname.slice(1).split(']')[0]
            valFn = `${indent}_${replaceWithUnderscore(
              dirname.replace(/(\[|])/g, '')
            )}: (${slug}: string | number) => ({\n<% next %>\n${indent}})`
            newUrl = `${url}/\${${slug}}${dirname.split(']')[1] ?? ''}.json`
          }

          const target = path.posix.join(targetDir, file)

          return valFn.replace(
            '<% next %>',
            createMethods(indent, getImportName(target), newUrl, trailingSlash)
          )
        }

        const basename = path.basename(file, path.extname(file))
        let valFn = `${indent}${replaceWithUnderscore(basename)}: {\n<% next %>\n${indent}}`
        let newUrl = `${url}/${basename}`

        if (basename.startsWith('[')) {
          const slug = basename.slice(1).split(']')[0]
          valFn = `${indent}_${replaceWithUnderscore(
            basename.replace(/(\[|])/g, '')
          )}: (${slug}: string | number) => ({\n<% next %>\n${indent}})`
          newUrl = `${url}/\${${slug}}${basename.split(']')[1] ?? ''}`
        }

        const target = path.posix.join(targetDir, file)

        if (fs.statSync(target).isDirectory()) {
          const indexFile = fs.readdirSync(target).find(name => name === 'index.svelte')

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
          )
        } else if (!basename.startsWith('index') && !arr.includes(basename)) {
          return valFn.replace(
            '<% next %>',
            createMethods(indent, getImportName(target), newUrl, trailingSlash)
          )
        }

        return ''
      })
      .filter(Boolean)

    return text.replace(
      '<% props %>',
      `${props.join(',\n')}${
        methodsOfIndexTsFile ? `${props.length ? ',\n' : ''}${methodsOfIndexTsFile}` : ''
      }`
    )
  }

  const rootIndexFile = fs
    .readdirSync(input)
    .find(name => path.basename(name, path.extname(name)) === 'index')
  const rootIndent = ''
  let rootMethods

  if (rootIndexFile) {
    rootMethods = createMethods(
      rootIndent,
      getImportName(path.posix.join(input, rootIndexFile)),
      '',
      trailingSlash
    )
  }

  const text = createPathObjString(input, '.', rootIndent, '', `{\n<% props %>\n}`, rootMethods)
  const importsText = imports.filter(i => i.startsWith('import')).join('\n')
  const queriesText = imports.filter(i => !i.startsWith('import')).join('\n')

  return `${importsText}${importsText && queriesText ? '\n' : ''}
${queriesText}${
    imports.length
      ? `
const encode = (str: Parameters<typeof encodeURIComponent>[0]) =>
  encodeURIComponent(str).replace(
    /[!'()~]|%20|%00/g,
    match =>
      (({
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\\x00'
      } as Record<string, string>)[match])
  )

export const dataToURLString = (data: Record<string, any>) =>
  Object.keys(data)
    .filter(key => data[key] != null)
    .map(key =>
      Array.isArray(data[key])
        ? data[key].map((v: string) => \`\${encode(key)}=\${encode(v)}\`).join('&')
        : \`\${encode(key)}=\${encode(data[key])}\`
    )
    .join('&')

`
      : ''
  }export const pagesPath = ${text}\n\nexport type PagesPath = typeof pagesPath
`
}
