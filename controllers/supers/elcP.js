const puppeteer = require('puppeteer');
const {loggerMS} = require('../../config/loggers');

async function fetchElcP (product){

    let fail = false;
    let result;
    
    //Init Browser
    const browser = await puppeteer.launch({
            headless : false, // [false] shows navigator
            slowMo : 200, // [X] ms betwen acctions (nice for see logs)
            args: [`--no-sandbox`, `--disable-gpu`, `--disable-dev-shm-usage`],
    }).then(br=>br).catch(err=>console.error(err));

    //Opem Broser
    const page = await browser.newPage()
    .then((page)=>{
        loggerMS(null,'Fetch done : ELC','BROWSER OPEN','green');
        return page;
    }).catch(()=>{
        loggerMS(null,'Fetch failed : ELC','BROWSER OPEN','red',true);
        fail = true;
    });

    if(fail) return result; //Check open browser fail

    //Redirect Browser   
    await page.goto(`https://www.elcorteingles.es/supermercado/buscar/?term=${product}&search=text`)
    .then(async ()=>{
        loggerMS(null,'Fetch done : ELC','BROWSER REDIRECT','green');
        await new Promise (r => setTimeout(r,4000)); // Take 4000 millisecons chilling
    }).catch(()=>{
        loggerMS(null,'Fetch failed : ELC','BROWSER REDIRECT','red',true);
        fail =true
    });

    //Scrap Browser
    if(!fail){ //Check open redirect fail
    result = await page.evaluate(async ()=>{

        const prodArry = []
        const products = document.querySelectorAll('.grid-item.product_tile._retro._supermarket.dataholder.js-product.-has_offer')

        for(product of products ){
            const name = product.querySelector('.link.event.js-product-link').innerText;
            let price = product.querySelectorAll('.prices-price._current')
            if(!price[0])price = product.querySelectorAll('.prices-price._offer');
            const priceU = product.querySelector('.prices-price._pum').innerText;


            let cleanP = price[0].innerText.trim().replace(',','.');
            cleanP = cleanP.slice(0,cleanP.length - 2);
            let cleanPU = priceU.trim().replace(',','.');
            cleanPU = cleanPU.slice(1,cleanPU.length - 11);

            

            prodArry.push({
                    'name':name,
                    'price':Number(cleanP),
                    "priceUd":Number(cleanPU)
            });
        }
        return prodArry
    }).then((prodArry,)=>{
        loggerMS(null,'Fetch done : ELC','SCRAP','green');
        return prodArry;
    })
    .catch((err)=>loggerMS(null,'Fetch failed : ELC',err,'red',true));
    }

    // Close Browser
    await browser.close()
        .then(()=>loggerMS(null,'Fetch done : ELC','BROWSER CLOSE','green'))
        .catch(()=>loggerMS(null,'Fetch failed : ELC','BROWSER CLOSE','red',true));
    
    return result;
};

module.exports = {fetchElcP}

// fetchElcP("fanta").then(test=>console.log(test))