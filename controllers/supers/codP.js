const puppeteer = require('puppeteer');
const {loggerMS} = require('../../config/loggers');

async function fetchCodP (product){

    let fail = false;
    let result;
    
    //Init Browser
    const browser = await puppeteer.launch({
            headless : true, // [false] shows navigator
            slowMo : 200, // [X] ms betwen acctions (nice for see logs)
            args: [`--no-sandbox`, `--headless`, `--disable-gpu`, `--disable-dev-shm-usage`],
    }).then(br=>br).catch(err=>console.error(err));

    //Opem Broser
    const page = await browser.newPage()
    .then((page)=>{
        loggerMS(null,'Fetch done : COD','BROWSER OPEN','green');
        return page;
    }).catch(()=>{
        loggerMS(null,'Fetch failed : COD','BROWSER OPEN','red',true);
        fail = true;
    });

    if(fail) return result; //Check open browser fail

    //Redirect Browser   
    await page.goto(`https://www.condisline.com/searching?term=${product}&source=directSearch&originSearch=search_box`)
    .then(async ()=>{
        loggerMS(null,'Fetch done : COD','BROWSER REDIRECT','green');
        await new Promise (r => setTimeout(r,4000)); // Take 4000 millisecons chilling
    }).catch(()=>{
        loggerMS(null,'Fetch failed : COD','BROWSER REDIRECT','red',true);
        fail =true
    });

    //Scrap Browser
    if(!fail){ //Check open redirect fail
    result = await page.evaluate(()=>{

        const prodArry = []
        const products = document.querySelectorAll('.article_container')

        for(product of products ){
            const name = product.querySelector('#description_text').innerText;
            const price = product.querySelector('.article_price span').innerText;
            const priceUd = product.querySelector('.article_pum').innerText;

            const cleanP = price.replace(',','.');
            const cleanPU = priceUd.trim()
                    .slice(0,priceUd.trim().length-7)
                    .replace(',','.');

            prodArry.push({
                  'name':name,
                  'price':Number(cleanP),
                  "priceUd":Number(cleanPU)
            });
        }
        return prodArry
    }).then((prodArry)=>{
        loggerMS(null,'Fetch done : COD','SCRAP','green');
        return prodArry;
    })
    .catch(()=>loggerMS(null,'Fetch failed : COD','SCRAP','red',true));
    }

    //Close Browser
    await browser.close()
        .then(()=>loggerMS(null,'Fetch done : COD','BROWSER CLOSE','green'))
        .catch(()=>loggerMS(null,'Fetch failed : COD','BROWSER CLOSE','red',true));
    
    return result;
};

module.exports = {fetchCodP}

// fetchCodP("fanta").then(test=>console.log(test))