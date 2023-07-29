import { exec } from 'child_process';
import { projects } from './projects';

projects.forEach(({ dir, output, enableStatic, ignorePath }) =>
  exec(
    `cd projects/${dir} && node ../../bin/index.js${output ? ` --output ${output}` : ''}${
      enableStatic ? ' --enableStatic' : ''
    }${ignorePath ? ` --ignorePath ${ignorePath}` : ''}`,
    (_err, stdout, stderr) => console.log(stdout, stderr)
  )
);
