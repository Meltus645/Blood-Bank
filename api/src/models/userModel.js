const mongoose =require('mongoose');

const BloodTypeSchema =new mongoose.Schema({
    bloodGroup: String,
    rhesusFactor: String,
}, {versionKey: false, _id: false});

const ContactDetailsSchema =new mongoose.Schema({
    email: String,
    location: String,
}, {versionKey: false, _id: false});

const MedicalHistorySchema =new mongoose.Schema({
    diagnosis: String,
    medication: String,
    facility: String,
    date_diagnosed: Date,
}, {versionKey: false, _id: false});

const DonationHistorySchema =new mongoose.Schema({
    quantity: Number,
    facility: String,
    date_donated: Date,
}, {versionKey: false, _id: false});

const Preferences =new mongoose.Schema({
    receive_notifications: {type: Boolean, default: true},
    donation_frequency: Number,
    donation_center: String,
}, {versionKey: false, _id: false});

const schema =new mongoose.Schema({
    role: String,
    password: String,
    last_name: String,
    first_name: String,
    profile_photo: String,
    preferences: Preferences,
    blood_type: BloodTypeSchema,
    contact_details: ContactDetailsSchema,
    medical_history: [MedicalHistorySchema],
    donation_history: [DonationHistorySchema],
}, {versionKey: false});

const model =mongoose.model('users', schema, 'users');

module.exports =model;