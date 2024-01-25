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


describe("GET /centers", () =>{
    it("returns all donation centers", async () =>{
        const res =await request(app).get('/centers');
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    })
});

describe("GET /centers/:id get single donation center", () =>{
    it("returns a donation center identified by id", async () =>{
        const res =await request(app).get('/centers/654c690c2dcc48b55600eb82');
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});

describe("PUT /centers/:id", () =>{
    it("update details of the center given", async () =>{
        const res =await request(app).put('/centers/654c690c2dcc48b55600eb82').send({
            name: 'Donation Center X', 
            logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAU3SURBVFiFvVddbFNlGH7e75y2p2vH2o11AoIyfxCzwYSgcRjj0HjnzwVEgRCCVyaYmHjBJt4sEsjGbrhBE0xMjERETAw/iQkmEgOTKReyAQqGCykQ19OVdfTndD3n+14vtnY9W9t1u/C56/vzvM/7ve/58pWwSPC23kb4tNMgRJGTe+hUb34xPGJRxXcNBGBo5wG8BMYO+LTj3Nu7KK4FJzGYwLnjqAtsRLCuYN6G2+LA/yIAOw9sh0d/G5s2AE1LSxzUwzs/3bRQOr2aMx6Pr2HmdiJaCSCm/XnnGr74cQDhMCAEYJql4QJER0zT3E1EzwNoYea7RHStubn51oIExOPxd5m5m5k7AICZp4JTFgMgJCeA368AVm52aqcnGv/bXtVMBQMzwzTNPwD0RyKRk7MTXCMwTTNomuYZZj4BoGOO2pvRKeJ8Hkhny3dUiHHjOQDfxmKx06Ojo4GyAphZB3AWwBsA4PV6oWmai4XHU2WLlkKNJSv6iOhNIcTZ6VpuAWNjY/sBvEJECIVCaGhoQCgUchFYolxzbljT46qCrng83uMSMDEx0cjM+wAgGAzC4/FMOYUA0UxRK1yPPCoXSHl1TK5snlckgH3JZDJcFJDP57cBCAghYBhGMcq27eICAoB6fQMSuj7d5YydmfFQCEz4vRCbnq5FQL1t21uLApj5NWCq41LSdDrtyvItDSGzuwsP/D78qwhjAOJEGGVgojGI3J5X4S1poBqY+VVg+jNk5meJCFJK2LYNIkI6nYbjOHAcB7FYrHgSMqjj7jsbEbifhC+RAQuCFanH5PIQlpBE6v59AAARoaWlBbpe/qohoraiACJaWug6mXRvcTQaRSKRcO0CM+NBEFB1fhARhFAwsllYluWKmZycRGtra6UTiBQFSCnl7E+ugJaWFhARlFLVTnQOhBCIRCIV/VJKuyhAKWVqmrasXGAgEMDq1asXVLwWKKXiRQHyxNCgJ+tkoQsDmjCgawZ04YcggzVhkCZq26zZkMoixTl2ZA6Sc3BkDlLl4Khc3hDDRQHpH64kDKG/WI6j2tVD3qkF47xTKcTPgL+cI6fsC8D0ZyiF+D7HHK+lqQK0FY1oOrcfTef2Q1vRuJBUWKzGJeG7ooD2i4dGskrenPcSLRWwLAwyPCDDA21ZuOY8BmAp9Vfbpf6ZEQBAXsq+rBDrAiQaqhF42lbBs/4xaCuaijbflnboa5bDHr4D+3q0qoCMkikiebDw2zXiG50f/9yoiS6tyuTDX+6F/uQjZX3O7VGMv3e0Yq5kRpKdC2sH+7cUbK73gKXRznEpY9VGIe8lKvvujlX0MQPjLEdVXu0otc9pdaSz+y0f6KuwppcfBREoaMDb8TiWHJzievjJN8hf/Qeczk1VKoNxKR+ykrueGTp8ptQ+51G67tf+0w7jWFLJTKVWOGVBpWeeYyqdA6esisWTUqYc5qOziwNA2fv3s3uXfnr/0c2rbMJaHwlvuY3g8Qzg1WBfj2Ly/DAg517VDGBCyfQkcLztct9H5WpVfeKMdHYf80BsbxRakOZ/DLmLM5CQTkoyvm4f6ttbKW5e2hubez5gxYfCml7vqVGFDcYDx0mB0d0+1P95tdiaGK++sK9LE3TKECK4hDRfJR0MICWlZUFlmNXWdZcHfpmPu6Z/Rh2/Hb6QUf7WnFIn48pJZ1m51o0BZFmx6TiZLNTJjPQ/UUtxoMYTKMVIZ/fLAI4I0FNBEnUMUEYpSwG3WMgP1w8OXFwI34IFFDDc2bNFMPoAQArV3TF4+MJieP4DqL5NrpNYjSIAAAAASUVORK5CYII=', 
            location: 'Mombasa', 
            operationHours: '7.00AM-8.00AM'
        });
        expect(res.statusCode).toBe(200);
        expect(Object.keys(res.body).length).toBeGreaterThan(0);
    })
});