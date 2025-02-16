import minimist from 'minimist';
import build from './buildTemplate';
import getConfig from './getConfig';
import watch from './watchInputDir';
import write from './writeRouteFile';

export const run = async (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'watch', 'enableStatic', 'output', 'ignorePath'],
    alias: { v: 'version', w: 'watch', s: 'enableStatic', o: 'output', p: 'ignorePath' },
  });

  if (argv.version !== undefined) {
    console.log(`v${require('../package.json').version}`);
    return;
  }

  if (argv.watch !== undefined) {
    const config = await getConfig(argv.enableStatic !== undefined, argv.output, argv.ignorePath);

    write(build(config));

    if (config.input) watch(config.input, () => write(build(config, 'pages')));
    if (config.appDir) watch(config.appDir.input, () => write(build(config, 'pages')));
    if (config.staticDir) watch(config.staticDir, () => write(build(config, 'static')));
  } else {
    await getConfig(argv.enableStatic !== undefined, argv.output, argv.ignorePath)
      .then(build)
      .then(write);
  }
};
