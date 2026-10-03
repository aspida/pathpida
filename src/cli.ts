import { readFileSync } from 'node:fs';
import { parseArgs } from 'node:util';
import build from './buildTemplate.js';
import getConfig from './getConfig.js';
import watch from './watchInputDir.js';
import write from './writeRouteFile.js';

export const run = async (args: string[]) => {
  const { values } = parseArgs({
    args,
    options: {
      version: { type: 'boolean', short: 'v' },
      enableStatic: { type: 'boolean', short: 's' },
      output: { type: 'string', short: 'o' },
      ignorePath: { type: 'string', short: 'p' },
      watch: { type: 'boolean', short: 'w' },
    },
  });

  if (values.version) {
    const { version } = JSON.parse(
      readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
    );
    console.log(`v${version}`);
    return;
  }

  const config = await getConfig(!!values.enableStatic, values.output, values.ignorePath);

  write(build(config));

  if (values.watch) {
    if (config.input) watch(config.input, () => write(build(config, 'pages')));
    if (config.appDir) watch(config.appDir.input, () => write(build(config, 'pages')));
    if (config.staticDir) watch(config.staticDir, () => write(build(config, 'static')));
  }
};
