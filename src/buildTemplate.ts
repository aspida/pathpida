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
  const isNextJs = type === 'nextjs'
  prevPagesText =
    mode === 'static'
      ? prevPagesText
      : isNextJs
      ? createNextTemplate(input)
      : createNuxtTemplate(input, trailingSlash)
  prevStaticText = !staticDir || mode === 'pages' ? prevStaticText : createStaticTemplate(staticDir)

  return {
    text: `${prevPagesText}${prevStaticText}${
      isNextJs
        ? ''
        : `
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
    }`,
    filePath: path.posix.join(output, '$path.ts')
  }
}
