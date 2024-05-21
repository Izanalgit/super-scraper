const cheerio = require("cheerio");
const axios = require("axios");

function fetchCap (product){

    const URL = `https://www.capraboacasa.com/es/search/results/?q=${product}&suggestionsFilter=false`
    

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
            
            $(`div.product-description`).each((ind,elm)=>{

                const name = $('h2.product-title.product-title-resp',elm).text();
                const price = $('span.price-offer-now',elm).text();
                const priceUd = $('span.price-product',elm).text();

                const cleanN = name.slice(1,name.length-1);
                const cleanP = price + ' €';

                result.push({'name':cleanN,'price':price,"priceUd":priceUd});
            })
            
            console.log(result)
    
        }else console.log ('Fetch failed')
    })


}

module.exports = {fetchCap}

// fetchCap("nestea");


