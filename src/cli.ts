import minimist from 'minimist'
import getConfig from './getConfig'
import write from './writeRouteFile'
import watch from './watchInputDir'
import build from './buildTemplate'

export const run = (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'watch', 'enableStatic'],
    alias: { v: 'version', w: 'watch', s: 'enableStatic' }
  })

  // eslint-disable-next-line no-unused-expressions
  argv.version !== undefined
    ? console.log(`v${require('../package.json').version}`)
    : argv.watch !== undefined
    ? (() => {
        const config = getConfig(argv.enableStatic !== undefined)
        write(build(config))
        watch(config.input, () => write(build(config, 'pages')))
        config.staticDir && watch(config.staticDir, () => write(build(config, 'static')))
      })()
    : write(build(getConfig(argv.enableStatic !== undefined)))
}
