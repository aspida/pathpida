import fs from 'fs'
import path from 'path'

export type Config = {
  type: 'nextjs' | 'nuxtjs'
  input: string
  output: string
  trailingSlash?: boolean
}

export default (): Config => {
  const type =
    fs.existsSync('nuxt.config.js') || fs.existsSync('nuxt.config.ts') ? 'nuxtjs' : 'nextjs'
  if (type === 'nextjs') {
    if (!fs.existsSync('lib')) fs.mkdirSync('lib')

    return { type: 'nextjs', input: 'pages', output: 'lib' }
  } else {
    const config = fs.existsSync('nuxt.config.js')
      ? require(path.join(process.cwd(), 'nuxt.config.js'))
      : { trailingSlash: /trailingSlash: true/.test(fs.readFileSync('nuxt.config.ts', 'utf8')) }

    return {
      type: 'nuxtjs',
      input: 'pages',
      output: 'plugins',
      trailingSlash: config.trailingSlash
    }
  }
}
