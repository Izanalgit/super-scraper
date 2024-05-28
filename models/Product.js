const mongoose = require('mongoose');

const prodExpires = 25 * 60; // (25) minutes to expire products on db

const prodSchema = new mongoose.Schema({
    superm : {
        type:String,
        required:[true, 'Super name is required'],
        enum : {
            values : [
                'Aldi',
                'Caprabo',
                'Carrefour',
                'Condis',
                'Dia',
                'ElCorteIngles',
                'Eroskie',
                'Lidel',
                'LaSirena',
                'Mercadona'
            ],
            message : '{VALUE} is not available'
        }
    },
    userId : {
        type: mongoose.ObjectId,
        required: true
    },
    pname : {
        type:String,
        required:[true, 'Product name is required'],
    },
    pricep : {
        type:Number,
        default:0
    },
    priceu : {
        type:Number,
    },
    unit : {type:String},
    "expireAt": { type: Date,  expires: prodExpires }
    
},{timestamps:false})

const Product = mongoose.model('product',prodSchema);

module.exports = Product;