/* eslint-disable */
// prettier-ignore
import { Plugin } from '@nuxt/types'

// prettier-ignore
type Query0 = { hoge: string }

// prettier-ignore
type OptionalQuery1 = { hoge: string }

// prettier-ignore
type Query2 = {
  hoge: string
  fuga: {
    a: number
    b: { c: string }[]
  }
}

// prettier-ignore
export const pagesPath = {
  _a: (a: string | number) => ({
    b: {
      _c: (c?: string | number) => ({
        $url: (url?: { hash?: string }) => ({ path: `/${a}/b${c !== undefined ? `/${c}` : ''}/`, hash: url?.hash })
      })
    }
  }),
  _pid: (pid?: string | number) => ({
    $url: (url?: { query?: OptionalQuery1, hash?: string }) => ({ path: `${pid !== undefined ? `/${pid}` : ''}/`, query: url?.query as any, hash: url?.hash })
  }),
  aaa: {
    _bbb: (bbb: string | number) => ({
      ccc: {
        $url: (url?: { hash?: string }) => ({ path: `/aaa/${bbb}/ccc/`, hash: url?.hash })
      },
      $url: (url?: { hash?: string }) => ({ path: `/aaa/${bbb}/`, hash: url?.hash })
    })
  },
  blog: {
    _slug: (slug?: string | number) => ({
      $url: (url: { query: Query2, hash?: string }) => ({ path: `/blog${slug !== undefined ? `/${slug}` : ''}/`, query: url.query as any, hash: url.hash })
    })
  },
  $url: (url: { query: Query0, hash?: string }) => ({ path: '/', query: url.query as any, hash: url.hash })
}

// prettier-ignore
export type PagesPath = typeof pagesPath

// prettier-ignore
declare module 'vue/types/vue' {
  interface Vue {
    $pagesPath: PagesPath
  }
}

// prettier-ignore
declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $pagesPath: PagesPath
  }

  interface Context {
    $pagesPath: PagesPath
  }
}

// prettier-ignore
declare module 'vuex/types/index' {
  interface Store<S> {
    $pagesPath: PagesPath
  }
}

// prettier-ignore
const pathPlugin: Plugin = (_, inject) => {
  inject('pagesPath', pagesPath)
}

// prettier-ignore
export default pathPlugin
