# pathpida

<br />
<br />
<br />
<br />
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
  <a href="https://codecov.io/gh/aspida/pathpida">
    <img src="https://img.shields.io/codecov/c/github/aspida/pathpida.svg" alt="Codecov" />
  </a>
  <a href="https://lgtm.com/projects/g/aspida/pathpida/context:javascript">
    <img src="https://img.shields.io/lgtm/grade/javascript/g/aspida/pathpida.svg" alt="Language grade: JavaScript" />
  </a>
</div>
<br />
<p align="center">TypeScript friendly pages path generator for Next.js and Nuxt.js.</p>
<br />
<br />

## Getting Started

### Installation

- Using [npm](https://www.npmjs.com/):

  ```sh
  $ npm install pathpida --save-dev
  ```

- Using [Yarn](https://yarnpkg.com/):

  ```sh
  $ yarn add pathpida --dev
  ```

### Make HTTP request from application

`pathpida.config.js`

```js
module.exports = {
  input: "pages",
  output: "types",
  baseURL: "https://example.com/api",
  trailingSlash: false
}
```

`package.json`

```json
{
  "scripts": {
    "build:pathpida": "pathpida"
  }
}
```

`pages/users/[userId].tsx`

```ts
import React from "react"
import $path from "../types/$path"

export type Query = {
  hoge: string
}

export default () => <div>user info</div>
```

`tarminal`

```sh
$ npm run build:pathpida
# types/$path.ts was built successfully.
```

`pages/index.tsx`

```ts
import React from "react"
import $path from "../types/$path"

export type Query = {
  pageid: number
}

export default () => <a href={$path().users._userId(0).$get({ hoge: "fuga" })}>Link to user page</a>
```

## License

pathpida is licensed under a [MIT License](https://github.com/aspida/pathpida/blob/master/LICENSE).
