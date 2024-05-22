const puppeteer = require('puppeteer');

async function fetchCar (product){

    const browser = await puppeteer.launch({
            headless : true, // [false] shows navigator
            slowMo : 200 // [X] ms betwen acctions (nice for see logs)
    });
    const page = await browser.newPage();   
    await page.goto(`https://www.carrefour.es/supermercado?q=${product}`);

    console.log ('Fetch done : CAR : BROWSER OPEN');

    await new Promise (r => setTimeout(r,4000)); // Take 4000 millisecons chilling

    const result = await page.evaluate(()=>{
            const prodArry = []
            const products = document.querySelectorAll('.ebx-result__wrapper')

            for(product of products ){
                const name = product.querySelector('.ebx-result-title.ebx-result__title').innerText;
                const price = product.querySelector('.ebx-result-price__value').innerText;
                const priceU = product.querySelector('.ebx-result__quantity.ebx-result-quantity').innerText;

                const cleanP = price.replace(',','.')
                    .slice(0,price.length-2);  
                    const cleanPU = priceU.replace(',','.')
                    .slice(0,priceU.length-5); 
            
                prodArry.push({
                      'name':name,
                      'price':Number(cleanP),
                      'priceUd':Number(cleanPU)
                });
            }

            return prodArry
    })

    console.log ('Fetch done : CAR : SCRAP');

    await browser.close();
    console.log ('Fetch done : CAR : BROWSER CLOSE');

    return result;
};

module.exports = {fetchCar}

// fetchCar("cocacola").then(test=>console.log(test))