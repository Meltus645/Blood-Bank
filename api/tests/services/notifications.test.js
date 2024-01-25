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

describe("POST /notifications/notify/:id", () =>{
    it("should notify user, return 201", async () =>{
        const res =await request(app).post('/notifications/notify/65493d67d4b2d5cb3058898d').send({
            body: "Notification Sent"
        });
        expect(res.statusCode).toBe(201);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("GET /notifications/read/:id", () =>{
    it("changes notification is_viewed to true, return 200", async () =>{
        const res =await request(app).get('/notifications/read/654db1ae47f0273db0f00d40');
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("GET /notifications/user-notifications/:id", () =>{
    it("gets user notifications, should return 200", async () =>{
        const res =await request(app).get('/notifications/user-notifications/654c64332dcc48b55600e94b');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
});

describe("GET /notifications", () =>{
    it("should return status code 200, and a notifications", async () =>{
        const res =await request(app).get('/notifications/654db1ae47f0273db0f00d40');
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});