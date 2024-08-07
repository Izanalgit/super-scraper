const cheerio = require("cheerio");
const axios = require("axios");
const {loggerMS} = require('../../config/loggers');

async function fetchElc (product){

    const URL = `https://www.elcorteingles.es/supermercado/buscar/?term=${product}&search=text`
    

    return axios.get(URL, {
        headers: {
          'Content-Type': 'text/javascript',
          'Access-Control-Allow-Origin': '*',
          'accept-language': 'es',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        },
      }).then((resp)=>{
        if(resp.status===200){
          loggerMS(null,'Fetch done','ELC','green');
    
            const htmlDom = resp.data;
            const $ = cheerio.load(htmlDom);
         
            let result = []
            
            $(`div.grid-item.product_tile._retro._supermarket.dataholder.js-product`).each(async (ind,elm)=>{
                const name = $('a.link.event.js-product-link',elm).text();
                const price = $(`div.prices-price._current`,elm).text() 
                         || $(`div.prices-price._offer`,elm).text();
                const priceUd = $('div.prices-price._pum',elm).text();

                let cleanP = price.trim().replace(',','.');
                cleanP = cleanP.slice(0,cleanP.length - 2);
                let cleanPU = priceUd.trim().replace(',','.');
                cleanPU = cleanPU.slice(1,cleanPU.length - 11);

                await result.push({
                        'name':name,
                        'price':Number(cleanP),
                        "priceUd":Number(cleanPU)
                });
            })
            
            return result;
    
        }else{
          const errMsg =`Status : ${resp.status} - ${resp.statusText}`;
          console.error('ERROR :',errMsg);
          return null
        }
    }).catch((err)=>{
        loggerMS(null,'Fetch failed','ELC','red',true)
        if(err)console.error(err);
    })


}

module.exports = {fetchElc}

// fetchElc("nestea").then(test=>console.log(test))