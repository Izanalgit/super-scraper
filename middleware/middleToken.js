const jwt = require ('jsonwebtoken');

const { readbd } = require('../data/textbbdd');

const {createSecret} = require('../config/authConfig');
const hashSc = createSecret();

const createSession = () => {
    return {
        secret: hashSc,
        resave: false,
        saveUninitialized: true,
        cookie: {secure:false},
    }
}

function genToken(user){
    return jwt.sign({user: user.id},hashSc,{expiresIn:'1h'});
}

function verifyToken(req,res,next){
    const token = req.session.token;

    if(!token)return res.status(401).json({message:'Token missing'});

    jwt.verify(token,hashSc,(err,decoded)=>{
        if(err){
            return res
                .status(401)
                .json({message:'Invalid Token', error: err.message});
        }

        req.user = decoded.user;
        next();
    })
}

function verifyUser(req,res,next){
    const userId = req.user;
    const users = readbd();

    const user = users[userId];

    if(!user) 
        return res
            .status(401)
            .json({message:'User not found'})

    next();
}

module.exports = {
    createSession, 
    genToken, 
    verifyToken,
    verifyUser
 };