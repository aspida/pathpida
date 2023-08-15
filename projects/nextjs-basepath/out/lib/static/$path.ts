import type { Query as Query_44ght4 } from '../../../pages';
import type { OptionalQuery as OptionalQuery_1j8ubzu } from '../../../pages/[pid]';
import type { Query as Query_1oqjm3b } from '../../../pages/blog/[...slug]';

export const pagesPath = {
  "_ignore": {
    $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/.ignore' as const, hash: url?.hash })
  },
  _a: (a: string | number) => ({
    "b": {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
      })
    }
  }),
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery_1j8ubzu | undefined, hash?: string | undefined } | undefined) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
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
      $url: (url: { query: Query_1oqjm3b, hash?: string | undefined }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
    }),
    "hoge": {
      _fuga: (fuga?: string[] | undefined) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
      })
    }
  },
  $url: (url: { query: Query_44ght4, hash?: string | undefined }) => ({ pathname: '/' as const, query: url.query, hash: url.hash })
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
