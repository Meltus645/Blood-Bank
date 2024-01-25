const { Router }  =require('express');
const {getAppointments, createAppointment, reviewAppointment, getUserAppointments} =require('../services/AppointmentService.js');

const router =Router();

router.get('/',  getAppointments);
router.get('/user-appointments/:id',  getUserAppointments);
router.post('/new',  createAppointment);
router.put('/review/:id',  reviewAppointment);

module.exports =router;