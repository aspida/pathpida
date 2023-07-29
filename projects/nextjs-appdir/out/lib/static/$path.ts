import type { Query as Query0 } from '../../../app/page'
import type { OptionalQuery as OptionalQuery1 } from '../../../app/(group1)/[pid]/page'
import type { Query as Query2 } from '../../../app/(group1)/blog/[...slug]/page'
import type { OptionalQuery as OptionalQuery3 } from '../../../pages/children/[pid]'
import type { Query as Query4 } from '../../../pages/children/blog/[...slug]'

const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query
  const hash = url?.hash
  if (!query && !hash) return ''
  const search = query ? `?${new URLSearchParams(query)}` : ''
  return `${search}${hash ? `#${hash}` : ''}`
}

export const pagesPath = {
  "%E6%97%A5%E6%9C%AC%E8%AA%9E": {
    $url: (url?: { hash?: string }) => ({ pathname: '/%E6%97%A5%E6%9C%AC%E8%AA%9E' as const, hash: url?.hash, path: `/%E6%97%A5%E6%9C%AC%E8%AA%9E${buildSuffix(url)}` })
  },
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery1, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash, path: `/${pid}${buildSuffix(url)}` })
  }),
  "blog": {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query2, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash, path: `/blog/${slug?.join('/')}${buildSuffix(url)}` })
    }),
    "hoge": {
      _fuga: (fuga?: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash, path: `/blog/hoge/${fuga?.join('/')}${buildSuffix(url)}` })
      })
    }
  },
  "aaa": {
    _bbb: (bbb: string[]) => ({
      "ccc": {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash, path: `/aaa/${bbb?.join('/')}/ccc${buildSuffix(url)}` })
      }
    }),
  },
  "x": {
    _y: (y: string | number) => ({
      "z": {
        $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]/z' as const, query: { y }, hash: url?.hash, path: `/x/${y}/z${buildSuffix(url)}` })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]' as const, query: { y }, hash: url?.hash, path: `/x/${y}${buildSuffix(url)}` })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/x' as const, hash: url?.hash, path: `/x${buildSuffix(url)}` })
  },
  "_ignore": {
    $url: (url?: { hash?: string }) => ({ pathname: '/.ignore' as const, hash: url?.hash, path: `/.ignore${buildSuffix(url)}` })
  },
  _a: (a: string | number) => ({
    "b": {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash, path: `/${a}/b/${c?.join('/')}${buildSuffix(url)}` })
      })
    }
  }),
  $url: (url: { query: Query0, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash, path: `/${buildSuffix(url)}` }),
  "children": {
    "%E6%97%A5%E6%9C%AC%E8%AA%9E": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/%E6%97%A5%E6%9C%AC%E8%AA%9E' as const, hash: url?.hash })
    },
    "_ignore": {
      $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/.ignore' as const, hash: url?.hash })
    },
    _a: (a: string | number) => ({
      "b": {
        _c: (c: string[]) => ({
          $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash })
        })
      }
    }),
    _pid: (pid: string | number) => ({
      $url: (url?: { query?: OptionalQuery3 | undefined, hash?: string | undefined } | undefined) => ({ pathname: '/children/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash })
    }),
    "aaa": {
      _bbb: (bbb: string[]) => ({
        "ccc": {
          $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash })
        }
      }),
      "api": {
        "samples": {
          $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/aaa/api/samples' as const, hash: url?.hash })
        }
      }
    },
    "api": {
      "users": {
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/api/users' as const, hash: url?.hash })
      }
    },
    "blog": {
      _slug: (slug: string[]) => ({
        $url: (url: { query: Query4, hash?: string | undefined }) => ({ pathname: '/children/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash })
      }),
      "hoge": {
        _fuga: (fuga?: string[] | undefined) => ({
          $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash })
        })
      }
    },
    "x": {
      _y: (y: string | number) => ({
        $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/x/[y]' as const, query: { y }, hash: url?.hash }),
        "z": {
          $url: (url?: { hash?: string | undefined } | undefined) => ({ pathname: '/children/x/[y]/z' as const, query: { y }, hash: url?.hash })
        }
      })
    }
  }
}

export type PagesPath = typeof pagesPath

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
} as const

export type StaticPath = typeof staticPath
