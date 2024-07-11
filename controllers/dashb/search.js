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
// const {fetchCon} = require('../supers/cod'); //Dont work on deploy , refused conection from super?
const {fetchDia} = require('../supers/dia');
// const {fetchElc} = require('../supers/elc'); //Dont work on deploy , refused conection from super?
const {fetchEro} = require('../supers/ero');
const {fetchLid} = require('../supers/lid');
const {fetchLsi} = require('../supers/lsi');
const {fetchAld} = require('../supers/ald');
const {fetchCar} = require('../supers/car');
const {fetchCodP} = require('../supers/codP');  //Fix probe
const {fetchElcP} = require('../supers/elcP');  //Fix probe


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

    const capP = fetchCap(product);
    const diaP = fetchDia(product);
    const eroP = fetchEro(product);
    const lidP = fetchLid(product);
    const lsiP = fetchLsi(product);
    const aldP = fetchAld(product);
    const carP = fetchCar(product);
    const codP = fetchCodP(product);
    const elcP = fetchElcP(product);

    let cap,dia,ero,lid,lsi,ald,car,cod,elc;

    await Promise.all([capP,diaP,eroP,lidP,lsiP,aldP,carP,codP,elcP])
        .then(result => {
            loggerFD(user.name,'ALL SUPERS');

            cap = result[0];
            dia = result[1];
            ero = result[2];
            lid = result[3];
            lsi = result[4];
            ald = result[5];
            car = result[6];
            cod = result[7];
            elc = result[8];

        }); //Do NOT change the results order.

    // - - - -  DB  enters - - - -
    
    //Pre-Clean DB
    await dbDeleteProds(userId)
        .catch(()=>{
            return res
                .status(500)
                .json({message:'Error cleanning previous search'})
        }) ;

    if (cap) await cap.forEach(async produc => await dbCreateProd('Caprabo',userId,produc,product));
    if (cod) await cod.forEach(async produc => await dbCreateProd('Condis',userId,produc,product));
    if (dia) await dia.forEach(async produc => await dbCreateProd('Dia',userId,produc,product));
    if (elc) await elc.forEach(async produc => await dbCreateProd('ElCorteIngles',userId,produc,product));
    if (ero) await ero.forEach(async produc => await dbCreateProd('Eroskie',userId,produc,product));
    if (lid) await lid.forEach(async produc => await dbCreateProd('Lidel',userId,produc,product));
    if (lsi) await lsi.forEach(async produc => await dbCreateProd('LaSirena',userId,produc,product));
    if (ald) await ald.forEach(async produc => await dbCreateProd('Aldi',userId,produc,product));
    if (car) await car.forEach(async produc => await dbCreateProd('Carrefour',userId,produc,product));


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
            'counterToken':req.counterToken,
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
