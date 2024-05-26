const cheerio = require("cheerio");
const axios = require("axios");
const {loggerMS} = require('../../config/loggers');

async function fetchEro (product){

    const URL = `https://supermercado.eroski.es/es/search/results/?q=${product}&suggestionsFilter=false`
    
    return axios.get(URL, {
        headers: {
          'Content-Type': 'text/javascript',
          'Access-Control-Allow-Origin': '*',
          'accept-language': 'es',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        },
      }).then((resp)=>{
        if(resp.status===200){
          loggerMS(null,'Fetch done','ERO','green');
    
            const htmlDom = resp.data;
            const $ = cheerio.load(htmlDom);
         
            let result = []
            $('div.col.border-0.product-item-lineal.item-type-1.col-xs-12.col-sm-12.col-md-6.col-lg-4').each(async (ind,elm)=>{

                const name = $('h2.product-title.product-title-resp',elm).text();
                const price = $(`span.price-offer-now`,elm).text();
                const priceUd = $('span.price-product',elm).text();

                const cleanN = name.slice(1,name.length-1);
                const cleanP = price.trim().replace(',','.');
                const cleanPU = price.replace(',','.')
                        .slice(0,priceUd.length-1);

                await result.push({
                        'name':cleanN,
                        'price':Number(cleanP),
                        "priceUd":Number(cleanPU)});
            })
            
             return result;
    
        }
    }).catch(()=>loggerMS(null,'Fetch failed','ERO','red',true))

}

module.exports = {fetchEro}

// fetchEro("nestea").then(test=>console.log(test))