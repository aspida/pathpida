import { formatUrl } from 'next/dist/shared/lib/router/utils/format-url';
import { interpolateAs } from 'next/dist/shared/lib/router/router';
import type { ParsedUrlQuery } from 'querystring';
import type { UrlObject } from 'url';

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
  custom_ext: {
    hello: {
      $url: (url?: { hash?: string }) => ({ pathname: '/custom-ext/hello' as const, hash: url?.hash }),
      $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/custom-ext/hello' as const, hash: url?.hash }))
    },
    post: {
      _id: (id: string | number) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/custom-ext/post/[id]' as const, query: { id }, hash: url?.hash }),
        $asPath: (url?: { hash?: string }) => (objToAsPath({ pathname: '/custom-ext/post/[id]' as const, query: { id }, hash: url?.hash }))
      })
    }
  },
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
