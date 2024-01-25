const { Router } =require("express");
const {getDonations, newDonation} = require("../services/donationService.js");

const router =Router();

router.get('/', getDonations);
router.get('/:id', getDonations);
router.post('/new', newDonation);

module.exports =router;