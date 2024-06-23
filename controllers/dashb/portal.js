const {dbFindUser} = require ('../../config/mdb-config');

module.exports = async (req,res) =>{
    const userId = req.user;
    const user = await dbFindUser(userId);

    const counter = req.cntr || 0;
    const counterToken = req.counterToken;   

    res
        .status(200)
        .send({
            'userName':user.name,
            'userStatus':user.role,
            'serachCounter':counter,
            'counterToken':counterToken
        })
}