const mongoose =require('mongoose');

const schema =new mongoose.Schema({
    units: Number,
    center: {type: mongoose.Schema.Types.ObjectId, ref: 'donation-centers'},
    expires_after: Number, // days
    used: {type: Boolean, default: false},
    donated_on: {type: Date, default: Date.now},
    donor: { type: mongoose.Schema.Types.ObjectId, ref: 'users', }
}, {versionKey: false});

const model =mongoose.model('donations', schema,  'donations');

module.exports =model;