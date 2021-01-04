import fs from 'fs'
import path from 'path'
import { loadNuxtConfig } from '@nuxt/config'

export type Config = {
  type: 'nextjs' | 'nuxtjs'
  input: string
  staticDir?: string
  output: string
  trailingSlash?: boolean
}

export default async (enableStatic: boolean, dir = process.cwd()): Promise<Config> => {
  const nuxtjsPath = path.join(dir, 'nuxt.config.js')
  const nuxttsPath = path.join(dir, 'nuxt.config.ts')
  const type = fs.existsSync(nuxtjsPath) || fs.existsSync(nuxttsPath) ? 'nuxtjs' : 'nextjs'

  if (type === 'nextjs') {
    const srcDir = fs.existsSync(path.posix.join(dir, 'pages')) ? dir : path.posix.join(dir, 'src')
    const nextUtilsPath = path.join(srcDir, 'utils')
    const nextLibPath = path.join(srcDir, 'lib')
    const output = fs.existsSync(nextUtilsPath) ? nextUtilsPath : nextLibPath

    if (!fs.existsSync(output)) fs.mkdirSync(output)

    return {
      type,
      input: path.posix.join(srcDir, 'pages'),
      staticDir: enableStatic ? path.posix.join(dir, 'public') : undefined,
      output
    }
  } else {
    const config = await loadNuxtConfig({ rootDir: dir })
    const srcDir = path.posix.join(dir, config.srcDir ?? '')

    return {
      type,
      input: path.posix.join(srcDir, 'pages'),
      staticDir: enableStatic ? path.posix.join(srcDir, 'static') : undefined,
      output: path.posix.join(srcDir, 'plugins'),
      trailingSlash: config.router?.trailingSlash
    }
  }
}
