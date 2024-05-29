const mongoose = require('mongoose');

const {
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
}=require('../config/mdb-s-config');

const Product = require('../models/Product');

const db = 'test-SS-Products-mongodb';
const url = 'mongodb://127.0.0.1:27017/';

beforeAll(async () => await mongoose
    .connect(url + db)
    .catch(err=>console.error(err)));

beforeEach(async () => await Product.deleteMany({}));
afterEach(async () => await Product.deleteMany({}));

afterAll(async () => await mongoose.connection.close());

describe('TEST OF PRODUCTS FUNCTIONS MONGO-DB',()=>{
    
    describe('Create and update :', () => {
		it('create a new product function', async () => {

			const prod = await dbCreateProd(
                "Condis",
                "6654fe076f82c1ea05763f6e",
                {
                    name:"Fanta Limon",
                    price:"0.99",
                    priceUd:"2",
                    unit:"lata"
                },
                "Fanta"
            )

			const match = await Product.findById(prod._id).exec();

			expect(match._id).toEqual(prod._id);
            expect(match.superm).toEqual(prod.superm);
            expect(match.pname).toEqual(prod.pname);
            expect(match.pricep).toEqual(prod.pricep);
		});
        it('update product kart function', async () => {

			const testProd = await Product.create({
                superm:"Lidel",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Fanta Grosella",
                pricep : "55",
                priceu : "10",
            });
            
            expect(testProd.kart).toEqual(false);

			const updat = await dbUpdateProd(testProd._id);
            const match = await Product.findById(updat._id).exec();

			expect(match.kart).toEqual(true);

		});
	});

    describe('Delete products :', () => {

        beforeEach(async () => {
            await Product.create({
                superm:"Dia",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Fanta Grosella",
                pricep : "2",
                priceu : "1",
            })
            await Product.create({
                superm:"Lidel",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Pepsi Grosella",
                pricep : "55",
                priceu : "30",
                kart : true
            })
        });

		it('delete product whit no kart function', async () => {
            await dbDeleteProds("6654fe076f82c1ea05763f6e");

            const prods = await Product.countDocuments({}).exec();

            expect(prods).toBe(1);
			
		});
        it('delete all the products function', async () => {

			await dbDeleteAllProds("6654fe076f82c1ea05763f6e");

            const prods = await Product.countDocuments({}).exec();

            expect(prods).toBe(0);

		});
	});

    describe('Find products :', () => {
		it('find product by id function', async () => {

			const testProd = await Product.create({
                superm:"Lidel",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Fanta Grosella",
                pricep : "55",
                priceu : "10",
            })
            const testProdId = testProd._id;

            const findp = await dbFindProd(testProdId)
			const match = await Product.findById(testProdId).exec();

			expect(match._id).toEqual(findp._id);
            expect(match.superm).toEqual(findp.superm);
            expect(match.pname).toEqual(findp.pname);
            expect(match.pricep).toEqual(findp.pricep);
		});
        it('find product by name function', async () => {
            const testProd = await Product.create({
                superm:"Lidel",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Fanta Grosella",
                pricep : "55",
                priceu : "10",
            })
            const testProdId = testProd._id;

            const findp = await dbFindProdN(testProd.pname,testProd.userId)
			const match = await Product.findById(testProdId).exec();

			expect(match._id).toEqual(findp._id);
            expect(match.superm).toEqual(findp.superm);
            expect(match.pname).toEqual(findp.pname);
            expect(match.pricep).toEqual(findp.pricep);


		});
        it('find product by super function', async () => {
            const testProd = await Product.create({
                superm:"Lidel",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Fanta Grosella",
                pricep : "55",
                priceu : "10",
            })
            const testProdId = testProd._id;

            const findp = await dbFindProdS(testProd.superm,testProd.userId);
			const match = await Product.findById(testProdId).exec();

			expect(match._id).toEqual(findp._id);
            expect(match.superm).toEqual(findp.superm);
            expect(match.pname).toEqual(findp.pname);
            expect(match.pricep).toEqual(findp.pricep);


		});
	});

    describe('Sort products :', () => {

        beforeEach(async () => {
            await Product.create({
                superm:"Dia",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Fanta Grosella",
                pricep : "2",
                priceu : "1",
            })
            await Product.create({
                superm:"Lidel",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Pepsi Grosella",
                pricep : "55",
                priceu : "30",
            })
            await Product.create({
                superm:"Carrefour",
                search:"Fanta",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Fanta Grosella",
                pricep : "20",
                priceu : "10",
                kart:true
            })
            await Product.create({
                superm:"Carrefour",
                search:"Cocacola",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Cocacola light",
                pricep : "30",
                priceu : "80",
            })
            await Product.create({
                superm:"Carrefour",
                search:"Cocacola",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Cocacola zero",
                pricep : "33",
                priceu : "89",
                kart:true
            })
        });

		it('find the chepest product function', async () => {
            
            const cheep = await dbSortCheep("Fanta","6654fe076f82c1ea05763f6e");

            const prods = await Product.find().exec();

            prods.forEach((prod)=>{
                expect(cheep[0].priceu).toBeLessThanOrEqual(prod.priceu);
                expect(cheep[0].pricep).toBeLessThanOrEqual(prod.pricep);
            })


		});
        it('sort products by price function', async () => {

            const cheep = await dbSortProdSN(
                "6654fe076f82c1ea05763f6e",
                "Carrefour",
                "Cocacola",
                1
            );

            const prods = await Product.find({
                superm:"Carrefour",
                search:"Cocacola",
                userId:"6654fe076f82c1ea05763f6e"
            }).exec();

            prods.forEach((prod)=>{
                expect(cheep[0].priceu).toBeLessThanOrEqual(prod.priceu);
                expect(cheep[0].pricep).toBeLessThanOrEqual(prod.pricep);
            })


		});
        it('sort the product in the kart function', async () => {

            const prods = await dbSortProd("6654fe076f82c1ea05763f6e");

            expect(prods.length).toBe(2);

		});
	});

    describe('Count products :', () => {
		it('count products found function', async () => {

            await Product.create({
                superm:"Carrefour",
                search:"Cocacola",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Cocacola zero",
                pricep : "33",
                priceu : "89",
                kart:true
            },{
                superm:"Carrefour",
                search:"Cocacola",
                userId:"6654fe076f82c1ea05763f6e",
                pname : "Cocacola normal",
                pricep : "50",
                priceu : "89",
            })

            const prods = await dbCountProds(
                "Carrefour",
                "Cocacola",
                "6654fe076f82c1ea05763f6e"
            )

            expect(prods).toBe(2);

		});
	});

})



