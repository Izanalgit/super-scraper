const mongoose = require('mongoose');
const {loggerMS} = require('./loggers');
require('dotenv').config();

const BD = process.env.MONGO_BBDD || 'local-scraper-users';
const URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/';

const User = require('../models/User');

// DB Connection
async function dbConnect(){
    try{
        await mongoose.connect(URI + BD);
        loggerMS('bbdd connection','mongo data base : ',BD,'yellow');
    }catch(err){
        console.error('DB-CONNECTION ERROR : ',err);
        throw new Error ('ERROR : can not initialize data base');
    }
}

//Create
async function dbCreateUser(user){
    try{
        const newUser = await User.create({...user,role:'normal'});
        return newUser;
    }catch (err){
        console.error('DB-CREATE USER ERROR : ',err);
        throw new Error ('ERROR : can not create new user');
    }
}

//Find all
async function dbFindUsers(){
    try{
        const allUser = await User.find();
        return allUser;
    }catch (err){
        console.error('DB-FIND USERS ERROR : ',err);
        throw new Error ('ERROR : can not find users');
    }
}

//Find by id
async function dbFindUser(id){
    try{
        const user = await User.findById(id);
        return user;
    }catch (err){
        console.error('DB-FIND USER BY ID ERROR : ',err);
        throw new Error ('ERROR : can not find that user');
    }
}

//Find by login
async function dbFindUserN(userName,password){
    try{
        const user = await User.findOne({name:userName,pswd:password});
        return user;
    }catch (err){
        console.error('DB-FIND USER BY NAME ERROR : ',err);
        throw new Error ('ERROR : can not find that user');
    }
}

//Update by id
async function dbUpdateUser(id,user){
    try{
        const updtUser = await User.findByIdAndUpdate(id,user,{new:true});
        return updtUser;
    }catch (err){
        console.error('DB-UPDATE USER BY ID ERROR : ',err);
        throw new Error ('ERROR : can not update that user');
    }
}

//Delete by id
async function dbDeleteUser(id){
    try{
        const delUser = await User.findByIdAndDelete(id);
        return delUser;
    }catch (err){
        console.error('DB-DELETE USER BY ID ERROR : ',err);
        throw new Error ('ERROR : can not delete that user');
    }
}


module.exports = {
    dbConnect,
    dbCreateUser,
    dbFindUsers,
    dbFindUser,
    dbFindUserN,
    dbUpdateUser,
    dbDeleteUser
}