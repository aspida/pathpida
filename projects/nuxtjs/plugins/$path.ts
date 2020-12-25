/* eslint-disable */
import { Plugin } from '@nuxt/types'

type Query0 = { hoge: string }

type OptionalQuery1 = { hoge: string }

type Query2 = { hoge: string }

export const pagesPath = {
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery1, hash?: string }) => ({ path: '/:pid/' as const, params: { pid } as any, query: url?.query as any, hash: url?.hash })
  }),
  aaa: {
    _bbb: (bbb: string | number) => ({
      ccc: {
        $url: (url?: { hash?: string }) => ({ path: '/aaa/:bbb/ccc/' as const, params: { bbb } as any, hash: url?.hash })
      }
    })
  },
  blog: {
    _slug: (slug: string | number) => ({
      $url: (url: { query: Query2, hash?: string }) => ({ path: '/blog/:slug/' as const, params: { slug } as any, query: url.query as any, hash: url.hash })
    })
  },
  $url: (url: { query: Query0, hash?: string }) => ({ path: '/' as const, query: url.query as any, hash: url.hash })
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
