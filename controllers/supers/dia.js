const cheerio = require("cheerio");
const axios = require("axios");
const {loggerMS} = require('../../config/loggers');

async function fetchDia (product){
    const URL = `https://www.dia.es/search?q=${product}`
    
    return axios.get(URL, {
        headers: {
          'Content-Type': 'text/javascript',
          'Access-Control-Allow-Origin': '*',
          'accept-language': 'es',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        },
      }).then((resp)=>{
        if(resp.status===200){
          loggerMS(null,'Fetch done','DIA','green');
    
            const htmlDom = resp.data;
            const $ = cheerio.load(htmlDom);
         
            let result = []
            
            $(`div.search-product-card`).each(async (ind,elm)=>{
                
                const name = $('a.search-product-card__product-link',elm).text();
                const price = $('p.search-product-card__active-price',elm).text();
                const priceUd = $('p.search-product-card__price-per-unit',elm).text();

                let cleanP = price.trim().replace(',','.');
                cleanP = cleanP.slice(0,cleanP.length - 2);
                let cleanPU = priceUd.trim().replace(',','.');
                cleanPU = cleanPU.slice(1,cleanPU.length - 9);
                
    
                await result.push({
                      'name':name,
                      'price':Number(cleanP),
                      "priceUd":Number(cleanPU)
                });
            })
            
             return result;
    
        }
    }).catch(()=>loggerMS(null,'Fetch failed','DIA','red',true))
}

module.exports = {fetchDia}

// fetchDia("nestea").then(test=>console.log(test))






