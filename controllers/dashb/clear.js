const {dbDeleteAllProds} = require('../../config/mdb-s-config');

module.exports = async (req,res) =>{
    const userId = req.user;

    const resetKart = req.body.pordClearAll || false;

    if(resetKart){
        await dbDeleteAllProds(userId)
            .catch((err)=>{
                return res.status(500).json({message:err})
            })

        return res
            .status(200)
            .json({
                message:'Shopping kart cleaned'
            })
    }else{
        return res
            .status(400)
            .json({
                message:'Bad request, body is missing'
            })
    }

    
}