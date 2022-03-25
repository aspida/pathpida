import type { Plugin } from '@nuxt/types'
import type { Query as Query0 } from '../../../pages'
import type { OptionalQuery as OptionalQuery1 } from '../../../pages/_pid'
import type { Query as Query2 } from '../../../pages/blog/_slug'

export const pagesPath = {
  _a: (a: string | number) => ({
    b: {
      _c: (c: string | number) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ path: `/${a}/b/${c}`, hash: url?.hash })
      })
    }
  }),
  _pid: (pid?: string | number | undefined) => ({
    $url: (url?: { query?: OptionalQuery1 | undefined, hash?: string | undefined } | undefined) => ({ path: `${pid !== undefined ? `/${pid}` : ''}`, query: url?.query as any, hash: url?.hash })
  }),
  aaa: {
    _bbb: (bbb: string | number) => ({
      ccc: {
        $url: (url?: { hash?: string | undefined } | undefined) => ({ path: `/aaa/${bbb}/ccc`, hash: url?.hash })
      },
      $url: (url?: { hash?: string | undefined } | undefined) => ({ path: `/aaa/${bbb}`, hash: url?.hash })
    })
  },
  blog: {
    _slug: (slug?: string | number | undefined) => ({
      $url: (url: { query: Query2, hash?: string | undefined }) => ({ path: `/blog${slug !== undefined ? `/${slug}` : ''}`, query: url.query as any, hash: url.hash })
    })
  },
  $url: (url: { query: Query0, hash?: string | undefined }) => ({ path: '/', query: url.query as any, hash: url.hash })
}

export type PagesPath = typeof pagesPath

declare module 'vue/types/vue' {
  interface Vue {
    $pagesPath: PagesPath
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $pagesPath: PagesPath
  }

  interface Context {
    $pagesPath: PagesPath
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $pagesPath: PagesPath
  }
}

const pathPlugin: Plugin = (_, inject) => {
  inject('pagesPath', pagesPath)
}

export default pathPlugin
