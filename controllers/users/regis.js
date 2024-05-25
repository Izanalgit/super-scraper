const {dbCreateUser} = require('../../config/mdb-config');
const {loggerDB} = require('../../config/loggers');

module.exports =async (req,res)=>{
    let newUser;

    // Check if session allready exists
    if(req.session.token) 
        return res
            .status(409)
            .json({message:'Already loged.'}) 

    const {name,pswd} = req.body;
    
    //Create new user
    try{
        newUser = await dbCreateUser({
            'name':name,
            'pswd':pswd,
            'role':'normal'
        })
    }catch(err){
        return res
            .status(401)
            .json({message:'Invalid user'})        
    }

    //Check created user
    if(!newUser) 
        return res
            .status(500)
            .json({message: 'Something is wrong here.'});

    //Log and response
    res
        .status(201)
        .json(newUser);

    loggerDB(newUser.name,'added');
}