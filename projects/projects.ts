export const projects = [
  { dir: 'nextjs', output: 'out/lib' },
  { dir: 'nextjs-appdir', output: 'out/lib' },
  { dir: 'nextjs-src-appdir', output: 'src/out/lib' },
  { dir: 'nextjs-basepath', output: 'out/lib' },
  { dir: 'nextjs-custom-ext', output: 'out/lib' },
  { dir: 'nextjs-src', output: 'src/out/lib' },
  { dir: 'nextjs-stable-appdir', output: 'out/lib' }
].flatMap(
  (
    project
  ): {
    dir: string;
    output: string | undefined;
    enableStatic: boolean;
    ignorePath: string | undefined;
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
);
