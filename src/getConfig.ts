import fs from 'fs';
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

  let config: { basePath?: string | undefined; pageExtensions?: string[] | undefined };

  try {
    // Vinext
    const vinextModule = await import('vinext/internal/config/next-config');
    config = (await vinextModule.loadNextConfig(dir, vinextModule.PHASE_PRODUCTION_BUILD)) ?? {};
  } catch (_) {
    // Next.js
    const nextModule = await import('next/dist/server/config');
    const nextConstants = await import('next/constants');
    config = await nextModule.default(nextConstants.PHASE_PRODUCTION_BUILD, dir);
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
