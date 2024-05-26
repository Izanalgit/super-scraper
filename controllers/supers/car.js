const puppeteer = require('puppeteer');
const {loggerMS} = require('../../config/loggers');

async function fetchCar (product){

    let fail = false;
    let result;
    
    //Init Browser
    const browser = await puppeteer.launch({
            headless : true, // [false] shows navigator
            slowMo : 200 // [X] ms betwen acctions (nice for see logs)
    });

    //Opem Broser
    const page = await browser.newPage()
    .then((page)=>{
        loggerMS(null,'Fetch done : CAR','BROWSER OPEN','green');
        return page;
    }).catch(()=>{
        loggerMS(null,'Fetch failed : CAR','BROWSER OPEN','red',true);
        fail = true;
    });

    if(fail) return result; //Check open browser fail

    //Redirect Browser   
    await page.goto(`https://www.carrefour.es/supermercado?q=${product}`)
    .then(async ()=>{
        loggerMS(null,'Fetch done : CAR','BROWSER REDIRECT','green');
        await new Promise (r => setTimeout(r,4000)); // Take 4000 millisecons chilling
    }).catch(()=>{
        loggerMS(null,'Fetch failed : CAR','BROWSER REDIRECT','red',true);
        fail =true
    });

    //Scrap Browser
    if(!fail){ //Check open redirect fail
    result = await page.evaluate(()=>{

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
    }).then((prodArry)=>{
        loggerMS(null,'Fetch done : CAR','SCRAP','green');
        return prodArry;
    })
    .catch(()=>loggerMS(null,'Fetch failed : CAR','SCRAP','red',true));
    }

    //Close Browser
    await browser.close()
        .then(()=>loggerMS(null,'Fetch done : CAR','BROWSER CLOSE','green'))
        .catch(()=>loggerMS(null,'Fetch failed : CAR','BROWSER CLOSE','red',true));
    
    return result;
};

module.exports = {fetchCar}

// fetchCar("fanta").then(test=>console.log(test))