const { Router } = require("express");
const { fetchRequests, requestDonation, deleteRequest, reviewRequest } = require("../services/requestDonationService.js");

const router =Router();

router.get('/', fetchRequests);
router.post('/new', requestDonation);
router.get('/remove/:id', deleteRequest);
router.get('/:id', fetchRequests);
router.put('/:id', reviewRequest);

module.exports =router;