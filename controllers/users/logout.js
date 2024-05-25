const { readbd } = require('../../data/textbbdd');
const {loggerDB} = require('../../config/loggers');

module.exports = (req,res) => {
    const userId = req.user;
    const users = readbd();

    if(users)loggerDB(users[userId].name,'logged out');
    else loggerDB('DELETED','logged out');

    //Destroy session
    req.session.destroy();
    res.status(200)
        .json({message:'Good bye!'})

}