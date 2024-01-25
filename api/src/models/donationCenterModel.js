const mongoose =require('mongoose');

const schema =new mongoose.Schema({
    name: String,
    logo: String,
    location: String,
    operationHours: String,
}, {versionKey: false});

const model =mongoose.model('donation-centers', schema, 'donation-centers');

module.exports =model;