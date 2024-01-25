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
        const res =await request(app).post('/donation-requests/new').send({
            patient: '654c92c31b59c7680d7ed984', 
            urgency: 'critical', 
            bloodType: 'A+'
        });
        expect(res.statusCode).toBe(201);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("GET /donation-requests/:id", () =>{
    it("decline or approve request, return 200", async () =>{
        const res =await request(app).put('/donation-requests/654db1ae47f0273db0f00d3f').send({
            status: 'approved'
        });
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("GET /donation-requests/:id", () =>{
    it("gets single request, should return 200", async () =>{
        const res =await request(app).get('/donation-requests/654db1ae47f0273db0f00d3f');
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("GET /donation-requests", () =>{
    it("should return status code 200, and donation requests", async () =>{
        const res =await request(app).get('/donation-requests');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
});