const {generateUniqueId} = require('../../config/authConfig');
const { readbd,savedb } = require('../../data/textbbdd');
const {loggerDB} = require('../../config/loggers');

module.exports = (req,res)=>{
    // Check if session allready exists
    if(req.session.token) 
        return res
            .status(409)
            .json({message:'Already loged.'}) 

    const id = generateUniqueId()
    const {name,pswd} = req.body;
    const newUser = {id, name, pswd};

    //Regist new user or first user
    const users = readbd()
    if(users){
        users[id]=newUser;
        savedb(users);

        loggerDB(users[id].name,'added');
    }else{
        let first = {};
        first[id]=newUser;
        savedb(first);

        loggerDB(first[id].name,'added');
    }


    res.status(201).json(newUser);
}