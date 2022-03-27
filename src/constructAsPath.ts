import { interpolateAs } from 'next/dist/shared/lib/router/router.js'
import { formatUrl } from 'next/dist/shared/lib/router/utils/format-url'
import type { ParsedUrlQuery } from 'querystring'
import type { UrlObject } from 'url'

declare let objToAsPath: (url: UrlObject) => string

const omitParmsFromQuery = (query: ParsedUrlQuery, params: string[]) => {
  const filteredQuery: ParsedUrlQuery = {}

  Object.keys(query).forEach(key => {
    if (!params.includes(key)) {
      filteredQuery[key] = query[key]
    }
  })
  return filteredQuery
}

// eslint-disable-next-line
objToAsPath = (url: UrlObject) => {
  let interpolatedAs = ''

  const { result, params } = interpolateAs(
    url.pathname ?? '',
    url.pathname ?? '',
    url.query as ParsedUrlQuery
  )

  if (result) {
    interpolatedAs = formatUrl({
      pathname: result,
      hash: url.hash,
      query:
        url.query && typeof url.query !== 'string'
          ? omitParmsFromQuery(url.query as ParsedUrlQuery, params)
          : url.query
    })
  }

  return interpolatedAs
}
