import fs from 'fs'

export default ({ filePath, text }: { text: string; filePath: string }) => {
  if (fs.existsSync(filePath) && fs.readFileSync(filePath, 'utf8') === text) return

  fs.writeFileSync(filePath, text, 'utf8')
  console.log(`${filePath} was built successfully.`)
}
