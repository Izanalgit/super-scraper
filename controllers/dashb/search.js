const {dbFindUser} = require ('../../config/mdb-config');
const {
    dbCreateProd,
    dbCountProds,
    dbDeleteAllProds
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
    const cod = await fetchCon(product).then(loggerFD(user.name,'COD'));
    const dia = await fetchDia(product).then(loggerFD(user.name,'DIA'));
    const elc = await fetchElc(product).then(loggerFD(user.name,'ELC'));
    const ero = await fetchEro(product).then(loggerFD(user.name,'ERO'));
    const lid = await fetchLid(product).then(loggerFD(user.name,'LID'));
    const lsi = await fetchLsi(product).then(loggerFD(user.name,'LSI'));
    //Puppetter
    const ald = await fetchAld(product).then(loggerFD(user.name,'ALD'));
    const car = await fetchCar(product).then(loggerFD(user.name,'CAR'));

    // - - - -  DB  enters - - - -
    
    //Pre-Clean DB
    await dbDeleteAllProds(userId) ;

    await cap.forEach(async produc => await dbCreateProd('Caprabo',userId,produc));
    await cod.forEach(async produc => await dbCreateProd('Condis',userId,produc));
    await dia.forEach(async produc => await dbCreateProd('Dia',userId,produc));
    await elc.forEach(async produc => await dbCreateProd('ElCorteIngles',userId,produc));
    await ero.forEach(async produc => await dbCreateProd('Eroskie',userId,produc));
    await lid.forEach(async produc => await dbCreateProd('Lidel',userId,produc));
    await lsi.forEach(async produc => await dbCreateProd('LaSirena',userId,produc));
    await ald.forEach(async produc => await dbCreateProd('Aldi',userId,produc));
    await car.forEach(async produc => await dbCreateProd('Carrefour',userId,produc));


    loggerMS ('products db',user.name + ' products','SAVED','green');
    // - - - -  Result count - - - -

    const capC = await dbCountProds('Caprabo');
    const codC = await dbCountProds('Condis');
    const diaC = await dbCountProds('Dia');
    const elcC = await dbCountProds('ElCorteIngles');
    const eroC = await dbCountProds('Eroskie');
    const lidC = await dbCountProds('Lidel');
    const lsiC = await dbCountProds('LaSirena');
    const aldC = await dbCountProds('Aldi');
    const carC = await dbCountProds('Carrefour');

    res.json({
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
