import fs from 'fs';
import path from 'path';
import { describe, expect, test } from 'vitest';
import { projects } from '../projects/projects.js';
import build, { resetCache } from '../src/buildTemplate.js';
import getConfig from '../src/getConfig.js';

describe('cli test', () => {
  test('main', async () => {
    for (const project of projects) {
      resetCache();

      const workingDir = path.join(process.cwd(), 'projects', project.dir);
      const { input, staticDir, output, ignorePath, pageExtensions, appDir } = await getConfig(
        project.enableStatic,
        project.output && path.join(workingDir, project.output),
        project.ignorePath,
        workingDir,
      );

      const result = fs.readFileSync(`${output}/$path.ts`, 'utf8');
      const basepath = /-basepath$/.test(project.dir) ? '/foo/bar' : undefined;
      const { filePath, text } = build({
        input,
        staticDir,
        output,
        ignorePath,
        pageExtensions,
        appDir,
        basepath,
      });

      expect(filePath).toBe(`${output}/$path.ts`);
      expect(
        text.replace(
          new RegExp(
            `${
              /\\/.test(workingDir) ? `${workingDir.replace(/\\/g, '\\\\')}(/src)?` : workingDir
            }/`,
            'g',
          ),
          '',
        ),
      ).toBe(result.replace(/\r/g, ''));
    }
  });
});
