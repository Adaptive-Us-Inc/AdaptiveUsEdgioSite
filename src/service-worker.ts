import { skipWaiting, clientsClaim } from 'workbox-core'
import { Prefetcher, prefetch } from '@edgio/prefetch/sw'
import DeepFetchPlugin from '@edgio/prefetch/sw/DeepFetchPlugin'

skipWaiting()
clientsClaim()

new Prefetcher({
  plugins: [
    new DeepFetchPlugin([
      {
        as: 'style',
        maxMatches: 10,
        attribute: 'href',
        selector: 'link[rel="stylesheet"]',
        callback: ({ $el }) => {
          const href = $el.attr('href')
          if (href) prefetch(href)
        },
      },
      {
        as: 'script',
        maxMatches: 5,
        attribute: 'href',
        selector: 'link.l0-preload[as="script"]',
        callback: ({ $el }) => {
          const href = $el.attr('href')
          if (href) prefetch(href)
        },
      },
      {
        as: 'script',
        maxMatches: 25,
        attribute: 'src',
        selector: 'script[src]',
        callback: ({ $el }) => {
          const src = $el.attr('src')
          if (src) prefetch(src)
        },
      },
      {
        as: 'image',
        maxMatches: 5,
        attribute: 'edgio-img',
        selector: '[edgio-img]',
        callback: ({ $el }) => {
          const src = $el.attr('edgio-img')
          if (src) prefetch(src)
        },
      },
      // {
      //   selector: '[edgio-api]',
      //   maxMatches: 2,
      //   attribute: 'edgio-api',
      //   as: 'fetch',
      //   callback: ({ $el }) => {
      //     const postReq = $el.attr('edgio-api')
      //     prefetch(postReq)
      //   },
      // },
    ]),
  ],
}).route()
