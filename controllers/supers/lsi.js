const cheerio = require("cheerio");
const axios = require("axios");

async function fetchLsi (product){

    const URL = `https://www.lasirena.es/es/buscar?search_query=${product}`
    

    return axios.get(URL).then((resp)=>{
        if(resp.status===200){
            console.log ('Fetch done : LSI');
    
            const htmlDom = resp.data;
            const $ = cheerio.load(htmlDom);
         
            let result = []

            $(`div.product-container.product_div_item`).each(async (ind,elm)=>{
                const name = $('a.product-name',elm).attr('title');
                const price = $(`span.price.product-price `,elm).text();
                const priceUd = $('div.productPer',elm).text();

                const indx = price.search('€');
                let cleanP = price.replace(',','.');
                cleanP = cleanP.slice(0,indx - 1).trim();

                await result.push({
                        'name':name,
                        'price':Number(cleanP),
                        "priceUd":priceUd
                });
            })
            
            return result;
    
        }else console.log ('Fetch failed')
    })


}

module.exports = {fetchLsi}

// fetchLsi("salmon").then(test=>console.log(test))