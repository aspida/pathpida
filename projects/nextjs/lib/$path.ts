import type { Query as Query_1d3p916 } from '../pages';
import type { OptionalQuery as OptionalQuery_4ked3w } from '../pages/[pid]';
import type { Query as Query_1v65l5d } from '../pages/blog/[...slug]';

export const pagesPath = {
  '%E6%97%A5%E6%9C%AC%E8%AA%9E': {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/%E6%97%A5%E6%9C%AC%E8%AA%9E' as const, hash: url?.hash })
  },
  '_ignore': {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/.ignore' as const, hash: url?.hash })
  },
  _a: (a: string | number) => ({
    'b': {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
      })
    }
  }),
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery_4ked3w | undefined, hash?: string | undefined } | undefined) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
  }),
  'aaa': {
    _bbb: (bbb: string[]) => ({
      'ccc': {
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash })
      }
    }),
    'api': {
      'samples': {
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/aaa/api/samples' as const, hash: url?.hash })
      }
    }
  },
  'blog': {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query_1v65l5d, hash?: string | undefined }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
    }),
    'hoge': {
      _fuga: (fuga?: string[] | undefined) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
      })
    }
  },
  'x': {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/x' as const, hash: url?.hash }),
    _y: (y: string | number) => ({
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/x/[y]' as const, query: { y }, hash: url?.hash }),
      'z': {
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/x/[y]/z' as const, query: { y }, hash: url?.hash })
      }
    })
  },
  $url: (url: { query: Query_1d3p916, hash?: string | undefined }) => ({ pathname: '/' as const, query: url.query, hash: url.hash })
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  aa_json: '/aa.json',
  bb: {
    _ignore: '/bb/.ignore',
    cc_png: '/bb/cc.png'
  },
  duplicate_json_0: {
    sample_json: '/duplicate-json/sample.json'
  },
  duplicate_json_1: '/duplicate.json',
  duplicate_json_2: '/duplicate_json'
} as const;

export type StaticPath = typeof staticPath;
