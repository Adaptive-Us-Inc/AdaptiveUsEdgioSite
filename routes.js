import { Router } from '@edgio/core'
import transform from './src/transform'
import { starterRoutes } from '@edgio/starter';


export default new Router()

  //General rule for caching
  .match('/:path*', {
    caching: {
      max_age: '1h',
      ignore_origin_no_cache: [200],
      stale_while_revalidate: '1d',
      bypass_client_cache: true,
      service_worker_max_age: '1h',
    },
    headers: {
      set_response_headers: {
        'x-sw-cache-control': 'max-age=3600',
      },
      remove_origin_response_headers: ['set-cookie', 'cache-control', 'content-security-policy', 'content-security-policy-report-only', 'strict-transport-security', 'pragma'],
    },
    origin: {
      set_origin: 'origin',
    },
  })

  //CDN route
  .match('/edgio-cdn/:path*', {
    caching: {
      max_age: '1d',
      ignore_origin_no_cache: [200],
      stale_while_revalidate: '1d',
      bypass_client_cache: true,
      service_worker_max_age: '1d',
    },
    origin: {
      set_origin: 'cdn',
    },
    url: {
      url_rewrite: [
        {
          source: '/edgio-cdn/:path*:optionalSlash(\\/?)?:optionalQuery(\\?.*)?',
          syntax: 'path-to-regexp',
          destination: '/:path*:optionalSlash(\\/?)?:optionalQuery(\\?.*)?',
        },
      ],
    },
  })

  //Home
  // .match('/', ({ proxy }) => {
  //   proxy('origin', { transformResponse: transform })
  // })

  //CBAP
  // .match('/cbap-certification-training/', ({ proxy }) => {
  //   proxy('origin', { transformResponse: transform })
  // })

  //ECBA
  // .match('/ecba-certification-training/', ({ proxy }) => {
  //   proxy('origin', { transformResponse: transform })
  // })

  // plugin enabling basic Edgio functionality
  .use(starterRoutes)
