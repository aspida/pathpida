import fs from 'fs';
import path from 'path';
import { version } from '../package.json';
import { projects } from '../projects/projects';
import build, { resetCache } from '../src/buildTemplate';
import { run } from '../src/cli';
import getConfig from '../src/getConfig';

jest.setTimeout(30000);

const nodeVer = +process.versions.node.split('.')[0];

describe('cli test', () => {
  test('version command', async () => {
    const spyLog = jest.spyOn(console, 'log').mockImplementation(x => x);
    const args = ['--version'];

    await run(args);
    expect(console.log).toHaveBeenCalledWith(`v${version}`);

    spyLog.mockReset();
    spyLog.mockRestore();
  });

  test('main', async () => {
    for (const project of projects) {
      if (nodeVer < project.nodeVer) continue;

      resetCache();

      const workingDir = path.join(process.cwd(), 'projects', project.dir);
      const { type, input, staticDir, output, ignorePath, trailingSlash, pageExtensions, appDir } =
        await getConfig(
          project.enableStatic,
          project.output && path.join(workingDir, project.output),
          project.ignorePath,
          workingDir
        );

      const result = fs.readFileSync(`${output}/$path.ts`, 'utf8');
      const basepath = /-basepath$/.test(project.dir) ? '/foo/bar' : undefined;
      const { filePath, text } = build(
        type === 'nextjs'
          ? {
              type,
              input,
              staticDir,
              output,
              ignorePath,
              pageExtensions,
              trailingSlash,
              appDir,
              basepath
            }
          : {
              type,
              input,
              staticDir,
              output,
              ignorePath,
              pageExtensions,
              trailingSlash,
              basepath
            }
      );

      expect(filePath).toBe(`${output}/$path.ts`);
      expect(
        text.replace(
          new RegExp(
            `${
              /\\/.test(workingDir) ? `${workingDir.replace(/\\/g, '\\\\')}(/src)?` : workingDir
            }/`,
            'g'
          ),
          ''
        )
      ).toBe(result.replace(/\r/g, ''));
    }
  });
});
