import type { Query as Query_1yksaqv } from '../../../app/page';
import type { OptionalQuery as OptionalQuery_a6l6vr } from '../../../app/(group1)/[pid]/page';
import type { Query as Query_46sa06 } from '../../../app/(group1)/blog/[...slug]/page';

const buildSuffix = (url?: {
  query?: Record<string, string | number | boolean | Array<string | number | boolean>>,
  hash?: string
}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = (() => {
    if (!query) return '';

    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) =>
          params.append(key, String(item))
        );
      } else {
        params.set(key, String(value));
      }
    });

    return `?${params.toString()}`;
  })();
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
  '%E6%97%A5%E6%9C%AC%E8%AA%9E': {
    $url: (url?: { hash?: string }) => ({ pathname: '/%E6%97%A5%E6%9C%AC%E8%AA%9E' as const, hash: url?.hash, path: `/%E6%97%A5%E6%9C%AC%E8%AA%9E${buildSuffix(url)}` })
  },
  _pid: (pid: string | number) => ({
    $url: (url?: { query?: OptionalQuery_a6l6vr, hash?: string }) => ({ pathname: '/[pid]' as const, query: { pid, ...url?.query }, hash: url?.hash, path: `/${pid}${buildSuffix(url)}` })
  }),
  'blog': {
    _slug: (slug: string[]) => ({
      $url: (url: { query: Query_46sa06, hash?: string }) => ({ pathname: '/blog/[...slug]' as const, query: { slug, ...url.query }, hash: url.hash, path: `/blog/${slug?.join('/')}${buildSuffix(url)}` })
    }),
    'hoge': {
      _fuga: (fuga?: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/blog/hoge/[[...fuga]]' as const, query: { fuga }, hash: url?.hash, path: `/blog/hoge/${fuga?.join('/')}${buildSuffix(url)}` })
      })
    }
  },
  'aaa': {
    _bbb: (bbb: string[]) => ({
      'ccc': {
        $url: (url?: { hash?: string }) => ({ pathname: '/aaa/[...bbb]/ccc' as const, query: { bbb }, hash: url?.hash, path: `/aaa/${bbb?.join('/')}/ccc${buildSuffix(url)}` })
      }
    }),
  },
  'x': {
    _y: (y: string | number) => ({
      'z': {
        $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]/z' as const, query: { y }, hash: url?.hash, path: `/x/${y}/z${buildSuffix(url)}` })
      },
      $url: (url?: { hash?: string }) => ({ pathname: '/x/[y]' as const, query: { y }, hash: url?.hash, path: `/x/${y}${buildSuffix(url)}` })
    }),
    $url: (url?: { hash?: string }) => ({ pathname: '/x' as const, hash: url?.hash, path: `/x${buildSuffix(url)}` })
  },
  '_ignore': {
    $url: (url?: { hash?: string }) => ({ pathname: '/.ignore' as const, hash: url?.hash, path: `/.ignore${buildSuffix(url)}` })
  },
  _a: (a: string | number) => ({
    'b': {
      _c: (c: string[]) => ({
        $url: (url?: { hash?: string }) => ({ pathname: '/[a]/b/[...c]' as const, query: { a, c }, hash: url?.hash, path: `/${a}/b/${c?.join('/')}${buildSuffix(url)}` })
      })
    }
  }),
  $url: (url: { query: Query_1yksaqv, hash?: string }) => ({ pathname: '/' as const, query: url.query, hash: url.hash, path: `/${buildSuffix(url)}` })
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
