import type { Plugin } from '@nuxt/types'
import type { Query as Query0 } from '../../../pages'
import type { OptionalQuery as OptionalQuery1 } from '../../../pages/_pid'
import type { Query as Query2 } from '../../../pages/blog/_slug'

export const pagesPath = {
  _a: (a: string | number) => ({
    b: {
      _c: (c?: string | number | undefined) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ path: `/${a}/b${c !== undefined ? `/${c}` : ''}/`, hash: url?.hash })
      })
    }
  }),
  _pid: (pid?: string | number | undefined) => ({
    $url: (url?: { query?: OptionalQuery1 | undefined, hash?: string | undefined } | undefined) => ({ path: `${pid !== undefined ? `/${pid}` : ''}/`, query: url?.query as any, hash: url?.hash })
  }),
  aaa: {
    _bbb: (bbb: string | number) => ({
      ccc: {
        $url: (url?: { hash?: string | undefined } | undefined) => ({ path: `/aaa/${bbb}/ccc/`, hash: url?.hash })
      },
      $url: (url?: { hash?: string | undefined } | undefined) => ({ path: `/aaa/${bbb}/`, hash: url?.hash })
    })
  },
  blog: {
    _slug: (slug?: string | number | undefined) => ({
      $url: (url: { query: Query2, hash?: string | undefined }) => ({ path: `/blog${slug !== undefined ? `/${slug}` : ''}/`, query: url.query as any, hash: url.hash })
    })
  },
  $url: (url: { query: Query0, hash?: string | undefined }) => ({ path: '/', query: url.query as any, hash: url.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  aa_json: '/aa.json',
  bb: {
    cc_png: '/bb/cc.png'
  },
  duplicate_json_0: {
    sample_json: '/duplicate-json/sample.json'
  },
  duplicate_json_1: '/duplicate.json',
  duplicate_json_2: '/duplicate_json'
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
