import { formatUrl } from 'next/dist/shared/lib/router/utils/format-url';
import { interpolateAs } from 'next/dist/shared/lib/router/router';
import type { ParsedUrlQuery } from 'querystring';
import type { UrlObject } from 'url';
import type { Query as Query4 } from '../../../pages'
import type { OptionalQuery as OptionalQuery5 } from '../../../pages/[pid]'
import type { Query as Query6 } from '../../../pages/blog/[...slug]'

const omitParmsFromQuery = (query: ParsedUrlQuery, params: string[]) => {
  const filteredQuery: ParsedUrlQuery = {};

  Object.keys(query).forEach((key) => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key];
    }
  });
  return filteredQuery;
}

const objToAsPath = (url: UrlObject) => {
  let interpolatedAs = '';

  const { result, params } = interpolateAs(
    url.pathname,
    url.pathname,
    url.query as ParsedUrlQuery,
  );

  if (result) {
    interpolatedAs = formatUrl({
      pathname: result,
      hash: url.hash,
      query:
        url.query && typeof url.query !== 'string'
          ? omitParmsFromQuery(url.query as ParsedUrlQuery, params)
          : url.query,
    });
  }

  return interpolatedAs;
};

export const pagesPath = {
  _a: (a: string | number) => ({
    b: {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash }),
        $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash }))
      })
    }
  }),
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery5, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash }),
    $asPath: (url?: { query?: OptionalQuery5, hash?: string }) => (objToAsPath({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash }))
  }),
  aaa: {
    _bbb: (bbb: string[]) => ({
      ccc: {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash }),
        $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash }))
      }
    }),
    api: {
      samples: {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/api/samples' as const, hash: url?.hash }),
        $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/aaa/api/samples' as const, hash: url?.hash }))
      }
    }
  },
  blog: {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query6, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash }),
      $asPath: (url: { query: Query6, hash?: string }) => (objToAsPath({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash }))
    }),
    hoge: {
      _fuga: (fuga?: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash }),
        $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash }))
      })
    }
  },
  x: {
    $url: (url?: { hash?: string }) => ({ pathname: '/x' as const, hash: url?.hash }),
    $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/x' as const, hash: url?.hash })),
    _y: (y: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]' as const, query: { y }, hash: url?.hash }),
      $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/x/[y]' as const, query: { y }, hash: url?.hash })),
      z: {
        $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]/z' as const, query: { y }, hash: url?.hash }),
        $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/x/[y]/z' as const, query: { y }, hash: url?.hash }))
      }
    })
  },
  $url: (url: { query: Query4, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash }),
  $asPath: (url: { query: Query4, hash?: string }) => (objToAsPath({ pathname: '/' as const, query: url.query, hash: url.hash }))
}

export type PagesPath = typeof pagesPath
