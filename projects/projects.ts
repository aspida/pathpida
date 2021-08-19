export const projects = [
  { dir: 'nextjs', output: 'out/lib' },
  { dir: 'nextjs-basepath', output: 'out/lib' },
  { dir: 'nextjs-src', output: 'src/out/lib' },
  { dir: 'nuxtjs', output: 'plugins/util' },
  { dir: 'nuxtjs-basepath', output: 'plugins/util' },
  { dir: 'nuxtjs-no-slash', output: 'plugins/util' },
  { dir: 'nuxtjs-src', output: 'client/plugins/util' },
  { dir: 'sapper', output: 'out/lib' }
].flatMap(project => [
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
])
