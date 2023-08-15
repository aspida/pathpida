import type { Plugin } from '@nuxt/types';

type Query_lh4zpu = { hoge: string };

type OptionalQuery_lh4zpu = { hoge: string };

type Query_1hxie1v = {
  hoge: string
  fuga: {
    a: number
    b: { c: string }[]
  }
};

export const pagesPath = {
  _ignore: {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ path: '/.ignore/', hash: url?.hash })
  },
  _a: (a: string | number) => ({
    b: {
      _c: (c?: string | number | undefined) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ path: `/${a}/b${c !== undefined ? `/${c}` : ''}/`, hash: url?.hash })
      })
    }
  }),
  _pid: (pid?: string | number | undefined) => ({
    $url: (url?: { query?: OptionalQuery_lh4zpu | undefined, hash?: string | undefined } | undefined) => ({ path: `${pid !== undefined ? `/${pid}` : ''}/`, query: url?.query as any, hash: url?.hash })
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
      $url: (url: { query: Query_1hxie1v, hash?: string | undefined }) => ({ path: `/blog${slug !== undefined ? `/${slug}` : ''}/`, query: url.query as any, hash: url.hash })
    })
  },
  $url: (url: { query: Query_lh4zpu, hash?: string | undefined }) => ({ path: '/', query: url.query as any, hash: url.hash })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  aa_json: '/foo/bar/aa.json',
  bb: {
    _ignore: '/foo/bar/bb/.ignore',
    cc_png: '/foo/bar/bb/cc.png'
  },
  duplicate_json_0: {
    sample_json: '/foo/bar/duplicate-json/sample.json'
  },
  duplicate_json_1: '/foo/bar/duplicate.json',
  duplicate_json_2: '/foo/bar/duplicate_json'
} as const;

export type StaticPath = typeof staticPath;

declare module 'vue/types/vue' {
  interface Vue {
    $pagesPath: PagesPath
    $staticPath: StaticPath
  }
};

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $pagesPath: PagesPath
    $staticPath: StaticPath
  }

  interface Context {
    $pagesPath: PagesPath
    $staticPath: StaticPath
  }
};

declare module 'vuex/types/index' {
  interface Store<S> {
    $pagesPath: PagesPath
    $staticPath: StaticPath
  }
};

const pathPlugin: Plugin = (_, inject) => {
  inject('pagesPath', pagesPath);
  inject('staticPath', staticPath);
};

export default pathPlugin;
