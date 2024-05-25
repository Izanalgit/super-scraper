const jwt = require ('jsonwebtoken');
const { readbd } = require('../data/textbbdd');
const {loggerMS} = require('./../config/loggers');
require('dotenv').config();

//Secret
const {createSecret} = require('../config/authConfig');
const hashSc = createSecret();

//Session
const createSession = () => {
    return {
        secret: hashSc,
        resave: false,
        saveUninitialized: true,
        cookie: {secure:false}, // (false) HTTP - true HTTPS
    }
}

//Token generators

function genToken(user){
    return jwt.sign({user: user.id},hashSc,{expiresIn:'1h'});
}

function genSearchToken(counter,timer){
    return jwt.sign({'counter':counter},hashSc,{expiresIn:`${timer}`});
}

function genAntiDDoSToken(active){
    return jwt.sign({'active':active},hashSc,{expiresIn:'1m'});
}

//Middlewares

//Session Tokens
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

//Counter Tokens
function verifySearchToken(req,res,next){
    const maxCount = process.env.MAX_COUNT || 5; // (5) Max search
    const tmeCount = process.env.MAX_COUNT || '10m'; // (10m) Expires time
    const token = req.session.counterToken;

    //Init user fore logs
    const userId = req.user;
    const users = readbd();
    const user = users[userId].name;
    
    //Util : init token func
    const initToken =  () =>{
        const newToken = genSearchToken(1,tmeCount)
        req.session.counterToken = newToken;
        req.session.cntr = 1;

        loggerMS('counter search',user,req.session.cntr,'yellow');
    }

    //First enter
    if(!token){
        initToken();
        return next();
    };
    
    //Counter up
    jwt.verify(token,hashSc,(err,decoded)=>{
        //Check and refresh token if expired
        if(err){
            const msg = err.message;
            if(msg === 'jwt expired'){
                initToken();
                return next();
            };

            return res
                .status(401)
                .json({message:'Invalid Counter Token', error: err.message});
        }

        const counter = decoded.counter;

        //Check if max reached
        if(counter >= maxCount){
            loggerMS('counter search',user,'MAX SEARCH','red');
            return res
                .status(423)
                .json({message:'You reach de max number of searchs. Please wait a few...'});
        }

        req.session.counterToken = genSearchToken(counter + 1,tmeCount);
        req.session.cntr = counter + 1;

        loggerMS('counter search',user,req.session.cntr,'yellow');
        next();
    })
}

function antiDDoSToken (req,res,next){//Vulnerabillity : previos token erase -> use inside data, how and where init the first???
    const tokenC = req.session.counterToken;
    const tokenA = req.session.antiAtkToken;

    //Init user fore logs
    const userId = req.user;
    const users = readbd();
    const user = users[userId].name;

    //No Counte token
    if(!tokenC){
        return res
            .status(401)
            .json({message:'Counter Token is missing!'});
    };
    //No Atack token -> init it
    if(!tokenA){
        req.session.antiAtkToken = genAntiDDoSToken(true);
        return next();
    };

    jwt.verify(tokenA,hashSc,(err,decoded)=>{
        //Check and refresh token if expired
        if(err){
            const msg = err.message;
            if(msg === 'jwt expired'){
                req.session.antiAtkToken = genAntiDDoSToken(true);
                return next();
            };
            return res
                .status(401)
                .json({message:'Invalid Anti Atack Token', error: err.message});
        }
        loggerMS('counter search',user,'MUTLIPLE REQUESTS','red');
        res
            .status(429)
            .json({message:'What are you trying?'});
    })

}


module.exports = {
    createSession, 
    genToken, 
    verifyToken,
    verifyUser,
    verifySearchToken,
    antiDDoSToken
 };