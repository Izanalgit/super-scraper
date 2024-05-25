const puppeteer = require('puppeteer');

async function fetchAld (product){

    const browser = await puppeteer.launch({
            headless : true, // [false] shows navigator
            slowMo : 200 // [X] ms betwen acctions (nice for see logs)
    });
    const page = await browser.newPage();   
    await page.goto(`https://www.aldi.es/busqueda.html?query=${product}`);

    console.log ('Fetch done : ALD : BROWSER OPEN');

    await new Promise (r => setTimeout(r,5000)); // Take 5000 millisecons chilling

    const result = await page.evaluate(()=>{
            const prodArry = []
            const products = document.querySelectorAll('.mod-article-tile.mod-article-tile--default')

            for(product of products ){
                const name = product.querySelector('.mod-article-tile__title-wrapper').innerText;
                const price = product.querySelector('.price__label').innerText;
                const priceU = product.querySelector('.price__base').innerText;

                const cleanP = price.slice(0,price.length-1)
                        .replace(',','.')
                        .trim();
                const indx = priceU.search("=")+1;
                const cleanPU = priceU.slice(indx);  
            
                prodArry.push({
                      'name':name,
                      'price':Number(cleanP),
                      'priceUd':Number(cleanPU)
                });
            }

            return prodArry
    })

    console.log ('Fetch done : ALD : SCRAP');

    await browser.close();
    console.log ('Fetch done : ALD : BROWSER CLOSE');

    return result;
};

module.exports = {fetchAld}

// fetchAld("aceite").then(test=>console.log(test))