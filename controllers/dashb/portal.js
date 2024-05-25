const {readbd} = require ('../../data/textbbdd');

module.exports = (req,res) =>{
    const userId = req.user;
    const users = readbd();
    const user =users[userId].name; 

    const counter = req.session.cntr || 0;   

    res
        .status(200)
        .send({
            'userName':user,
            'serachCounter':counter
        })
}