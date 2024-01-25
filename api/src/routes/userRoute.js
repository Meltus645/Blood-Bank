const { Router } = require('express');
const {getDonors, registerUser, loginUser, deleteUser, getUserByID, updateUser, saveUserMedicalRecord, saveUserDonationRecord} = require('../services/userService.js');

const route =Router();
route.get('/donors', getDonors);
route.post('/login', loginUser);
route.post('/new', registerUser); 
route.get('/remove/:id', deleteUser);
route.put('/:id', updateUser);
route.get('/:id', getUserByID);
route.get('/:id/:field', getUserByID);
route.post('/new/medical-record/:id', saveUserMedicalRecord);
route.post('/new/donation-record/:id', saveUserDonationRecord);

module.exports =route;