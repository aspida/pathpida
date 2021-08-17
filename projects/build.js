const { exec } = require('child_process')
const { promisify } = require('util')

const ex = promisify(exec)
const projects = [
  { dir: 'nextjs', options: ['-s'], output: 'out/lib' },
  { dir: 'nextjs-basepath', options: ['-s'], output: 'out/lib' },
  { dir: 'nextjs-src', options: ['-s'], output: 'src/out/lib' },
  { dir: 'nuxtjs', options: ['--enableStatic'], output: 'plugins/util' },
  { dir: 'nuxtjs-basepath', options: ['-s'], output: 'plugins/util' },
  { dir: 'nuxtjs-no-slash', options: [], output: 'plugins/util' },
  { dir: 'nuxtjs-src', options: ['--enableStatic'], output: 'client/plugins/util' },
  { dir: 'sapper', options: ['-s'], output: 'out/lib' }
]

Promise.all(
  projects.flatMap(({ dir, options, output }) => [
    ex(`cd projects/${dir} && node ../../bin/index.js ${options.join(' ')}`),
    ex(`cd projects/${dir} && node ../../bin/index.js ${options.join(' ')} -o ${output}`)
  ])
)
