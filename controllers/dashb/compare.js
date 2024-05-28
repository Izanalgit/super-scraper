const {dbFindUser} = require ('../../config/mdb-config');
const {
    dbSortProdSN,
    dbSortCheep,
    dbSortCheepS
} = require('../../config/mdb-s-config');

module.exports = async (req,res) =>{
    const userId = req.user;
    const user = await dbFindUser(userId);

    //Sorts
    const capCmp = await dbSortProdSN('Caprabo');
    const codCmp = await dbSortProdSN('Condis');
    const diaCmp = await dbSortProdSN('Dia');
    const elcCmp = await dbSortProdSN('ElCorteIngles');
    const eroCmp = await dbSortProdSN('Eroskie');
    const lidCmp = await dbSortProdSN('Lidel');
    const lsiCmp = await dbSortProdSN('LaSirena');
    const aldCmp = await dbSortProdSN('Aldi');
    const carCmp = await dbSortProdSN('Carrefour');

    //Cheepers
    const capCS = await dbSortCheepS('Caprabo');
    const codCS = await dbSortCheepS('Condis');
    const diaCS = await dbSortCheepS('Dia');
    const elcCS = await dbSortCheepS('ElCorteIngles');
    const eroCS = await dbSortCheepS('Eroskie');
    const lidCS = await dbSortCheepS('Lidel');
    const lsiCS = await dbSortCheepS('LaSirena');
    const aldCS = await dbSortCheepS('Aldi');
    const carCS = await dbSortCheepS('Carrefour');

    //Chepest
    const cheep = await dbSortCheep();

    res
        .status(200)
        .send({
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