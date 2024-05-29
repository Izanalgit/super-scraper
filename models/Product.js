const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    expireAt: {
        type: Date,
        default: new Date(),
        expires: 3600, // (60*60) 1h expires time, clean db good db (: ... free db xD
    },
    search : {
        type:String,
        required:[true, 'Search product name is required'],
    },
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
        required:[true, 'userId is required']
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
    unit : {
        type:String
    },
    kart : {
        type:Boolean,
        required:[true , 'Kart values is required'],
        default:false
    }
    
})

const Product = mongoose.model('product',prodSchema);

module.exports = Product;