import { watch } from 'node:fs';
import path from 'node:path';

export const watchInputDir = (input: string, callback: () => void | Promise<void>) => {
  let timer: NodeJS.Timeout | undefined;
  let running = false;
  let pending = false;

  const regenerate = async () => {
    if (running) {
      pending = true;
      return;
    }

    running = true;

    try {
      do {
        pending = false;

        try {
          await callback();
        } catch (error) {
          console.error(error);
        }
      } while (pending);
    } finally {
      running = false;
    }
  };

  const watcher = watch(input, { recursive: true }, (_event, filename) => {
    if (filename && /^\$[^/\\]+\.ts$/.test(path.basename(filename.toString()))) return;

    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      void regenerate();
    }, 100);
  });

  watcher.on('close', () => {
    if (timer) clearTimeout(timer);
  });

  return watcher;
};
