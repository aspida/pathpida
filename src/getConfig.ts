import fs from 'fs'
// import type { NextConfig } from 'next/dist/server/config'
import path from 'path'

export type Config = (
  | { type: 'nextjs'; input: string | undefined; appDir?: { input: string } }
  | { type: 'nuxtjs'; input: string; appDir?: undefined }
) & {
  staticDir: string | undefined
  output: string
  ignorePath: string | undefined
  trailingSlash?: boolean
  basepath?: string
  pageExtensions?: string[]
}

const getFrameworkType = (dir: string) => {
  const packageJson = JSON.parse(fs.readFileSync(path.join(dir, 'package.json'), 'utf8'))
  const deps = Object.assign(packageJson.devDependencies ?? {}, packageJson.dependencies ?? {})

  return deps.nuxt ? 'nuxtjs' : 'nextjs'
}

export default async (
  enableStatic: boolean,
  output: string | undefined,
  igPath: string | undefined,
  dir = process.cwd()
): Promise<Config> => {
  const type = getFrameworkType(dir)
  const ignorePath = igPath && path.join(dir, igPath)

  if (type === 'nextjs') {
    let config /*: NextConfig */

    try {
      // >= v11.1.0
      config = await require('next/dist/server/config').default(
        require('next/constants').PHASE_PRODUCTION_BUILD,
        dir
      )
    } catch (e) {
      // < v11.1.0
      config = await require('next/dist/next-server/server/config').default(
        require('next/constants').PHASE_PRODUCTION_BUILD,
        dir
      )
    }

    const srcDir =
      fs.existsSync(path.posix.join(dir, 'src/pages')) ||
      fs.existsSync(path.posix.join(dir, 'src/app'))
        ? path.posix.join(dir, 'src')
        : dir
                  
    const isAppDirUsed = fs.existsSync(path.posix.join(srcDir, "app"))

    if (!output) {
      const utilsPath = path.join(srcDir, 'utils')
      output = fs.existsSync(utilsPath) ? utilsPath : path.join(srcDir, 'lib')
    }

    if (!fs.existsSync(output)) fs.mkdirSync(output)

    const inputDir = path.posix.join(srcDir, 'pages')

    return {
      type,
      input: fs.existsSync(inputDir) ? inputDir : undefined,
      staticDir: enableStatic ? path.posix.join(dir, 'public') : undefined,
      output,
      ignorePath,
      appDir: isAppDirUsed,
      pageExtensions: config.pageExtensions,
      basepath: config.basePath
    }
  } else {
    const nuxttsPath = path.join(dir, 'nuxt.config.ts')
    const config = await require('@nuxt/config').loadNuxtConfig({
      rootDir: dir,
      configFile: fs.existsSync(nuxttsPath) ? nuxttsPath : undefined
    })
    const srcDir = path.posix.join(dir, config.srcDir ?? '')

    output = output ?? path.posix.join(srcDir, 'plugins')

    if (!fs.existsSync(output)) fs.mkdirSync(output)

    return {
      type,
      input: path.posix.join(srcDir, 'pages'),
      staticDir: enableStatic ? path.posix.join(srcDir, 'static') : undefined,
      output,
      ignorePath,
      trailingSlash: config.router?.trailingSlash,
      basepath: config.router?.base
    }
  }
}
