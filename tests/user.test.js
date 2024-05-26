const request = require('supertest');
const mongoose = require('mongoose');
const {app,server} = require('../app.js');

const agent = request.agent(app); //Keeps session and cookies

const User = require('../models/User.js');

describe('TEST OF CRUD USERS MONGO-DB',()=>{

    const user = {name:"probe1",pswd:"12wABCabc!"};
        
    it('REGISTER : Should create a new user',async ()=>{

        await agent
            .post('/api/users/register')
            .send(user)
            .expect(201)
            .expect ((res)=>{
                expect(res.body._id).toBeDefined();
                expect(res.body.name).toBe(user.name);
                expect(res.body.pswd).toBe(user.pswd);
                expect(res.body.createdAt).toBeDefined();
                expect(res.body.updatedAt).toBeDefined();
            })        
    })

    it('LOGIN : Should log in the user',async ()=>{

        await agent
            .post('/api/users/login')
            .send(user)
            .expect(200)
            .expect((res)=>{
                expect(res.body.user).toBe(user.name);
                expect(res.body.message).toBe('Wellcome!');
            })
    })

    
    it('LOGOUT : Should log out the user',async ()=>{

        await agent
            .post('/api/users/logout')
            .expect(200);

    })

    it('REMOVE : Should remove the user',async ()=>{

        await agent
            .post('/api/users/login')
            .send(user)
            .expect(200);

        await agent
            .del('/api/users/remove')
            .send(user)
            .expect(200);

        await agent
            .post('/api/users/login')
            .send(user)
            .expect(401);

    })

    //Server and DB connection closure (prevent leaks on jest test)
    afterAll(async () => {
        await mongoose.connection.close();
        server.close();
    });
})