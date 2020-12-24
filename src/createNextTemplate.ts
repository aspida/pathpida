import fs from 'fs'
import path from 'path'

type Slugs = string[]

const createMethods = (
  indent: string,
  importName: string | undefined,
  slugs: Slugs,
  pathname: string
) =>
  `${indent}  $path: (${
    importName ? `query${importName.startsWith('Optional') ? '?' : ''}: ${importName}` : ''
  }) => ({ pathname: '${pathname}' as const${
    slugs.length
      ? `, query: { ${slugs.join(', ')}${importName ? ', ...query' : ''} }`
      : importName
      ? ', query'
      : ''
  } })`

export default (input: string) => {
  const imports: string[] = []
  const getImportName = (file: string) => {
    const fileData = fs.readFileSync(file, 'utf8')
    const typeName = ['Query', 'OptionalQuery'].find(type =>
      new RegExp(`export (interface ${type} ?{|type ${type} ?=)`).test(fileData)
    )

    if (typeName) {
      const importName = `${typeName}${imports.length}`
      imports.push(
        `import { ${typeName} as ${importName} } from '${path.posix
          .relative('lib', file)
          .replace(/(\/index)?\.tsx/, '')}'`
      )
      return importName
    }
  }

  const createQueryString = (
    targetDir: string,
    indent: string,
    url: string,
    slugs: Slugs,
    text: string,
    methodsOfIndexTsFile?: string
  ) => {
    const props: string[] = []

    indent += '  '

    fs.readdirSync(targetDir)
      .filter(file => !file.startsWith('_'))
      .sort()
      .forEach((file, _, arr) => {
        const newSlugs = [...slugs]
        const basename = path.basename(file, path.extname(file))
        const newUrl = `${url}/${basename}`
        let valFn = `${indent}${basename
          .replace(/(-|\.|!| |'|\*|\(|\))/g, '_')
          .replace(/^(\d)/, '$$$1')}: {\n<% next %>\n${indent}}`

        if (basename.startsWith('[') && basename.endsWith(']')) {
          const slug = basename.replace(/[.[\]]/g, '')
          valFn = `${indent}${`_${slug}`}: (${slug}${basename.startsWith('[[') ? '?' : ''}: ${
            /\[\./.test(basename) ? '(string | number)[]' : 'string | number'
          }) => ({\n<% next %>\n${indent}})`
          newSlugs.push(slug)
        }

        const target = path.posix.join(targetDir, file)

        if (fs.statSync(target).isFile() && basename !== 'index' && !arr.includes(basename)) {
          props.push(
            valFn.replace(
              '<% next %>',
              createMethods(indent, getImportName(target), newSlugs, newUrl)
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
              newSlugs,
              newUrl
            )
          }

          props.push(
            createQueryString(
              target,
              indent,
              newUrl,
              newSlugs,
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

  const rootIndexFile = fs.readdirSync(input).find(name => name === 'index.tsx')
  const rootIndent = ''
  let rootMethods

  if (rootIndexFile) {
    rootMethods = createMethods(
      rootIndent,
      getImportName(path.posix.join(input, rootIndexFile)),
      [],
      '/'
    )
  }

  const text = createQueryString(input, rootIndent, '', [], `{\n<% props %>\n}`, rootMethods)

  return `/* eslint-disable */
${imports.join('\n')}${
    imports.length ? '\n\n' : ''
  }export const pagesPath = ${text}\n\nexport type PagesPath = typeof pagesPath
`
}
