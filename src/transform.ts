import * as cheerio from 'cheerio'
//@ts-ignore
import library from '../utils/library'
import decode from '@edgio/core/utils/decode'
import { injectBrowserScript } from '@edgio/starter';

export default function transform(response: Response, request: Request) {
    if (response.body) {
        injectBrowserScript(response);
        decode(response)
        const $ = cheerio.load(response.body)
        const l = new library($)

        
        // l.deferImages()
        // l.deferScripts()

        // Home
        if (request.path == '/') {
            // This line was added to facilitate prefetching of a specific "next page" for the demo.
            // $('body').prepend('<a href="/cbap-certification-training/"></a>');

            // $('XXXX').first().each((i, el) => {
            //     //@ts-ignore
            //     $(el).attr({ edgio: 'true', 'edgio-img': $(el).attr('src') });
            //     // l.prioritizeImage($(el));
            // })
        }

        // CBAP
        if (request.path.includes('/cbap-certification-training/')) {
            // This line was added to facilitate prefetching of a specific "next page" for the demo.
            // $('body').prepend('<a href="/ecba-certification-training/"></a>');

            // $('XXXX').first().each((i, el) => {
            //     //@ts-ignore
            //     $(el).attr({ edgio: 'true', 'edgio-img': $(el).attr('src') });
            //     // l.prioritizeImage($(el));
            // })
        }

        // ECBA
        if (request.path.includes('/ecba-certification-training/')) {
            // $('XXXX').first().each((i, el) => {
            //     //@ts-ignore
            //     $(el).attr({ edgio: 'true', 'edgio-img': $(el).attr('src') });
            //     // l.prioritizeImage($(el));
            // })
        }

        response.body = $.html()
        // .replace(/\{ display\: none\; \}/g, '{}')
            .replace(/(https?:)?\/\/www\.adaptiveus\.com(\/)?/g, '/')
            .replace(/(https?:)?\/\/7768311\.fs1\.hubspotusercontent-na1\.net\//g, '/edgio-cdn/')
            .replace(/(https?:)?\/\/7768311\.fs1\.hubspotusercontent-na1\.net/g, '/edgio-cdn')
    }
}
