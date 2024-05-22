const cheerio = require("cheerio");
const axios = require("axios");

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
            console.log ('Fetch done : ELC');
    
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
                let cleanPU = price.trim().replace(',','.');
                cleanPU = cleanPU.slice(0,cleanPU.length - 2);

                await result.push({
                        'name':name,
                        'price':Number(cleanP),
                        "priceUd":Number(cleanPU)
                });
            })
            
            return result;
    
        }else console.log ('Fetch failed')
    })


}

module.exports = {fetchElc}

// fetchElc("nestea").then(test=>console.log(test))