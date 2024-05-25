const { dbFindUser } = require('../../config/mdb-config');
const {loggerDB} = require('../../config/loggers');

module.exports = async (req,res) => {
    const userId = req.user;
    let user;
    
    //Search user
    try{
        user = await dbFindUser(userId);
    }catch(err){
        return res
            .status(401)
            .json({message:err});
    }

    //Log
    if(user)loggerDB(user.name,'logged out');
    else loggerDB('DELETED','logged out');

    //Response and destroy session 
    req.session.destroy();
    res.status(200)
        .json({message:'Good bye!'})

}