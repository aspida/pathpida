import fs from 'fs'
import path from 'path'
import { loadNuxtConfig } from '@nuxt/config'
import loadNextConfig from 'next/dist/next-server/server/config'

export type Config = {
  type: 'nextjs' | 'nuxtjs'
  input: string
  staticDir?: string
  output: string
  trailingSlash?: boolean
  basepath?: string
}

const getFrameworkType = (dir: string) => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
  const deps = Object.assign(packageJson.devDependencies ?? {}, packageJson.dependencies ?? {})

  return deps.nuxt ? 'nuxtjs' : 'nextjs'
}

export default async (enableStatic: boolean, dir = process.cwd()): Promise<Config> => {
  const nuxttsPath = path.join(dir, 'nuxt.config.ts')
  const type = getFrameworkType(dir)

  if (type === 'nextjs') {
    const config = loadNextConfig(require('next/constants').PHASE_PRODUCTION_BUILD, dir)
    const srcDir = fs.existsSync(path.posix.join(dir, 'pages')) ? dir : path.posix.join(dir, 'src')
    const nextUtilsPath = path.join(srcDir, 'utils')
    const nextLibPath = path.join(srcDir, 'lib')
    const output = fs.existsSync(nextUtilsPath) ? nextUtilsPath : nextLibPath

    if (!fs.existsSync(output)) fs.mkdirSync(output)

    return {
      type,
      input: path.posix.join(srcDir, 'pages'),
      staticDir: enableStatic ? path.posix.join(dir, 'public') : undefined,
      output,
      basepath: config.basePath
    }
  } else {
    const config = await loadNuxtConfig({
      rootDir: dir,
      configFile: fs.existsSync(nuxttsPath) ? nuxttsPath : undefined
    })
    const srcDir = path.posix.join(dir, config.srcDir ?? '')

    return {
      type,
      input: path.posix.join(srcDir, 'pages'),
      staticDir: enableStatic ? path.posix.join(srcDir, 'static') : undefined,
      output: path.posix.join(srcDir, 'plugins'),
      trailingSlash: config.router?.trailingSlash,
      basepath: config.router?.base
    }
  }
}
