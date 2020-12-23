/* eslint-disable */
import { Query as Query0 } from '../pages'
import { OptionalQuery as OptionalQuery1 } from '../pages/[pid]'
import { Query as Query2 } from '../pages/blog/[...slag]'

export const pagesPath = {
  _pid: (pid: number | string) => ({
    $path: (query?: OptionalQuery1) => ({ pathname: '/[pid]', query: { pid, ...query } })
  }),
  blog: {
    _slag: (slag: number | string) => ({
      $path: (query: Query2) => ({ pathname: '/blog/[...slag]', query: { slag, ...query } })
    })
  },
  $path: (query: Query0) => ({ pathname: '/', query })
}

export type PagesPath = typeof pagesPath
