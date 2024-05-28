const Product = require('../models/Product');

// - - - - - EDITS - - - - -

//Create
async function dbCreateProd(superm,userId,prod){
    
    //Price-unit sanitation
    let pu;
    prod.price != prod.priceUd ? pu = prod.priceUd : pu = null;

    const product = {
        superm,
        userId,
        'pname' : prod.name,
        'pricep' : prod.price || 0,
        'priceu' : pu || undefined,
        'unit': prod.unit
    }

    try{
        const newProd = await Product.create(product);
        return newProd;
    }catch (err){
        console.error('DB-CREATE PRODUCT ERROR : ',err);
        throw new Error ('ERROR : can not create new product');
    }
}

//Delete All
async function dbDeleteAllProds(userId){
    try{
        const delProd = await Product.deleteMany({userId});
        return delProd;
    }catch (err){
        console.error('DB-DELETE PRODUCTS ERROR : ',err);
        throw new Error ('ERROR : can not delete products');
    }
}

// - - - - - FINDS - - - - -

//Find all
async function dbFindAllProds(userId){
    try{
        const allProds = await Product.find({userId});
        return allProds;
    }catch (err){
        console.error('DB-FIND PRODUCTS ERROR : ',err);
        throw new Error ('ERROR : can not find products');
    }
}

//Find by id
async function dbFindProd(id){
    try{
        const prod = await Product.findById(id);
        return prod;
    }catch (err){
        console.error('DB-FIND PRODUCT BY ID ERROR : ',err);
        throw new Error ('ERROR : can not find that product');
    }
}

//Find by Name
async function dbFindProdN(pname){
    try{
        const prod = await Product.findOne({pname});
        return prod;
    }catch (err){
        console.error('DB-FIND PRODUCT BY SUPER ERROR : ',err);
        throw new Error ('ERROR : can not find that product');
    }
}

//Find by Super
async function dbFindProdS(superm){
    try{
        const prod = await Product.findOne({superm});
        return prod;
    }catch (err){
        console.error('DB-FIND PRODUCT BY NAME ERROR : ',err);
        throw new Error ('ERROR : can not find that product');
    }
}

// - - - - - SORTS - - - - -

//Sort cheeper
async function dbSortCheep(){
    try{
        const prod = await Product
            .find({'priceu':{ $ne: undefined }},['superm','pname','pricep','priceu','unit'])
            .sort('priceu pricep')
            .limit(1);
        return prod;
    }catch (err){
        console.error('DB-SORT CHEEPER PRODUCT ERROR : ',err);
        throw new Error ('ERROR : can not sort the cheeper product');
    }
}

//Sort cheeper by Super
async function dbSortCheepS(superm){
    try{
        const prod = await Product
            .find({superm},['pname','pricep','priceu','unit'])
            .sort('priceu pricep')
            .limit(1);
        return prod;
    }catch (err){
        console.error('DB-SORT CHEEPER PRODUCT ERROR : ',err);
        throw new Error ('ERROR : can not sort the cheeper product');
    }
}

//Sort by price and oder All
async function dbSortProd(){
    try{
        const prods = await Product
            .find()
            .sort('priceu pricep');
        return prods;
    }catch (err){
        console.error('DB-SORT PRODUCT BY PRICE ERROR : ',err);
        throw new Error ('ERROR : can not sort by prices');
    }
}

//Sort by price and oder by super
async function dbSortProdSN(superm,lim){
    const limit = lim || 20;
    try{
        const prods = await Product
            .find({superm},['pname','pricep','priceu','unit'])
            .sort('priceu pricep')
            .limit(limit);
        return prods;
    }catch (err){
        console.error('DB-SORT PRODUCT BY PRICE ERROR : ',err);
        throw new Error ('ERROR : can not sort by prices');
    }
}

// - - - - - COUNTER - - - - -

//Count results
async function dbCountProds(superm){
    try{
        const prods = await Product.countDocuments({superm});
        return prods;
    }catch (err){
        console.error('DB-COUNT PRODUCTS BY SUPER ERROR : ',err);
        throw new Error ('ERROR : can not count the produtcs');
    }
}


module.exports = {
    dbCreateProd,
    dbDeleteAllProds,
    dbFindAllProds,
    dbFindProd,
    dbFindProdN,
    dbFindProdS,
    dbSortProd,
    dbSortProdSN,
    dbCountProds,
    dbSortCheep,
    dbSortCheepS    
}