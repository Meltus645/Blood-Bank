const mongoose =require('mongoose');

const schema =new mongoose.Schema({
    urgency: String,
    bloodType: String,
    status: {type: String, default: 'pending'}, // pending, approved, declined
    patient: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
}, {versionKey: false});

const model =mongoose.model('donation-requests', schema,  'donation-requests');

module.exports =model;