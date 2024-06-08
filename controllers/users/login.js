const {genToken} = require('../../middleware/middleToken');
const {dbFindUserN} = require('../../config/mdb-config');
const {loggerDB} = require('../../config/loggers');

module.exports = async (req,res) => {
    let user;

    // Check if session allready exists
    if(req.session.token || req.body.sesTok) 
        return res
            .status(409)
            .json({message:'Already loged.'}) 

    const {name,pswd} = req.body;

    //User search
    try{
        user = await dbFindUserN(name,pswd);
    }catch(err){
        return res
            .status(401)
            .json({message:err});
    }
    
    //Check valid user
    if(!user) 
        return res
            .status(401)
            .json({message: 'Invalid user or password'})
    
    //Generate session token
    const token = genToken(user._id);
    req.session.token = token;

    //Log and response
    res
        .status(200)
        .json({user:user.name,message:'Wellcome!',sestok:token})

    loggerDB(user.name,'logged in');
}