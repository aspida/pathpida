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

### Setup

`package.json`

```json
{
  "scripts": {
    "dev:path": "pathpida --watch",
    "build:path": "pathpida"
  }
}
```

If you are using Nuxt.js, add the following.

`nuxt.config.js` or `nuxt.config.ts`

```js
{
  plugins: ['~/plugins/$path'],
  router: {
    trailingSlash: true // optional
  }
}
```

### Usage (Next.js)

```
pages/index.tsx
pages/post/create.tsx
pages/post/[pid].tsx
pages/post/[...slug].tsx

lib/$path.ts // Generated automatically by pathpida
```

`pages/index.tsx`

```tsx
import Link from 'next/link'
import { pagesPath } from '../lib/$path'

console.log(pagesPath.post.create.$path())
console.log(pagesPath.post._pid(1).$path())
console.log(pagesPath.post._slug(['a', 'b', 'c']).$path())

export default () => {
  const onclick = useCallback(() => {
    router.push(pagesPath.post._pid(1).$path())
  }, [])

  return <>
    <Link href={pagesPath.post._slug(['a', 'b', 'c']).$path()} />
    <div onclick={onclick} />
  </>
}
```

### Add query

`pages/post/create.tsx`

```tsx
export type Query = {
  userId: number
  name?: string
}

export default () => <div />
```

`pages/post/[pid].tsx`

```tsx
export type OptionalQuery = {
  limit: number
  label?: string
}

export default () => <div />
```

`pages/index.tsx`

```tsx
import Link from 'next/link'
import { pagesPath } from '../lib/$path'

console.log(pagesPath.post.create.$path({ userId: 1 }))
console.log(pagesPath.post.create.$path()) // type error
console.log(pagesPath.post._pid(1).$path())
console.log(pagesPath.post._pid(1).$path({ limit: 10 }))

export default () => {
  const onclick = useCallback(() => {
    router.push(pagesPath.post._pid(1).$path())
  }, [])

  return <>
    <Link href={pagesPath.post._slug(['a', 'b', 'c']).$path()} />
    <div onclick={onclick} />
  </>
}
```

### Add public files path

`package.json`

```json
{
  "scripts": {
    "dev:path": "pathpida --enableStatic --watch",
    "build:path": "pathpida --enableStatic"
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

lib/$path.ts // Generated automatically by pathpida
```

`pages/index.tsx`

```tsx
import Link from 'next/link'
import { pagesPath, staticPath } from '../lib/$path'

console.log(staticPath.aa_json) // /aa.json

export default () => {
  return <>
    <Link href={pagesPath.post._slug(['a', 'b', 'c']).$path()} />
    <img src={staticPath.bb.cc_png} />
  </>
}
```

### Usage (Nuxt.js)

```
pages/index.vue
pages/post/create.vue
pages/post/_pid.tsx

plugins/$path.ts // Generated automatically by pathpida
```

`pages/index.vue`

```vue
<template>
  <div>
    <nuxt-link :to="$pagesPath.post._pid(1).$path()" />
    <div @click="onclick" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    onclick() {
      this.$router.push(this.$pagesPath.post._pid(1).$path())
    }
  }
})
</script>
```

### Add query

`pages/post/create.vue`

```vue
<script lang="ts">
import Vue from 'vue'

export type Query = {
  userId: number
  name?: string
}

export default Vue.extend({
})
</script>
```

`pages/post/[pid].vue`

```vue
<script lang="ts">
import Vue from 'vue'

export type OptionalQuery = {
  limit: number
  label?: string
}

export default Vue.extend({
})
</script>
```

`pages/index.vue`

```vue
<template>
  <div>
    <nuxt-link :to="$pagesPath.post.create.$path({ userId: 1 })" />
    <div @click="onclick" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    onclick() {
      this.$router.push(this.$pagesPath.post._pid(1).$path())
      this.$router.push(this.$pagesPath.post._pid(1).$path({ limit: 10 }))
    }
  }
})
</script>
```

### Add static files path

`package.json`

```json
{
  "scripts": {
    "dev:path": "pathpida --enableStatic --watch",
    "build:path": "pathpida --enableStatic"
  }
}
```

```
pages/index.vue
pages/post/create.vue
pages/post/[pid].vue

static/aa.json
static/bb/cc.png

plugins/$path.ts // Generated automatically by pathpida
```

`pages/index.vue`

```vue
<template>
  <div>
    <nuxt-link :to="$pagesPath.post.create.$path({ userId: 1 })" />
    <img :src="$staticPath.bb.cc_png" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({})
</script>
```

## License

pathpida is licensed under a [MIT License](https://github.com/aspida/pathpida/blob/master/LICENSE).
