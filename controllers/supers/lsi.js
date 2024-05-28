const cheerio = require("cheerio");
const axios = require("axios");
const {loggerMS} = require('../../config/loggers');

async function fetchLsi (product){

    const URL = `https://www.lasirena.es/es/buscar?search_query=${product}`
    

    return axios.get(URL).then((resp)=>{
        if(resp.status===200){
            loggerMS(null,'Fetch done','LSI','green');
    
            const htmlDom = resp.data;
            const $ = cheerio.load(htmlDom);
         
            let result = []

            $(`div.product-container.product_div_item`).each(async (ind,elm)=>{
                const name = $('a.product-name',elm).attr('title');
                const price = $(`span.price.product-price `,elm).text();
                const unit = $('div.productPer',elm).text();

                const indx = price.search('€');
                let cleanP = price.replace(',','.');
                cleanP = cleanP.slice(0,indx - 1).trim();

                await result.push({
                        'name':name,
                        'price':Number(cleanP),
                        "unit":unit
                });
            })
            
            return result;
    
        }
    }).catch(()=>loggerMS(null,'Fetch failed','LSI','red',true))


}

module.exports = {fetchLsi}

// fetchLsi("salmon").then(test=>console.log(test))

// Have the unit / price comparsion in a too much complex string, so we have the "unit" string