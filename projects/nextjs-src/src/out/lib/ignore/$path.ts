import type { Query as Query0 } from '../../../pages';
import type { OptionalQuery as OptionalQuery1 } from '../../../pages/[pid]';
import type { Query as Query2 } from '../../../pages/blog/[...slug]';

export const pagesPath = {
  _a: (a: string | number) => ({
    "b": {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
      })
    }
  }),
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery1 | undefined, hash?: string | undefined } | undefined) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
  }),
  "aaa": {
    _bbb: (bbb: string[]) => ({
      "ccc": {
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash })
      }
    }),
    "api": {
      "samples": {
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/aaa/api/samples' as const, hash: url?.hash })
      }
    }
  },
  "blog": {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query2, hash?: string | undefined }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
    }),
    "hoge": {
      _fuga: (fuga?: string[] | undefined) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
      })
    }
  },
  $url: (url: { query: Query0, hash?: string | undefined }) => ({ pathname: '/' as const, query: url.query, hash: url.hash })
};

export type PagesPath = typeof pagesPath;

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
} as const;

export type StaticPath = typeof staticPath;
