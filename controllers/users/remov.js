const {dbFindUserN,dbDeleteUser} = require('../../config/mdb-config');
const {loggerDB} = require('../../config/loggers');


module.exports = async (req,res) => {
    const {name,pswd} = req.body;
    let user;
    let userDel;

    //Search user
    try{
        user = await dbFindUserN(name,pswd);
    }catch(err){
        return res
            .status(401)
            .json({message:err});
    }

    //Check user
    if(!user) return res
        .status(401)
        .json({message:'Invalid user or password.'})

    const userId = req.user;

    //Check if is same user
    if(userId != user._id) {
        console.log(`ID ${userId} attepts to erase ${user._id}`);
        return res
            .status(401)
            .json({message:'Invalid user.'})
    }
    
    //Delete user
    try{
        userDel = await dbDeleteUser(userId)
    }catch(err){
        return res
            .status(401)
            .json({message:err});
    }

    //Log
    loggerDB(userDel.name,'deleted');
    
    //Destroy session
    req.session.destroy();
    res.status(200)
        .json({message:`Farewell ${user.name}!`});
}