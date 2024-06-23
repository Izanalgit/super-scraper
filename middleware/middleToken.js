const jwt = require ('jsonwebtoken');
const {dbFindUser} = require('./../config/mdb-config');
const {loggerMS} = require('./../config/loggers');
require('dotenv').config();

//Secret
const {createSecret} = require('../config/authConfig');
const hashSc = createSecret();

//Session config
const createSession = () => {
    return {
        secret: hashSc,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure:false,
            // httpOnly: false,
            // sameSite: "None",
            // response_mode:'form_post',
        }, 
    }
}

const tmeCount = process.env.TME_COUNT || '30m'; // (30m) Expires time

//Token generators

function genToken(user){
    return jwt.sign({user: user._id},hashSc,{expiresIn:'1h'});
}

function genSearchToken(counter,timer){
    return jwt.sign({'counter':counter},hashSc,{expiresIn:`${timer}`});
}

//Util : init token func
const initToken =  (user) =>{
    const newToken = genSearchToken(1,tmeCount)

    loggerMS('counter search',user.name,1,'yellow');

    return newToken;
}

//Middlewares

//Session Tokens
function verifyToken(req,res,next){
    const token = req.session.token || req.body.sesTok;

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

async function verifyUser(req,res,next){
    const userId = req.user;
    const user = await dbFindUser(userId);

    if(!user) 
        return res
            .status(401)
            .json({message:'User not found'})

    next();
}

//Counter Tokens
async function verifySearchToken(req,res,next){
    let maxCount = process.env.MAX_COUNT || 5; // (5) Max search
    const token = req.body.counterToken;
    console.log('token body',token)
    //Init user for logs
    const userId = req.user;
    const user = await dbFindUser(userId);

    //Premi counter
    if(user.role === 'premy') maxCount = process.env.MAX_COUNT_P || 20; // (20) Premy max search
    
    //Counter up
    jwt.verify(token,hashSc,(err,decoded)=>{
        //Check and refresh token if expired
        if(err){
            const msg = err.message;
            if(msg === 'jwt expired'){
                return next();
            };

            return res
                .status(401)
                .json({message:'Invalid Counter Token', error: err.message});
        }

        const counter = decoded.counter;

        //Check if max reached
        if(counter > maxCount){
            req.counterToken = token;
            req.cntr = counter;
            loggerMS('counter search',user.name,'MAX SEARCH','red');
            return res
                .status(423)
                .json({message:'You reach de max number of searchs. Please wait a few...'});
        }

        req.counterToken = genSearchToken(counter + 1,tmeCount);
        req.cntr = counter + 1;

        loggerMS('counter search',user.name,req.cntr,'yellow');
        next();
    })
}

//Reset the counter token if it expired or init.
async function verifySearchLite(req,res,next){
    const token = req.body.counterToken;

    //Init user for logs
    const userId = req.user;
    const user = await dbFindUser(userId);

    if(token){
        jwt.verify(token,hashSc,(err,decoded)=>{
            if(err){
                const msg = err.message;
                if(msg === 'jwt expired'){
                    req.cntr = 1;
                    req.counterToken = initToken(user);
                };
            }else{
                req.cntr = decoded.counter;
                req.counterToken = token;
            } 
        })
    }else {
        req.cntr = 1;
        req.counterToken = initToken(user);
    }

    next();
}




module.exports = {
    createSession, 
    genToken, 
    verifyToken,
    verifyUser,
    verifySearchToken,
    verifySearchLite,
 };