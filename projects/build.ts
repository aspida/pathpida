import { exec } from 'child_process'
import { promisify } from 'util'
import { projects } from './projects'

const ex = promisify(exec)

Promise.all(
  projects.flatMap(({ dir, options, output }) => [
    ex(`cd projects/${dir} && node ../../bin/index.js ${options.join(' ')}`),
    ex(`cd projects/${dir} && node ../../bin/index.js ${options.join(' ')} -o ${output}`)
  ])
)
