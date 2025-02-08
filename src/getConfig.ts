import fs from 'fs';
// import type { NextConfig } from 'next/dist/server/config'
import type { NextConfig } from 'next';
import path from 'path';

export type Config = {
  input: string | undefined;
  appDir: { input: string } | undefined;
  staticDir: string | undefined;
  output: string;
  ignorePath: string | undefined;
  basepath?: string | undefined;
  pageExtensions?: string[] | undefined;
};

export default async (
  enableStatic: boolean,
  output: string | undefined,
  igPath: string | undefined,
  dir = process.cwd(),
): Promise<Config> => {
  const ignorePath = igPath && path.join(dir, igPath);

  let config: NextConfig;

  try {
    // >= v11.1.0
    config = await require('next/dist/server/config').default(
      require('next/constants').PHASE_PRODUCTION_BUILD,
      dir,
    );
  } catch (_) {
    // < v11.1.0
    config = await require('next/dist/next-server/server/config').default(
      require('next/constants').PHASE_PRODUCTION_BUILD,
      dir,
    );
  }

  const srcDir =
    fs.existsSync(path.posix.join(dir, 'src/pages')) ||
    fs.existsSync(path.posix.join(dir, 'src/app'))
      ? path.posix.join(dir, 'src')
      : dir;

  const isAppDirUsed = fs.existsSync(path.posix.join(srcDir, 'app'));

  let outDir = output;

  if (!outDir) {
    const utilsPath = path.join(srcDir, 'utils');
    outDir = fs.existsSync(utilsPath) ? utilsPath : path.join(srcDir, 'lib');
  }

  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

  const inputDir = path.posix.join(srcDir, 'pages');

  return {
    input: fs.existsSync(inputDir) ? inputDir : undefined,
    staticDir: enableStatic ? path.posix.join(dir, 'public') : undefined,
    output: outDir,
    ignorePath,
    appDir: isAppDirUsed ? { input: path.posix.join(srcDir, 'app') } : undefined,
    pageExtensions: config.pageExtensions,
    basepath: config.basePath,
  };
};
