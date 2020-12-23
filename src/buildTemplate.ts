import path from 'path'
import { Config } from './getConfig'
import createNextTemplate from './createNextTemplate'
import createTemplateValues from './createTemplateValues'

export default ({ type, input, output, trailingSlash }: Config) => ({
  text: type === 'nextjs' ? createNextTemplate(input) : createTemplateValues(input, trailingSlash),
  filePath: path.posix.join(output, '$path.ts')
})
