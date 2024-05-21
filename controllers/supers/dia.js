const cheerio = require("cheerio");
const axios = require("axios");

function fetchDia (product){
    const URL = `https://www.dia.es/search?q=${product}`
    
    axios.get(URL, {
        headers: {
          'Content-Type': 'text/javascript',
          'Access-Control-Allow-Origin': '*',
          'accept-language': 'es',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        },
      }).then((resp)=>{
        if(resp.status===200){
            console.log ('Fetch done')
    
            const htmlDom = resp.data;
            const $ = cheerio.load(htmlDom);
         
            let result = []
            
            
            $(`div.search-product-card`).each((ind,elm)=>{
                
                const name = $('a.search-product-card__product-link',elm).text();
                const price = $('p.search-product-card__active-price',elm).text();
                const priceUd = $('p.search-product-card__price-per-unit',elm).text();
    
                result.push({'name':name,'price':price,"priceUd":priceUd});
            })
            
            console.log(result)
    
        }else console.log ('Fetch failed')
    })
}

module.exports = {fetchDia}

// fetchDia("pepsi") 






