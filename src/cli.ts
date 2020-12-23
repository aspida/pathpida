import minimist from 'minimist'
import getConfig from './getConfig'
import write from './writeRouteFile'
import watch from './watchInputDir'
import build from './buildTemplate'

export const run = (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'watch'],
    alias: { v: 'version', w: 'watch' }
  })

  // eslint-disable-next-line no-unused-expressions
  argv.version !== undefined
    ? console.log(`v${require('../package.json').version}`)
    : argv.watch !== undefined
    ? (() => {
        const config = getConfig()
        write(build(config))
        watch(config.input, () => write(build(config)))
      })()
    : write(build(getConfig()))
}
