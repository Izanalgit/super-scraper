const {dbFindUser} = require ('../../config/mdb-config');
const {loggerFD} = require('../../config/loggers');

module.exports = async(req,res) => {

    const {product} = req.body;

    if(!product) {
        return res
            .status(400)
            .send({message:'Product must be selected'});
    }
    
    const userId = req.user;
    const user = await dbFindUser(userId);


    const {fetchCap} = require('../supers/cap');
    const {fetchCon} = require('../supers/cod');
    const {fetchDia} = require('../supers/dia');
    const {fetchElc} = require('../supers/elc');
    const {fetchEro} = require('../supers/ero');
    const {fetchLid} = require('../supers/lid');
    const {fetchLsi} = require('../supers/lsi');
    const {fetchAld} = require('../supers/ald');
    const {fetchCar} = require('../supers/car');

    //Cheerio 
    // const cap = await fetchCap(product).then(loggerFD(user.name,'CAP'));
    // const cod = await fetchCon(product).then(loggerFD(user.name,'COD'));
    // const dia = await fetchDia(product).then(loggerFD(user,'DIA'));
    // const elc = await fetchElc(product).then(loggerFD(user,'ELC'));
    // const ero = await fetchEro(product).then(loggerFD(user,'ERO'));
    // const lid = await fetchLid(product).then(loggerFD(user,'LID'));
    // const lsi = await fetchLsi(product).then(loggerFD(user,'LSI'));
    // //Puppetter
    // const ald = await fetchAld(product).then(loggerFD(user,'ALD'));
    // const car = await fetchCar(product).then(loggerFD(user,'CAR'));

    res.json({
        // 'Caprabo':cap,
        // 'Condis':cod,
        // 'Dia':dia,
        // 'ElCorteIngles':elc,
        // 'Eroskie':ero,
        // 'Lidel':lid,
        // 'LaSirena':lsi,
        // 'Aldi':ald,
        // 'Carrefour':car
        'probe':'dev tests'
    })

}
