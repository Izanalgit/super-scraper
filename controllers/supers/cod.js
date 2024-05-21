const cheerio = require("cheerio");
const axios = require("axios");

function fetchCon (product){

    const URL = `https://www.condisline.com/searching?term=${product}&source=directSearch&originSearch=search_box`
    

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
            
            $(`article.article_container`).each((ind,elm)=>{
                const name = $('span#description_text',elm).text();
                const price = $(`div.article_price_container`,elm).text();
                const priceUd = $('div.article_pum',elm).text();

                const indx1 = price.search("formatNumber"); 
                const indx2 = price.search("list");
                const cleanP = price.slice(indx1+14,indx2-4) + '€'; 
                const cleanPU = priceUd.trim().slice(0,priceUd.length-1);


                result.push({'name':name,'price':cleanP,"priceUd":cleanPU});
            })
            
            console.log(result)
    
        }else console.log ('Fetch failed')
    })


}

module.exports = {fetchCon}

fetchCon("cocacola");