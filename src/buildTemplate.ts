import path from 'path'
import { Config } from './getConfig'
import createNextTemplate from './createNextTemplate'
import createNuxtTemplate from './createNuxtTemplate'
import createStaticTemplate from './createStaticTemplate'

let prevPagesText = ''
let prevStaticText = ''

export default (
  { type, input, staticDir, output, trailingSlash }: Config,
  mode?: 'pages' | 'static'
) => {
  prevPagesText =
    mode === 'static'
      ? prevPagesText
      : type === 'nextjs'
      ? createNextTemplate(input)
      : createNuxtTemplate(input, trailingSlash)
  prevStaticText = !staticDir || mode === 'pages' ? prevStaticText : createStaticTemplate(staticDir)

  return {
    text: `${prevPagesText}${prevStaticText}`,
    filePath: path.posix.join(output, '$path.ts')
  }
}
