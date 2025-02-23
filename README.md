# pathpida

<br />
<img src="https://aspida.github.io/pathpida/logos/png/logo.png" alt="pathpida" title="pathpida" />
<div align="center">
  <a href="https://www.npmjs.com/package/pathpida">
    <img src="https://img.shields.io/npm/v/pathpida" alt="npm version" />
  </a>
  <a href="https://www.npmjs.com/package/pathpida">
    <img src="https://img.shields.io/npm/dm/pathpida" alt="npm download" />
  </a>
  <a href="https://github.com/aspida/pathpida/actions?query=workflow%3A%22Node.js+CI%22">
    <img src="https://github.com/aspida/pathpida/workflows/Node.js%20CI/badge.svg?branch=master" alt="Node.js CI" />
  </a>
  <a href="https://lgtm.com/projects/g/aspida/pathpida/context:javascript">
    <img src="https://img.shields.io/lgtm/grade/javascript/g/aspida/pathpida.svg" alt="Language grade: JavaScript" />
  </a>
</div>
<br />
<p align="center">TypeScript friendly pages and static path generator for Next.js.</p>
<br />
<br />

## Breaking change :warning:

### 2024/12/14

Since pathpida >= `0.23.0` , removed Nuxt support.

### 2022/11/25

Since pathpida >= `0.20.0` , removed Sapper support.

## Features

- **Type safety**. Automatically generate type definition files for manipulating internal links in Next.js.
- **Zero configuration**. No configuration required can be used immediately after installation.
- **Zero runtime**. Lightweight because runtime code is not included in the bundle.
- **Support for static files**. Static files in public/ are also supported, so static assets can be safely referenced.
- **Support for appDir of Next.js 13 Layout**.

## Table of Contents

- [Install](#Install)
- [Command Line Interface Options](#CLI-options)
- [Setup](#Setup)
- [Usage](#Usage)
- [Define query](#Define-query)
- [Generate static files path](#Generate-static-files-path)
- [License](#License)

## Install

- Using [npm](https://www.npmjs.com/):

  ```sh
  $ npm install pathpida npm-run-all --save-dev
  ```

- Using [Yarn](https://yarnpkg.com/):

  ```sh
  $ yarn add pathpida npm-run-all --dev
  ```

<a id="CLI-options"></a>

## Command Line Interface Options

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th width="100%">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td nowrap><code>--enableStatic</code><br /><code>-s</code></td>
      <td></td>
      <td>Generate static files path in <code>$path.ts</code>.</td>
    </tr>
    <tr>
      <td nowrap><code>--ignorePath</code><br /><code>-p</code></td>
      <td><code>string</code></td>
      <td>Specify the ignore pattern file path.</td>
    </tr>
    <tr>
      <td nowrap><code>--output</code><br /><code>-o</code></td>
      <td><code>string</code></td>
      <td>Specify the output directory for <code>$path.ts</code>.</td>
    </tr>
    <tr>
      <td nowrap><code>--watch</code><br /><code>-w</code></td>
      <td></td>
      <td>
        Enable watch mode.<br />
        Regenerate <code>$path.ts</code>.
      </td>
    </tr>
    <tr>
      <td nowrap><code>--version</code><br /><code>-v</code></td>
      <td></td>
      <td>Print pathpida version.</td>
    </tr>
  </tbody>
</table>

## Setup

`package.json`

```json
{
  "scripts": {
    "dev": "run-p dev:*",
    "dev:next": "next dev",
    "dev:path": "pathpida --ignorePath .gitignore --watch",
    "build": "pathpida --ignorePath .gitignore && next build"
  }
}
```

## Usage

```
pages/index.tsx
pages/post/create.tsx
pages/post/[pid].tsx
pages/post/[...slug].tsx

lib/$path.ts or utils/$path.ts // Generated automatically by pathpida
```

or

```
src/pages/index.tsx
src/pages/post/create.tsx
src/pages/post/[pid].tsx
src/pages/post/[...slug].tsx

src/lib/$path.ts or src/utils/$path.ts // Generated automatically by pathpida
```

`pages/index.tsx`

```tsx
import Link from "next/link";
import { pagesPath } from "../lib/$path";

console.log(pagesPath.post.create.$url()); // { pathname: '/post/create' }
console.log(pagesPath.post._pid(1).$url()); // { pathname: '/post/[pid]', query: { pid: 1 }}
console.log(pagesPath.post._slug(["a", "b", "c"]).$url()); // { pathname: '/post//[...slug]', query: { slug: ['a', 'b', 'c'] }}

export default () => {
  const onClick = useCallback(() => {
    router.push(pagesPath.post._pid(1).$url());
  }, []);

  return (
    <>
      <Link href={pagesPath.post._slug(["a", "b", "c"]).$url()} />
      <div onClick={onClick} />
    </>
  );
};
```

<a id="Define-query"></a>

## Define query

`pages/post/create.tsx`

```tsx
export type Query = {
  userId: number;
  name?: string;
};

export default () => <div />;
```

`pages/post/[pid].tsx`

```tsx
export type OptionalQuery = {
  limit: number;
  label?: string;
};

export default () => <div />;
```

`pages/index.tsx`

```tsx
import Link from "next/link";
import { pagesPath } from "../lib/$path";

console.log(pagesPath.post.create.$url({ query: { userId: 1 } })); // { pathname: '/post/create', query: { userId: 1 }}
console.log(pagesPath.post.create.$url()); // type error
console.log(pagesPath.post._pid(1).$url()); // { pathname: '/post/[pid]', query: { pid: 1 }}
console.log(pagesPath.post._pid(1).$url({ query: { limit: 10 }, hash: "sample" })); // { pathname: '/post/[pid]', query: { pid: 1, limit: 10 }, hash: 'sample' }

export default () => {
  const onClick = useCallback(() => {
    router.push(pagesPath.post._pid(1).$url());
  }, []);

  return (
    <>
      <Link href={pagesPath.post._slug(["a", "b", "c"]).$url()} />
      <div onClick={onClick} />
    </>
  );
};
```

<a id="Convert query types"></a>

### Convert query types

```tsx
import type { ToNextSearchParams } from "../lib/$path";

export type Query = {
  limit: number;
  productIds: number[];
};

type PageProps = {
  searchParams: ToNextSearchParams<Query>;
}
// {
//   limit: number;          // number -> string
//   productIds: number[];   // number[] -> string[]
// }
```


<a id="Generate-static-files-path"></a>

## Generate static files path

`package.json`

```json
{
  "scripts": {
    "dev": "run-p dev:*",
    "dev:next": "next dev",
    "dev:path": "pathpida --enableStatic --watch",
    "build": "pathpida --enableStatic && next build"
  }
}
```

```
pages/index.tsx
pages/post/create.tsx
pages/post/[pid].tsx
pages/post/[...slug].tsx

public/aa.json
public/bb/cc.png

lib/$path.ts or utils/$path.ts // Generated automatically by pathpida
```

or

```
src/pages/index.tsx
src/pages/post/create.tsx
src/pages/post/[pid].tsx
src/pages/post/[...slug].tsx

public/aa.json
public/bb/cc.png

src/lib/$path.ts or src/utils/$path.ts // Generated automatically by pathpida
```

`pages/index.tsx`

```tsx
import Link from "next/link";
import { pagesPath, staticPath } from "../lib/$path";

console.log(staticPath.aa_json); // /aa.json

export default () => {
  return (
    <>
      <Link href={pagesPath.post._slug(["a", "b", "c"]).$url()} />
      <img src={staticPath.bb.cc_png} />
    </>
  );
};
```

## License

pathpida is licensed under a [MIT License](https://github.com/aspida/pathpida/blob/master/LICENSE).
