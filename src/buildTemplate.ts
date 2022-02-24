import path from 'path'
import createNextTemplate from './createNextTemplate'
import createNuxtTemplate from './createNuxtTemplate'
import createSapperTemplate from './createSapperTemplate'
import createStaticTemplate from './createStaticTemplate'
import type { Config } from './getConfig'

let prevPagesText = ''
let prevStaticText = ''

export const resetCache = () => {
  prevPagesText = ''
  prevStaticText = ''
}

export default (
  { type, input, staticDir, output, ignorePath, trailingSlash, basepath, pageExtensions }: Config,
  mode?: 'pages' | 'static'
) => {
  const emptyPathRegExp = /\n.+{\n+ +}.*/

  if (mode !== 'static') {
    let text = {
      nextjs: () => createNextTemplate(input, output, ignorePath, pageExtensions),
      nuxtjs: () => createNuxtTemplate(input, output, ignorePath, trailingSlash),
      sapper: () => createSapperTemplate(input, output, ignorePath)
    }[type]()

    while (emptyPathRegExp.test(text)) {
      text = text.replace(emptyPathRegExp, '')
    }

    prevPagesText = text
  }

  if (staticDir && mode !== 'pages') {
    let text = createStaticTemplate(staticDir, basepath, ignorePath)

    while (emptyPathRegExp.test(text)) {
      text = text.replace(emptyPathRegExp, '')
    }

    prevStaticText = text
  }

  return {
    text: `${prevPagesText}${prevStaticText}${
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
    }`,
    filePath: path.posix.join(output, '$path.ts')
  }
}
