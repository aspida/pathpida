import fs from 'fs'
import path from 'path'
import { version } from '../package.json'
import build, { resetCache } from '../src/buildTemplate'
import { run } from '../src/cli'
import getConfig from '../src/getConfig'

describe('cli test', () => {
  test('version command', async () => {
    const spyLog = jest.spyOn(console, 'log').mockImplementation(x => x)
    const args = ['--version']

    await run(args)
    expect(console.log).toHaveBeenCalledWith(`v${version}`)

    spyLog.mockReset()
    spyLog.mockRestore()
  })

  test('main', async () => {
    for (const dir of fs.readdirSync('projects')) {
      resetCache()

      const workingDir = path.join(process.cwd(), 'projects', dir)
      const { type, input, staticDir, output, trailingSlash } = await getConfig(
        dir !== 'nuxtjs-no-slash',
        workingDir
      )

      const result = fs.readFileSync(`${output}/$path.ts`, 'utf8')
      const basepath = /-basepath$/.test(dir) ? '/foo/bar' : undefined
      const { filePath, text } = build({ type, input, staticDir, output, trailingSlash, basepath })

      expect(filePath).toBe(`${output}/$path.ts`)
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
      ).toBe(result.replace(/\r/g, ''))
    }
  })
})
