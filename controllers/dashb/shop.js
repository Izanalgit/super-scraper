const {dbUpdateProd} = require('../../config/mdb-s-config');

module.exports = async (req,res) =>{
    const prodToMark = req.body.prodId;

    await dbUpdateProd(prodToMark)
        .then((marked)=>{

            //Good id format, no product
            if(!marked){
                return res
                    .status(400)
                    .json({
                        message:'Bad request, product id does not exist'
                    })
            }

            //Product updated
            return res
                .status(201)
                .json({
                    updated: marked,
                    message:'Product added to shopping kart'
                })
        })
        //Bad id format
        .catch(()=>{
            return res
                .status(400)
                .json({
                    message:'Bad request, product id is not valid'
                })
        })
    
}