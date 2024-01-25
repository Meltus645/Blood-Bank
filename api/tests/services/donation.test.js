const request =require('supertest');
const {create_app} =require('../../src/utils/server.js');
require('dotenv').config();

const mongoose =require('mongoose');

const app =create_app();

beforeAll(async () =>{
    await mongoose.connect(process.env.MONGODB_URI_LOCAL)
});

afterAll(async () =>{
    await mongoose.disconnect();
    await mongoose.connection.close();
});

describe("POST /donation-requests", () =>{
    it("submits donation request, return 201", async () =>{
        const res =await request(app).post('/donations/new').send({
            units: 19, 
            donor: '6547b7d68cd5f7d40bf84f39', 
            center: '6547b381847e4db33620109b', 
            donated_on: new Date(), 
            expires_after: 30
        });
        expect(res.statusCode).toBe(201);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("GET /donations/:id", () =>{
    it("gets single request, should return 200", async () =>{
        const res =await request(app).get('/donations/6547ce2562386274bbf34ef4');
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("GET /donations", () =>{
    it("should return status code 200, and donations", async () =>{
        const res =await request(app).get('/donations');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
});