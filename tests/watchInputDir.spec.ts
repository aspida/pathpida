import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { expect, test, vi } from 'vitest';
import { watchInputDir } from '../src/watchInputDir.js';

test('watches nested files, ignores generated temporary files, and combines nearby changes', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'pathpida-watch-'));
  const nestedDir = path.join(dir, 'nested');
  mkdirSync(nestedDir);
  const callback = vi.fn();
  const watcher = watchInputDir(dir, callback);

  try {
    await sleep(200);
    expect(callback).not.toHaveBeenCalled();

    writeFileSync(path.join(nestedDir, '$temporary.ts'), 'ignored');
    await sleep(250);
    expect(callback).not.toHaveBeenCalled();

    const source = path.join(nestedDir, 'source.ts');
    writeFileSync(source, 'first');
    writeFileSync(source, 'second');
    writeFileSync(source, 'third');

    await vi.waitFor(() => expect(callback).toHaveBeenCalledTimes(1), { timeout: 3000 });
    await sleep(200);
    expect(callback).toHaveBeenCalledTimes(1);
  } finally {
    watcher.close();
    rmSync(dir, { recursive: true, force: true });
  }
});

test('waits for a running generation before handling another change', async () => {
  const dir = mkdtempSync(path.join(tmpdir(), 'pathpida-watch-'));
  const source = path.join(dir, 'source.ts');
  let finishFirst!: () => void;
  const firstGeneration = new Promise<void>((resolve) => {
    finishFirst = resolve;
  });
  let active = 0;
  let maxActive = 0;
  const callback = vi.fn(async () => {
    active++;
    maxActive = Math.max(maxActive, active);
    if (callback.mock.calls.length === 1) await firstGeneration;
    active--;
  });
  const watcher = watchInputDir(dir, callback);

  try {
    writeFileSync(source, 'first');
    await vi.waitFor(() => expect(callback).toHaveBeenCalledTimes(1), { timeout: 3000 });

    writeFileSync(source, 'second');
    await sleep(250);
    expect(callback).toHaveBeenCalledTimes(1);

    finishFirst();
    await vi.waitFor(() => expect(callback).toHaveBeenCalledTimes(2), { timeout: 3000 });
    expect(maxActive).toBe(1);
  } finally {
    finishFirst();
    watcher.close();
    rmSync(dir, { recursive: true, force: true });
  }
});
