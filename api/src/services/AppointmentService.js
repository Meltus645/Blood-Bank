const AppointmentsModel = require('../models/appointmentModel.js');
const NotificationModel = require('../models/notificationsModel.js');
const { HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } =require('../utils/htpp_status_codes.js');


async function createAppointment(req, res){
    const {center, client, date_set, reason} =req.body;
    const newAppointment =new AppointmentsModel({center, client, date_set, reason})
    try {
        await newAppointment.save()
        return res.status(HTTP_201_CREATED).json({message: 'Appointment received successfully'});
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message})
    }
        
}

async function getAppointments(req, res){
    try {
        const appointments =await AppointmentsModel.find().populate('client').populate('center');
        return res.status(HTTP_200_OK).json(appointments);
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message})
    }
        
}

async function getUserAppointments(req, res){
    const {id} =req.params;
    try {
        const appointments =await AppointmentsModel.find({client: id}).populate('center');
        return res.status(HTTP_200_OK).json(appointments);
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message})
    }
        
}

async function reviewAppointment(req, res){
    const {status} =req.body;
    const {id} =req.params; 
    try {
        const appointment =await AppointmentsModel.findById(id); // approved, rejected , {status}
        if(appointment){
            const newNotification =new NotificationModel({user: appointment.client, body: `Appointment ${status}`});
            appointment.status =status;
            try { 
                await appointment.save()
                await newNotification.save();
            }catch ({message}) { console.log(message);}
            return res.status(HTTP_200_OK).json({message: `Appointment ${status}`});
        }
        return res.status(HTTP_404_NOT_FOUND).json({message: 'appointment not found'});
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message})
    }
        
}

module.exports ={
    createAppointment, getAppointments, 
    reviewAppointment, getUserAppointments,
}