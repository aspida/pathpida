import fs from 'fs'
import path from 'path'

export const parseQueryFromTS = (output: string, file: string, suffix: number) => {
  const fileData = fs.readFileSync(file, 'utf8')
  const typeName = ['Query', 'OptionalQuery'].find(type =>
    new RegExp(`export (interface ${type} ?{|type ${type} ?=)`).test(fileData)
  )

  if (!typeName) return

  const importName = `${typeName}${suffix}`

  return {
    importName,
    importString: `import type { ${typeName} as ${importName} } from '${path
      .relative(output, file)
      .replace(/\\/g, '/')
      .replace(/(\/index)?\.tsx?$/, '')}'`
  }
}
