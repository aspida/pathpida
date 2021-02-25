export const replaceWithUnderscore = (name: string) =>
  name.replace(/(-|\.|!| |'|\*|\(|\))/g, '_').replace(/^(\d)/, '$$$1')
