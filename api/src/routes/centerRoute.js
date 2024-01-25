const { Router } = require("express");
const {getDonationCenters, registerDonationCenter, removeDonationCenter, updateDonationCenter} = require("../services/donationCentersService.js");

const router =Router();

router.get('/', getDonationCenters);
router.post('/new', registerDonationCenter);
router.get('/remove/:id', removeDonationCenter);
router.get('/:id', getDonationCenters);
router.put('/:id', updateDonationCenter);

module.exports =router;