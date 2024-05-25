const {dbFindUser} = require ('../../config/mdb-config');

module.exports = async (req,res) =>{
    const userId = req.user;
    const user = await dbFindUser(userId);

    const counter = req.session.cntr || 0;   

    res
        .status(200)
        .send({
            'userName':user.name,
            'serachCounter':counter
        })
}