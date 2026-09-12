#!/usr/bin/env node
import { run } from '../dist/cli.js';

await run(process.argv.slice(2));
