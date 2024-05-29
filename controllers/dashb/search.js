const {dbFindUser} = require ('../../config/mdb-config');
const {
    dbCreateProd,
    dbCountProds,
    dbDeleteProds
} = require('../../config/mdb-s-config');

const {
    loggerFD,
    loggerMS
} = require('../../config/loggers');

const {fetchCap} = require('../supers/cap');
const {fetchCon} = require('../supers/cod');
const {fetchDia} = require('../supers/dia');
const {fetchElc} = require('../supers/elc');
const {fetchEro} = require('../supers/ero');
const {fetchLid} = require('../supers/lid');
const {fetchLsi} = require('../supers/lsi');
const {fetchAld} = require('../supers/ald');
const {fetchCar} = require('../supers/car');

module.exports = async(req,res) => {

    const {product} = req.body;
    req.session.search = product;

    if(!product) {
        return res
            .status(400)
            .send({message:'Product must be selected'});
    }
    
    const userId = req.user;
    const user = await dbFindUser(userId);


    // - - - -  Scraps logics - - - - 

    // Cheerio 
    const cap = await fetchCap(product).then(loggerFD(user.name,'CAP'));
    // const cod = await fetchCon(product).then(loggerFD(user.name,'COD'));
    const dia = await fetchDia(product).then(loggerFD(user.name,'DIA'));
    // const elc = await fetchElc(product).then(loggerFD(user.name,'ELC'));
    const ero = await fetchEro(product).then(loggerFD(user.name,'ERO'));
    const lid = await fetchLid(product).then(loggerFD(user.name,'LID'));
    const lsi = await fetchLsi(product).then(loggerFD(user.name,'LSI'));
    //Puppetter
    // const ald = await fetchAld(product).then(loggerFD(user.name,'ALD'));
    // const car = await fetchCar(product).then(loggerFD(user.name,'CAR'));

    // - - - -  DB  enters - - - -
    
    //Pre-Clean DB
    await dbDeleteProds(userId)
        .catch(()=>{
            return res
                .status(500)
                .json({message:'Error cleanning previous search'})
        }) ;

    await cap.forEach(async produc => await dbCreateProd('Caprabo',userId,produc,product));
    // await cod.forEach(async produc => await dbCreateProd('Condis',userId,produc,product));
    await dia.forEach(async produc => await dbCreateProd('Dia',userId,produc,product));
    // await elc.forEach(async produc => await dbCreateProd('ElCorteIngles',userId,produc,product));
    await ero.forEach(async produc => await dbCreateProd('Eroskie',userId,produc,product));
    await lid.forEach(async produc => await dbCreateProd('Lidel',userId,produc,product));
    await lsi.forEach(async produc => await dbCreateProd('LaSirena',userId,produc,product));
    // await ald.forEach(async produc => await dbCreateProd('Aldi',userId,produc,product));
    // await car.forEach(async produc => await dbCreateProd('Carrefour',userId,produc,product));


    loggerMS ('products db',user.name + ' products','SAVED','green');

    // - - - -  Result count - - - -

    const capC = await dbCountProds('Caprabo',product,userId);
    const codC = await dbCountProds('Condis',product,userId);
    const diaC = await dbCountProds('Dia',product,userId);
    const elcC = await dbCountProds('ElCorteIngles',product,userId);
    const eroC = await dbCountProds('Eroskie',product,userId);
    const lidC = await dbCountProds('Lidel',product,userId);
    const lsiC = await dbCountProds('LaSirena',product,userId);
    const aldC = await dbCountProds('Aldi',product,userId);
    const carC = await dbCountProds('Carrefour',product,userId);

    res
        .status(201)
        .json({
            'Caprabo':capC,
            'Condis':codC,
            'Dia':diaC,
            'ElCorteIngles':elcC,
            'Eroskie':eroC,
            'Lidel':lidC,
            'LaSirena':lsiC,
            'Aldi':aldC,
            'Carrefour':carC
        })

}
