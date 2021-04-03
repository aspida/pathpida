import minimist from 'minimist'
import getConfig from './getConfig'
import write from './writeRouteFile'
import watch from './watchInputDir'
import build from './buildTemplate'

export const run = async (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'watch', 'enableStatic'],
    alias: { v: 'version', w: 'watch', s: 'enableStatic' }
  })

  argv.version !== undefined
    ? console.log(`v${require('../package.json').version}`)
    : argv.watch !== undefined
    ? await (async () => {
        const config = await getConfig(argv.enableStatic !== undefined)
        write(build(config))
        watch(config.input, () => write(build(config, 'pages')))
        config.staticDir && watch(config.staticDir, () => write(build(config, 'static')))
      })()
    : write(build(await getConfig(argv.enableStatic !== undefined)))
}
