const {dbSortProd} = require('../../config/mdb-s-config');

module.exports = async (req,res) =>{
    const userId = req.user;

    const kart = await dbSortProd(userId);
    let sumPrices = 0;

    kart.forEach(prod=>sumPrices += prod.pricep);

    res
        .status(200)
        .json({
            products : kart,
            total : sumPrices            
        })
}