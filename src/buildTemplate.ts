import path from 'path'
import { Config } from './getConfig'
import createNextTemplate from './createNextTemplate'
import createNuxtTemplate from './createNuxtTemplate'
import createSapperTemplate from './createSapperTemplate'
import createStaticTemplate from './createStaticTemplate'

let prevPagesText = ''
let prevStaticText = ''

export const resetCache = () => {
  prevPagesText = ''
  prevStaticText = ''
}

export default (
  { type, input, staticDir, output, trailingSlash, basepath }: Config,
  mode?: 'pages' | 'static'
) => {
  prevPagesText =
    mode === 'static'
      ? prevPagesText
      : {
          nextjs: () => createNextTemplate(input),
          nuxtjs: () => createNuxtTemplate(input, trailingSlash),
          sapper: () => createSapperTemplate(input)
        }[type]()
  prevStaticText =
    !staticDir || mode === 'pages' ? prevStaticText : createStaticTemplate(staticDir, basepath)

  return {
    text: `/* eslint-disable */
${prevPagesText}${prevStaticText}${
      type === 'nuxtjs'
        ? `
declare module 'vue/types/vue' {
  interface Vue {
    $pagesPath: PagesPath${prevStaticText ? '\n    $staticPath: StaticPath' : ''}
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $pagesPath: PagesPath${prevStaticText ? '\n    $staticPath: StaticPath' : ''}
  }

  interface Context {
    $pagesPath: PagesPath${prevStaticText ? '\n    $staticPath: StaticPath' : ''}
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $pagesPath: PagesPath${prevStaticText ? '\n    $staticPath: StaticPath' : ''}
  }
}

const pathPlugin: Plugin = (_, inject) => {
  inject('pagesPath', pagesPath)${prevStaticText ? "\n  inject('staticPath', staticPath)" : ''}
}

export default pathPlugin
`
        : ''
    }`.replace(/\n([a-z])/g, '\n// prettier-ignore\n$1'),
    filePath: path.posix.join(output, '$path.ts')
  }
}
