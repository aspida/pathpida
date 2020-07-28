import fs from 'fs'
import { version } from '../package.json'
import build from '../src/buildTemplate'
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
    const { input, output, baseURL, trailingSlash } = getConfig()[0]

    const result = fs.readFileSync('$path.ts', 'utf8')
    const { filePath, text } = build({ input, output, baseURL, trailingSlash })

    expect(filePath).toBe('$path.ts')
    expect(text).toBe(result.replace(/\r/g, ''))
  })
})
