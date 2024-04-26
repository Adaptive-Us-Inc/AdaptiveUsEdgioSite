import install from '@edgio/prefetch/window/install'
import { prefetch } from '@edgio/prefetch/window/prefetch'

document.addEventListener('DOMContentLoaded', () => {
  install({
    includeCacheMisses: true,
    watch: [
      {
        selector: 'a[href^="/"]',
        callback: (el) => {
          const href = el.getAttribute('href')
          if (href) prefetch(href)
        },
      },
      {
        selector: 'link[href^="/"]',
        callback: (el) => {
          const href = el.getAttribute('href')
          if (href) prefetch(href)
        },
      },
    ],
  })
})
