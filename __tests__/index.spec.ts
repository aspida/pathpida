import fs from 'fs'
import build from '../src/buildTemplate'
import getConfig from '../src/getConfig'

describe('cli test', () => {
  test('main', () => {
    const { input, output, baseURL, trailingSlash } = getConfig()[0]

    const result = fs.readFileSync('$path.ts', 'utf8')
    const { filePath, text } = build({ input, output, baseURL, trailingSlash })

    expect(filePath).toBe('$path.ts')
    expect(text).toBe(result.includes('\r') ? result.replace(/\r/g, '') : result)
  })
})
