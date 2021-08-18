import { exec } from 'child_process'
import { promisify } from 'util'
import { projects } from './projects'

const ex = promisify(exec)

Promise.all(
  projects.flatMap(({ dir, output }) => [
    ex(`cd projects/${dir} && node ../../bin/index.js --enableStatic`),
    ex(`cd projects/${dir} && node ../../bin/index.js --output ${output}/basic`),
    ex(`cd projects/${dir} && node ../../bin/index.js --output ${output}/static --enableStatic`)
  ])
)
