import fs from 'fs'
import path from 'path'

export type Config = {
  type: 'nextjs' | 'nuxtjs'
  input: string
  staticDir?: string
  output: string
  trailingSlash?: boolean
}

export default (enableStatic: boolean, dir = process.cwd()): Config => {
  const nuxtjsPath = path.join(dir, 'nuxt.config.js')
  const nuxttsPath = path.join(dir, 'nuxt.config.ts')
  const nextLibPath = path.join(dir, 'lib')
  const nextUtilsPath = path.join(dir, 'utils')
  const inputPath = path.posix.join(dir, 'pages')
  const type = fs.existsSync(nuxtjsPath) || fs.existsSync(nuxttsPath) ? 'nuxtjs' : 'nextjs'
  if (type === 'nextjs') {
    const output = fs.existsSync(nextUtilsPath) ? nextUtilsPath : nextLibPath
    if (!fs.existsSync(output)) fs.mkdirSync(output)

    return {
      type: 'nextjs',
      input: inputPath,
      staticDir: enableStatic ? path.posix.join(dir, 'public') : undefined,
      output
    }
  } else {
    const config = fs.existsSync(nuxtjsPath)
      ? require(nuxtjsPath)
      : { trailingSlash: /trailingSlash: true/.test(fs.readFileSync(nuxttsPath, 'utf8')) }

    return {
      type: 'nuxtjs',
      input: inputPath,
      staticDir: enableStatic ? path.posix.join(dir, 'static') : undefined,
      output: path.posix.join(dir, 'plugins'),
      trailingSlash: config.trailingSlash
    }
  }
}
