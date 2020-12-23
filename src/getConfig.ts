import fs from 'fs'
import path from 'path'

export type Config = {
  type: 'nextjs' | 'nuxtjs'
  input: string
  output: string
  trailingSlash?: boolean
}

export default (dir = process.cwd()): Config => {
  const nuxtjsPath = path.join(dir, 'nuxt.config.js')
  const nuxttsPath = path.join(dir, 'nuxt.config.ts')
  const nextLibPath = path.join(dir, 'lib')
  const inputPath = path.posix.join(dir, 'pages')
  const type = fs.existsSync(nuxtjsPath) || fs.existsSync(nuxttsPath) ? 'nuxtjs' : 'nextjs'
  if (type === 'nextjs') {
    if (!fs.existsSync(nextLibPath)) fs.mkdirSync(nextLibPath)

    return { type: 'nextjs', input: inputPath, output: nextLibPath }
  } else {
    const config = fs.existsSync(nuxtjsPath)
      ? require(nuxtjsPath)
      : { trailingSlash: /trailingSlash: true/.test(fs.readFileSync(nuxttsPath, 'utf8')) }

    return {
      type: 'nuxtjs',
      input: inputPath,
      output: path.posix.join(dir, 'plugins'),
      trailingSlash: config.trailingSlash
    }
  }
}
