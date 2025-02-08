import fs from 'fs';
import type { Ignore } from 'ignore';
import ignore from 'ignore';
import path from 'path';

export const createIg = (ignorePath: string | undefined) =>
  ignorePath === undefined ? undefined : ignore().add(fs.readFileSync(ignorePath).toString());

export const isIgnored = (
  ig: Ignore | undefined,
  ignorePath: string | undefined,
  targetDir: string,
  file: string,
) =>
  !!ig?.ignores(
    path.relative(
      (ignorePath ?? '').replace(path.basename(ignorePath ?? ''), ''),
      path.posix.join(targetDir, file),
    ),
  );
