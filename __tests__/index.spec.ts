import fs from 'fs'
import { version } from '../package.json'
import build, { resetCache } from '../src/buildTemplate'
import getConfig from '../src/getConfig'
import { run } from '../src/cli'

describe('cli test', () => {
  test('version command', () => {
    const spyLog = jest.spyOn(console, 'log').mockImplementation(x => x)
    const args = ['--version']

    run(args)
    expect(console.log).toHaveBeenCalledWith(`v${version}`)

    spyLog.mockReset()
    spyLog.mockRestore()
  })

  test('main', () => {
    fs.readdirSync('projects').forEach(dir => {
      resetCache()

      const basePath = `projects/${dir}`
      const { type, input, staticDir, output, trailingSlash } = getConfig(
        dir !== 'nuxtjs-no-slash',
        basePath
      )

      const result = fs.readFileSync(`${output}/$path.ts`, 'utf8')
      const { filePath, text } = build({ type, input, staticDir, output, trailingSlash })

      expect(filePath).toBe(`${output}/$path.ts`)
      expect(text.replace(new RegExp(`${basePath}/`, 'g'), '')).toBe(result.replace(/\r/g, ''))
    })
  })
})
