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

describe("POST /login Invalid credentials", () =>{
    it("return 401 when user provided invalid credentials", async () =>{
        const res =await request(app).post('/users/login').send({
            email: 'email',
            password: 'password',
        });
        expect(res.statusCode).toBe(401);
    })
});


describe("POST /users/login valid credentials", () =>{
    it("return 200 when user provided valid credentials", async () =>{
        const res =await request(app).post('/users/login').send({
            email: 'sysadm@host.com',
            password: 'Test1234',
        });
        expect(res.statusCode).toBe(200);
    })
});

describe("Get /users/donors", () =>{
    it("returns users registered as donors", async () =>{
        const res =await request(app).get('/users/donors');
        expect(res.statusCode).toBe(200);
    })
});

describe("Get /users/:id", () =>{
    it("returns user by ID", async () =>{
        const res =await request(app).get('/users/65493d67d4b2d5cb3058898d');
        expect(res.statusCode).toBe(200);
    })
});

describe("Get /users/:id:field medical history", () =>{
    it("returns user medical history", async () =>{
        const res =await request(app).get('/users/65493d67d4b2d5cb3058898d/medical_history');
        expect(res.statusCode).toBe(200);
    })
});

describe("Get /users/:id:field donation history", () =>{
    it("returns user donation history", async () =>{
        const res =await request(app).get('/users/65493d67d4b2d5cb3058898d/donation_history');
        expect(res.statusCode).toBe(200);
    })
});

describe("POST /users/new New user", () =>{
    it("returns user donation history", async () =>{
        const res =await request(app).post('/users/new').send({
            bio: {first_name: 'Test', last_name: 'Name'}, 
            contact: {email: `${Math.random().toString(36).substring(2, 10)}@gmail.com`, location: 'USA'}, 
            login: {password: 'Test1234'}, 
            blood_type: {bloodGroup: 'A', rhesusFactor: '+'}, 
        });
        expect(res.statusCode).toBe(201);
    })
});

describe("POST /users/new New user", () =>{
    it("returns user donation history", async () =>{
        const res =await request(app).post('/users/new').send({
            bio: {first_name: 'Test', last_name: 'Name'}, 
            contact: {email: 'test05@gmail.com', location: 'USA'}, 
            login: {password: 'Test1234'}, 
            blood_type: {bloodGroup: 'A', rhesusFactor: '+'}, 
        });
        expect(res.statusCode).toBe(409);
    })
});

describe("POST /users/new//medical-record New user medical record", () =>{
    it("returns user donation history", async () =>{
        const res =await request(app).post('/users/new/medical-record/654e6203d271b60241bff849').send({
            diagnosis: 'Diagnosis y', 
            medication: 'Medication X', 
            facility: 'Center X', 
            date_diagnosed: new Date()
        });
        expect(res.statusCode).toBe(200);
    })
});

describe("POST /users/new/donation-record New user donation record", () =>{
    it("returns user donation history", async () =>{
        const res =await request(app).post('/users/new/donation-record/654e6203d271b60241bff849').send({
            quantity: 12, 
            facility: 'Facility X', 
            date_donated: new Date(),
        });
        expect(res.statusCode).toBe(200);
    })
});

describe("PUT /users/:id New user", () =>{
    it("returns user donation history", async () =>{
        const res =await request(app).put('/users/654e6203d271b60241bff849').send({
            bio: {first_name: 'Test', last_name: 'Name'}, 
            contact: {email: 'test13@gmail.com', location: 'USA'}, 
            login: {password: 'Test1234'}, 
            blood_type: {bloodGroup: 'A', rhesusFactor: '+'}, 
        });
        expect(res.statusCode).toBe(200);
    })
});