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

describe("GET /appointments", () =>{
    it("returns all appointments", async () =>{
        const res =await request(app).get('/appointments');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
});

describe("GET /appointments/user-appointments/:id", () =>{
    it("should return appointments made by user with id", async () =>{
        const res =await request(app).get('/appointments/user-appointments/654c64332dcc48b55600e94b');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
});

describe("POST /appointments/new", () =>{
    it("should save appointment in db", async () =>{
        const res =await request(app).post('/appointments/new').send({
            center: '654c690c2dcc48b55600eb82',
            client: '65493d67d4b2d5cb3058898d', 
            date_set: new Date(),
            reason: 'Blood Donation'
        });
        expect(res.statusCode).toBe(201);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("PUT /appointments/review/:id", () =>{
    it("should update the status of the appointment", async () =>{
        const res =await request(app).put('/appointments/review/654cf3d7708aa63f5c7729ad').send({
            status: 'approved',
        });
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});