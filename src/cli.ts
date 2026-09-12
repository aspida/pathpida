import { readFileSync } from 'node:fs';
import minimist from 'minimist';
import build from './buildTemplate.js';
import getConfig from './getConfig.js';
import watch from './watchInputDir.js';
import write from './writeRouteFile.js';

export const run = async (args: string[]) => {
  const argv = minimist(args, {
    string: ['version', 'watch', 'enableStatic', 'output', 'ignorePath'],
    alias: { v: 'version', w: 'watch', s: 'enableStatic', o: 'output', p: 'ignorePath' },
  });

  if (argv.version !== undefined) {
    const { version } = JSON.parse(
      readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
    );
    console.log(`v${version}`);
    return;
  }

  const config = await getConfig(argv.enableStatic !== undefined, argv.output, argv.ignorePath);

  write(build(config));

  if (argv.watch !== undefined) {
    if (config.input) watch(config.input, () => write(build(config, 'pages')));
    if (config.appDir) watch(config.appDir.input, () => write(build(config, 'pages')));
    if (config.staticDir) watch(config.staticDir, () => write(build(config, 'static')));
  }
};
