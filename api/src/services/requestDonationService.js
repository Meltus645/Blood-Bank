const NotificationModel = require('../models/notificationsModel.js');
const DonationRequestModel = require('../models/donationRequestModel.js');

const { HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } = require('../utils/htpp_status_codes.js');

async function requestDonation(req, res){
    const {patient, urgency, bloodType} =req.body;
    const newRequest =new DonationRequestModel({patient, urgency, bloodType});
    const newNotification =new NotificationModel({user: patient, body: 'Request received'});
    try {
        await newRequest.save();
        try { await newNotification.save();} 
        catch ({message}) { console.log(message);}
        return res.status(HTTP_201_CREATED).json({message: 'Request received'})
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message})
    }
}


async function reviewRequest(req, res){
    const {id} =req.params
    const {status} =req.body;
    try{
        const requestFound =await DonationRequestModel.findById(id);
        if(requestFound){
            requestFound.status =status;
            const newNotification =new NotificationModel({user: requestFound.patient, body: `Request ${status}`});
            try {
                await requestFound.save();
                try { await newNotification.save();} 
                catch ({message}) { console.log(message);}
                return res.status(HTTP_200_OK).json({message: `Request ${status}`})
                
            } catch ({message}) {
                return res.status(HTTP_400_BAD_REQUEST).json({message});
            }
        }
    }catch({message}){
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
    
}

async function fetchRequests(req, res){
    const {id} =req.params
    try {
        if(id){
            const don_req =await DonationRequestModel.findById(id).populate('patient');
            if(don_req){
                return res.status(HTTP_200_OK).json(don_req);
            }else {
                return res.status(HTTP_404_NOT_FOUND).json({message: 'Donation request with id not found'});
            }
        }
        const donationRequests =await DonationRequestModel.find().populate('patient');
        return res.status(HTTP_200_OK).json(donationRequests);
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function deleteRequest(req, res){
    const {id} =req.params
    try {
        if(id){
            await DonationRequestModel.findByIdAndDelete(id);
            return res.status(HTTP_200_OK).json({message: 'Request removed successfully'});
        }else{
            return res.status(HTTP_400_BAD_REQUEST).json({message: "Could not find ID"});
        }
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

module.exports ={
    requestDonation, reviewRequest,
    deleteRequest, fetchRequests,
};