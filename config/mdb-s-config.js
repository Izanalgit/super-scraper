const Product = require('../models/Product');

//Functions not needed but already done just in case, future features?

// - - - - - EDITS - - - - -

//Create
async function dbCreateProd(superm,userId,prod,search){
    
    //Price-unit sanitation
    let pu;
    prod.price != prod.priceUd ? pu = prod.priceUd : pu = null;

    const product = {
        superm,
        search,
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

//Set Kart

async function dbUpdateProd(id){
    try{
        const prod = await Product.findByIdAndUpdate(id,{kart:true},{new:true});
        return prod;
    }catch (err){
        console.error('DB-UPDATE PRODUCT KART ERROR : ',err);
        throw new Error ('ERROR : can not update kart product value');
    }
}

// - - - - - CLEAR - - - - -

//Delete All (no Kart)
async function dbDeleteProds(userId){
    try{
        const delProd = await Product.deleteMany({userId,kart:false});
        return delProd;
    }catch (err){
        console.error('DB-DELETE PRODUCTS ERROR : ',err);
        throw new Error ('ERROR : can not delete products');
    }
}
//Delete All
async function dbDeleteAllProds(userId){
    try{
        const delProd = await Product.deleteMany({userId});
        return delProd;
    }catch (err){
        console.error('DB-DELETE ALL PRODUCTS ERROR : ',err);
        throw new Error ('ERROR : can not delete all products');
    }
}

// - - - - - FINDS - - - - -


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
async function dbFindProdN(pname,userId){
    try{
        const prod = await Product.findOne({userId,pname});
        return prod;
    }catch (err){
        console.error('DB-FIND PRODUCT BY SUPER ERROR : ',err);
        throw new Error ('ERROR : can not find that product');
    }
}

//Find by Super
async function dbFindProdS(superm,userId){
    try{
        const prod = await Product.findOne({superm,userId});
        return prod;
    }catch (err){
        console.error('DB-FIND PRODUCT BY NAME ERROR : ',err);
        throw new Error ('ERROR : can not find that product');
    }
}

// - - - - - SORTS - - - - -

//Sort cheeper
async function dbSortCheep(search,userId){
    try{
        const prod = await Product
            .find(
                {
                    search,
                    userId,
                    'pricep':{ $ne: 0},
                    'priceu':{ $ne: undefined }
                },
                ['superm','pname','pricep','priceu','unit'])
            .sort('priceu pricep')
            .limit(1);
        return prod;
    }catch (err){
        console.error('DB-SORT CHEEPER PRODUCT ERROR : ',err);
        throw new Error ('ERROR : can not sort the cheeper product');
    }
}

//Sort by price and oder by super
async function dbSortProdSN(userId,superm,search,lim){
    const limit = lim || 20;
    try{
        const prods = await Product
            .find(
                {superm,search,userId},
                ['pname','pricep','priceu','unit'])
            .sort('priceu pricep')
            .limit(limit);
        return prods;
    }catch (err){
        console.error('DB-SORT PRODUCT BY PRICE ERROR : ',err);
        throw new Error ('ERROR : can not sort by prices');
    }
}

//Sort by Super and order REQUEST
async function dbSortProd(userId){
    try{
        const prods = await Product
            .find({userId,kart:true},['superm','pname','pricep'])
            .sort('superm');
        return prods;
    }catch (err){
        console.error('DB-FINALL SORT PRODUCT BY SUPER ERROR : ',err);
        throw new Error ('ERROR : can not finall sort by supers');
    }
}

// - - - - - COUNTER - - - - -

//Count results
async function dbCountProds(superm,search,userId){
    try{
        const prods = await Product.countDocuments({superm,search,userId});
        return prods;
    }catch (err){
        console.error('DB-COUNT PRODUCTS BY SUPER ERROR : ',err);
        throw new Error ('ERROR : can not count the produtcs');
    }
}


module.exports = {
    dbCreateProd,
    dbUpdateProd,
    dbDeleteProds,
    dbDeleteAllProds,
    dbFindProd,
    dbFindProdN,
    dbFindProdS,
    dbSortProd,
    dbSortProdSN,
    dbCountProds,
    dbSortCheep,  
}