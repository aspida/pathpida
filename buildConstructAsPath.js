const { build } = require('esbuild')
const path = require('path')

build({
  entryPoints: [path.resolve(__dirname, './src/constructAsPath.ts')],
  outfile: path.resolve(__dirname, './dist/outConstructAsPath.js'),
  target: 'es2020',
  keepNames: true,
  bundle: true,
  minify: true
}).catch(() => process.exit(1))
