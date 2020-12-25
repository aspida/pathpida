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
  const inputPath = path.posix.join(dir, 'pages')
  const type = fs.existsSync(nuxtjsPath) || fs.existsSync(nuxttsPath) ? 'nuxtjs' : 'nextjs'
  if (type === 'nextjs') {
    const srcDir = fs.existsSync(inputPath) ? dir : path.posix.join(dir, 'src')
    const nextUtilsPath = path.join(srcDir, 'utils')
    const nextLibPath = path.join(srcDir, 'lib')
    const output = fs.existsSync(nextUtilsPath) ? nextUtilsPath : nextLibPath

    if (!fs.existsSync(output)) fs.mkdirSync(output)

    return {
      type: 'nextjs',
      input: path.posix.join(srcDir, 'pages'),
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
