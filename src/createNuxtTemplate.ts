import fs from 'fs'
import path from 'path'

type Slags = string[]

const createMethods = (
  indent: string,
  importName: string | undefined,
  slags: Slags,
  pathname: string,
  trailingSlash: boolean
) =>
  `${indent}  $path: (${
    importName ? `query${importName.startsWith('Optional') ? '?' : ''}: ${importName}` : ''
  }) => ({ path: '${pathname}${trailingSlash ? '/' : ''}'${
    slags.length ? `, params: { ${slags.join(', ')} }` : ''
  }${importName ? ', query' : ''} })`

export default (input: string, trailingSlash = false) => {
  const imports: string[] = []
  const getImportName = (file: string) => {
    const fileData = fs.readFileSync(file, 'utf8')
    const typeName = ['Query', 'OptionalQuery'].find(type =>
      new RegExp(`export (interface ${type} ?{|type ${type} ?= ?{)`).test(fileData)
    )

    if (typeName) {
      const queryRegExp = new RegExp(`export (interface ${typeName} ?{|type ${typeName} ?= ?{)`)
      const [, typeText, targetText] = fileData.split(queryRegExp)
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

      const importName = `${typeName}${imports.length}`
      imports.push(
        `${typeText.replace(typeName, importName)}${targetText
          .slice(0, cursor)
          .replace(/\r/g, '')}\n`
      )
      return importName
    }
  }

  const createQueryString = (
    targetDir: string,
    importBasePath: string,
    indent: string,
    url: string,
    slags: Slags,
    text: string,
    methodsOfIndexTsFile?: string
  ) => {
    const props: string[] = []

    indent += '  '

    fs.readdirSync(targetDir)
      .filter(file => !file.startsWith('-'))
      .sort()
      .forEach((file, _, arr) => {
        const newSlags = [...slags]
        const basename = path.basename(file, path.extname(file))
        let valFn = `${indent}${basename
          .replace(/(-|\.|!| |'|\*|\(|\))/g, '_')
          .replace(/^(\d)/, '$$$1')}: {\n<% next %>\n${indent}}`
        let newUrl = `${url}/${basename}`

        if (basename.startsWith('_')) {
          const slag = basename.slice(1)
          valFn = `${indent}_${slag}: (${slag}: number | string) => ({\n<% next %>\n${indent}})`
          newSlags.push(slag)
          newUrl = `${url}/:${slag}`
        }

        const target = path.posix.join(targetDir, file)

        if (fs.statSync(target).isFile() && basename !== 'index' && !arr.includes(basename)) {
          props.push(
            valFn.replace(
              '<% next %>',
              createMethods(indent, getImportName(target), newSlags, newUrl, trailingSlash)
            )
          )
        } else if (fs.statSync(target).isDirectory()) {
          const indexFile = fs
            .readdirSync(target)
            .find(name => path.basename(name, path.extname(name)) === 'index')
          let methods

          if (indexFile) {
            methods = createMethods(
              indent,
              getImportName(path.posix.join(target, indexFile)),
              newSlags,
              newUrl,
              trailingSlash
            )
          }

          props.push(
            createQueryString(
              target,
              `${importBasePath}/${file}`,
              indent,
              newUrl,
              newSlags,
              valFn.replace('<% next %>', '<% props %>'),
              methods
            )
          )
        }
      })

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
      [],
      '',
      trailingSlash
    )
  }

  const text = createQueryString(input, '.', rootIndent, '', [], `{\n<% props %>\n}`, rootMethods)

  return `/* eslint-disable */
${imports.join('\n')}${
    imports.length ? '\n\n' : ''
  }export const pagesPath = ${text}\n\nexport type PagesPath = typeof pagesPath
`
}
