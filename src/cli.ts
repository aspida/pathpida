import { parseArgs } from 'node:util';
import build from './buildTemplate.js';
import getConfig from './getConfig.js';
import { watchInputDir } from './watchInputDir.js';
import write from './writeRouteFile.js';

export const run = async (args: string[]) => {
  const { values } = parseArgs({
    args,
    options: {
      enableStatic: { type: 'boolean', short: 's' },
      output: { type: 'string', short: 'o' },
      ignorePath: { type: 'string', short: 'p' },
      watch: { type: 'boolean', short: 'w' },
    },
  });

  const config = await getConfig(!!values.enableStatic, values.output, values.ignorePath);

  write(build(config));

  if (values.watch) {
    if (config.input) watchInputDir(config.input, () => write(build(config, 'pages')));
    if (config.appDir) watchInputDir(config.appDir.input, () => write(build(config, 'pages')));
    if (config.staticDir) watchInputDir(config.staticDir, () => write(build(config, 'static')));
  }
};
