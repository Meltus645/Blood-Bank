const mongoose =require('mongoose');

const schema =new mongoose.Schema({
    center: {type: mongoose.Schema.Types.ObjectId, ref: 'donation-centers'},
    date_set: Date,
    reason: String,
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    status: {type: String, default: 'pending'}, // pending, approved, declined
}, {versionKey: false}); 

const model =mongoose.model('appointments', schema, 'appointments');

module.exports =model;