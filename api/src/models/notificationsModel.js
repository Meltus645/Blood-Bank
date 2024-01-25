const mongoose =require('mongoose');

const schema =new mongoose.Schema({
    body: String,
    is_viewed: {type: Boolean, default: false},
    time_sent: {type: Date, default: Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
}, {versionKey: false});

const model =mongoose.model('notifications', schema, 'notifications');

module.exports =model;