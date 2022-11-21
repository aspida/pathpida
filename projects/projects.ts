export const projects = [
  { dir: 'nextjs', output: 'out/lib', nodeVer: 14 },
  { dir: 'nextjs-appdir', output: 'out/lib', nodeVer: 16 },
  { dir: 'nextjs-basepath', output: 'out/lib', nodeVer: 14 },
  { dir: 'nextjs-custom-ext', output: 'out/lib', nodeVer: 14 },
  { dir: 'nextjs-src', output: 'src/out/lib', nodeVer: 14 },
  { dir: 'nuxtjs', output: 'plugins/util', nodeVer: 14 },
  { dir: 'nuxtjs-basepath', output: 'plugins/util', nodeVer: 14 },
  { dir: 'nuxtjs-no-slash', output: 'plugins/util', nodeVer: 14 },
  { dir: 'nuxtjs-src', output: 'client/plugins/util', nodeVer: 14 },
  { dir: 'sapper', output: 'out/lib', nodeVer: 14 }
].flatMap(
  (
    project
  ): {
    dir: string
    output: string | undefined
    enableStatic: boolean
    ignorePath: string | undefined
    nodeVer: number
  }[] => [
    { ...project, output: undefined, enableStatic: true, ignorePath: undefined },
    {
      ...project,
      output: `${project.output}/basic`,
      enableStatic: false,
      ignorePath: '.pathpidaignore'
    },
    {
      ...project,
      output: `${project.output}/static`,
      enableStatic: true,
      ignorePath: undefined
    },
    {
      ...project,
      output: `${project.output}/ignore`,
      enableStatic: true,
      ignorePath: '.pathpidaignore'
    }
  ]
)
