const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:[true, 'Name is required'],
        unique:true
    },
    pswd : {
        type:String,
        require: [true, 'Password is required']
    },
    role : {
        type:String,
        require: [true, 'Role is required'],
        enum : {
            values : ['normal','premy'],
            message : '{VALUE} is not available'
        }

    }
},{timestamps:true})

const User = mongoose.model('user',userSchema);

module.exports = User;