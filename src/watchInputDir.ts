import chokidar from 'chokidar';

export default (input: string, callback: () => void) => {
  chokidar.watch(input, { ignoreInitial: true, ignored: /\/\$[^/]+\.ts$/ }).on('all', callback);
};
