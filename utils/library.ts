import * as cheerio from 'cheerio'

export default class library {
    $: any
    constructor(import$: any) {
        this.$ = import$
    }

    preloadImage(src: string) {
        this.$('head').prepend(`<link rel="preload" class="l0-preload" as="image" href="${src}">`)
    }

    preloadCss(src: string) {
        this.$('head').prepend(`<link rel="preload" class="l0-preload" as="style" href="${src}">`)
    }

    preloadFont(src: string) {
        this.$('head').prepend(`<link rel="preload" class="l0-preload" as="font" href="${src}">`)
    }

    preloadScript(src: string) {
        this.$('head').prepend(`<link rel="preload" class="l0-preload" as="script" href="${src}">`)
    }
    
    preloadScripts(src: string[]) {
        src.forEach((el, i)=>{
            this.$('head').prepend(`<link rel="preload" class="l0-preload" as="script" href="${el}">`)
        })
    }

    prioritizeImage(el: any, src: string = (el.attr('src') || '').toString()) {
        el.attr({ loading: 'eager', fetchpriority: 'high' });
        if (src) {
            this.preloadImage(src);
        }
    }

    initEdgio() {
        // Those 2 scripts are added using server side transformation just for Proof of Concept purposes.
        // For production these scripts should be included in original website base code.
        this.$('head').append(`
      <script src="/edgio_main.js" defer="defer"></script>
    `)
    }

    deferImages() {
        this.$('img').attr({ loading: 'lazy', fetchpriority: 'low' });
    }

    hardDeferImages(elementsArray: any) {
        elementsArray.each((i: any, el: any) => {
            const element = this.$(el);
            if (i === 0) {
                element.attr('loading', 'eager');
            } else {
                element.attr({
                    loading: 'lazy',
                    'data-srcset': element.attr('src') || '',
                    src: '',
                    srcset: ''
                });
            }
        });

        const script = `
    [...document.querySelectorAll('[data-srcset]')].forEach((i) => {
      i.setAttribute('srcset', i.getAttribute('data-srcset'));
    });
  `;
        this.$('body').append(`<script>${script}</script>`);
    }

    deferScripts() {
        this.$('script').each((i: number, el: any) => {
            let temp = this.$(el);
            this.$(el).remove();
            this.$('body').append(temp.attr({ 'fetchpriority': 'low', defer: 'defer' }));
        })
    }

    hardDeferScripts(arrayOfStrings: string[]) {
        arrayOfStrings.forEach((scriptString) => {
            this.$(`script[src*="${scriptString}"]`).map((i: any, el: any) => {
                const src = this.$(el).attr('src')
                this.$(el).attr('delay', src).removeAttr('src')
            })
        })

        this.$('head').prepend(`<script type="text/javascript">
      const autoLoadDuration = 10; //In Seconds
      const eventList = ["keydown", "mousemove", "wheel", "touchmove", "touchstart", "touchend"];

      const autoLoadTimeout = setTimeout(runScripts, autoLoadDuration * 1000);

      eventList.forEach(event => window.addEventListener(event, triggerScripts, { passive: true }));

      function triggerScripts() {
                runScripts();
                clearTimeout(autoLoadTimeout);
                eventList.forEach(event => window.removeEventListener(event, triggerScripts, { passive: true }));
            }

      function runScripts() {
                document.querySelectorAll("script[delay]").forEach(scriptTag => {
                    scriptTag.setAttribute("src", scriptTag.getAttribute("delay"));
                });
            }
    </script>`)
    }

    optimizeCSSLoading(fast: string[], slow: string[] = []) {
        fast.forEach((fastCSS) => {
            const tempCss = this.$(`link[href*=${fastCSS}]`).attr('href') || ''
            if (typeof tempCss !== 'undefined' && tempCss.length > 0) {
                this.preloadCss(tempCss)
            }
        })
        if (slow.length === 0) {
            this.$('link[rel="stylesheet"][href*=".css"]').map((i: any, el: any) => {
                const elSrc = this.$(el).attr('href') || ''
                const isFast = fast.findIndex((element) => {
                    return elSrc.includes(element)
                })
                if (typeof elSrc !== 'undefined' && isFast == -1) {
                    this.$(el).remove()
                    this.$('head').append(
                        `<link rel="stylesheet" media="print" onload="this.media='all'" href="${elSrc}">`
                    )
                }
            })
        } else {
            slow.forEach((slowCSS) => {
                const tempCss = this.$(`link[href*=${slowCSS}]`).attr('href') || ''
                if (typeof tempCss !== 'undefined' && tempCss.length > 0) {
                    this.$(`[href*=${tempCss}]`).remove()
                    this.$('head').append(
                        `<link rel="stylesheet" media="print" onload="this.media='all'" href="${tempCss}">`
                    )
                }
            })
        }
    }

    splitCSS(fast: string, slow: string, remove: string) {
        // Remove original file
        this.$(`link[href*="${remove}"]`).remove()

        // Adds copy of removed file in 2 parts
        this.$('head').append(`<link rel="stylesheet" href="${fast}">`)
        this.$('body').append(
            `<link rel="stylesheet" media="print" onload="this.media='all'" href="${slow}">`
        )
    }
}

//Use this version if encountering issues with Google Tag Manager's anti-flickering behavior
//Remove Google Tag Manager anti-flicker scripts that causes issues on WPT
// $('script').each((i, el) => {
//   if ($(el).html()?.includes("function(a,s,y,n,c,h,i,d,e)")) {
//     $(el).remove()
//   } else {
//     let temp = $(el)
//     $(el).remove()
//     $('body').append(temp)
//   }
// })
