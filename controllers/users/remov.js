const { readbd,savedb } = require('../../data/textbbdd');
const {loggerDB} = require('../../config/loggers');


module.exports = (req,res) => {
    const {name,pswd} = req.body;
    const users = readbd();

    const user = Object
        .values(users)
        .find(user=>user.name === name && user.pswd === pswd);
    
    if(!user) return res
        .status(401)
        .json({message:'Invalid user or password.'})

    const userId = req.user;

    if(userId !== user.id) {
        console.log(`ID ${userId} attepts to erase ${user.id}`);
        return res
            .status(401)
            .json({message:'Invalid user.'})
    }
    
    delete users[user.id];
    savedb(users);

    loggerDB(user.name,'deleted');
        
    req.session.destroy();
    res.status(200)
        .json({message:`Farewell ${user.name}!`});
}