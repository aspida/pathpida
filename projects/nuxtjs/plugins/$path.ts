/* eslint-disable */
import { Plugin } from '@nuxt/types'

type Query0 = { hoge: string }

type OptionalQuery1 = { hoge: string }

type Query2 = { hoge: string }

export const pagesPath = {
  _pid: (pid: string | number) => ({
    $path: (query?: OptionalQuery1) => ({ path: '/:pid/' as const, params: { pid } as any, query: query as any })
  }),
  blog: {
    _slug: (slug: string | number) => ({
      $path: (query: Query2) => ({ path: '/blog/:slug/' as const, params: { slug } as any, query: query as any })
    })
  },
  $path: (query: Query0) => ({ path: '/' as const, query: query as any })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  aa_json: '/aa.json',
  bb: {
    cc_png: '/bb/cc.png'
  }
} as const

export type StaticPath = typeof staticPath

declare module 'vue/types/vue' {
  interface Vue {
    $pagesPath: PagesPath
    $staticPath: StaticPath
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $pagesPath: PagesPath
    $staticPath: StaticPath
  }

  interface Context {
    $pagesPath: PagesPath
    $staticPath: StaticPath
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $pagesPath: PagesPath
    $staticPath: StaticPath
  }
}

const pathPlugin: Plugin = (_, inject) => {
  inject('pagesPath', pagesPath)
  inject('staticPath', staticPath)
}

export default pathPlugin
