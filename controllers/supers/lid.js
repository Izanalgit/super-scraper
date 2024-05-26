const cheerio = require("cheerio");
const axios = require("axios");
const {loggerMS} = require('../../config/loggers');

async function fetchLid (product){

    const URL = `https://www.lidl.es/search?q=${product}`
    

    return axios.get(URL, {
        headers: {
          'Content-Type': 'text/javascript',
          'Access-Control-Allow-Origin': '*',
          'accept-language': 'es',
          'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36',
        },
      }).then((resp)=>{
        if(resp.status===200){
          loggerMS(null,'Fetch done','LID','green');
    
            const htmlDom = resp.data;
            const $ = cheerio.load(htmlDom);
         
            let result = []
            
            $(`div.space.c-10.p-r.p-b.product-grid-box-tile__wrapper.show-phone`).each(async (ind,elm)=>{
                const name = $('div.desc-height',elm).text();
                const price = $(`div.price-pill__price`,elm).text();
                const priceUd = $('small.baseprice',elm).text();

                const cleanN = name.trim();
                const cleanP = price.trim();  
                let cleanPU = priceUd.trim();
                const indx = cleanPU.search("=")+1;
                cleanPU = cleanPU.slice(indx)


                await result.push({
                      'name':cleanN,
                      'price':Number(cleanP),
                      "priceUd":Number(cleanPU)
                });
            })
            
             return result;
    
        }
    }).catch(()=>loggerMS(null,'Fetch failed','LID','red',true))


}

module.exports = {fetchLid}

// fetchLid("cereales kelloggs").then(test=>console.log(test))

// BAD REQUESTS , SEARCH BY MARKS