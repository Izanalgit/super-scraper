const puppeteer = require('puppeteer');
const {loggerMS} = require('../../config/loggers');

async function fetchAld (product){

    let fail = false;
    let result;

    //Init Browser
    const browser = await puppeteer.launch({
            headless : true, // [false] shows navigator
            slowMo : 200 // [X] ms betwen acctions (nice for see logs)
    });

    //Open Broser
    const page = await browser.newPage()
    .then((page)=>{
        loggerMS(null,'Fetch done : ALD','BROWSER OPEN','green');
        return page;
    }).catch(()=>{
        loggerMS(null,'Fetch failed : ALD','BROWSER OPEN','red',true);
        fail = true;
    });   

    if(fail) return result; //Check open browser fail

    //Redirect Browser
    await page.goto(`https://www.aldi.es/busqueda.html?query=${product}`)
        .then(async ()=>{
            loggerMS(null,'Fetch done : ALD','BROWSER REDIRECT','green');
            await new Promise (r => setTimeout(r,5000)); // Take 5000 millisecons chilling
        }).catch(()=>{
            loggerMS(null,'Fetch failed : ALD','BROWSER REDIRECT','red',true);
            fail = true;
        });

    //Scrap Browser
    if(!fail){ //Check open redirect fail
    result = await page.evaluate(()=>{

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
    }).then((prodArry)=>{
        loggerMS(null,'Fetch done : ALD','SCRAP','green');
        return prodArry;
    })
    .catch(()=>loggerMS(null,'Fetch failed : ALD','SCRAP','red',true));
    }

    //Close Browser
    await browser.close()
        .then(()=>loggerMS(null,'Fetch done : ALD','BROWSER CLOSE','green'))
        .catch(()=>loggerMS(null,'Fetch failed : ALD','BROWSER CLOSE','red',true));

    return result;
};

module.exports = {fetchAld}

// fetchAld("aceite").then(test=>console.log(test))