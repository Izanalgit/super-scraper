const {dbFindUser} = require ('../../config/mdb-config');
const {
    dbSortProdSN,
    dbSortCheep,
} = require('../../config/mdb-s-config');

module.exports = async (req,res) =>{
    const userId = req.user;
    const user = await dbFindUser(userId);
    const product = req.session.search || req.body.product;


    //Sorts
    const capCmp = await dbSortProdSN(user,'Caprabo',product);
    const codCmp = await dbSortProdSN(user,'Condis',product);
    const diaCmp = await dbSortProdSN(user,'Dia',product);
    const elcCmp = await dbSortProdSN(user,'ElCorteIngles',product);
    const eroCmp = await dbSortProdSN(user,'Eroskie',product);
    const lidCmp = await dbSortProdSN(user,'Lidel',product);
    const lsiCmp = await dbSortProdSN(user,'LaSirena',product);
    const aldCmp = await dbSortProdSN(user,'Aldi',product);
    const carCmp = await dbSortProdSN(user,'Carrefour',product);

    //Cheepers
    const capCS = await dbSortProdSN(user,'Caprabo',product,1);
    const codCS = await dbSortProdSN(user,'Condis',product,1);
    const diaCS = await dbSortProdSN(user,'Dia',product,1);
    const elcCS = await dbSortProdSN(user,'ElCorteIngles',product,1);
    const eroCS = await dbSortProdSN(user,'Eroskie',product,1);
    const lidCS = await dbSortProdSN(user,'Lidel',product,1);
    const lsiCS = await dbSortProdSN(user,'LaSirena',product,1);
    const aldCS = await dbSortProdSN(user,'Aldi',product,1);
    const carCS = await dbSortProdSN(user,'Carrefour',product,1);

    //Chepest
    const cheep = await dbSortCheep(product,user);

    res
        .status(200)
        .json({
            cheepest:cheep,
            cheepers:{
                'Caprabo':capCS,
                'Condis':codCS,
                'Dia':diaCS,
                'ElCorteIngles':elcCS,
                'Eroskie':eroCS,
                'Lidel':lidCS,
                'LaSirena':lsiCS,
                'Aldi':aldCS,
                'Carrefour':carCS
            },
            sort:{
                'Caprabo':capCmp,
                'Condis':codCmp,
                'Dia':diaCmp,
                'ElCorteIngles':elcCmp,
                'Eroskie':eroCmp,
                'Lidel':lidCmp,
                'LaSirena':lsiCmp,
                'Aldi':aldCmp,
                'Carrefour':carCmp
            }
        })
}