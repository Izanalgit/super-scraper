const { genToken } = require('../../middleware/middleToken');
const { readbd } = require('../../data/textbbdd');
const {loggerDB} = require('../../config/loggers');

module.exports = (req,res) => {
    if(req.session.token) 
        return res
            .status(409)
            .json({message:'Already loged.'}) 

    const {name,pswd} = req.body;
    const users= readbd();

    if(!users) {
        console.log('Login attempt when : Empty BBDD');
        return res
            .status(401)
            .json({message:'Invalid user or password.'})
    }


    const user = Object
        .values(users)
        .find(user=>user.name === name && user.pswd === pswd);
    
    if(!user) return res
        .status(401)
        .json({message:'Invalid user or password.'})
    
    const token = genToken(user)
    req.session.token = token;
    res.status(200)
        .json({user:user.name,message:'Wellcome!'})

    loggerDB(user.name,'logged in');
}