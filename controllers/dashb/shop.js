const {
    dbUpdateProd,
    dbDeleteAllProds
} = require('../../config/mdb-s-config');

module.exports = async (req,res) =>{
    const userId = req.user;

    const resetKart = req.body.pordClearAll || false;
    const prodToMark = req.body.prodId;

    if(resetKart){
        const prodMarked = await dbDeleteAllProds(userId)
        return res
            .status(200)
            .json({
                updated: prodMarked,
                message:'Shopping kart cleaned'
            })
    }

    await dbUpdateProd(prodToMark);
    res
        .status(200)
        .json({
            message:'Product added to shopping kart'
        })
}