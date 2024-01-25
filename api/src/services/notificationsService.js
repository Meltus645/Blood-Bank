const NotificationsModel = require('../models/notificationsModel.js');
const { HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } = require('../utils/htpp_status_codes.js');

async function notifyUser(req, res){
    const {body, user} =req.body;
    const newCenter =new NotificationsModel({body, user});
    try {
        await newCenter.save();
        return res.status(HTTP_201_CREATED).json({message: 'created'})
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message})
    }
}

async function readNotification(req, res){
    const {id} =req.params;
    try {
        await NotificationsModel.findByIdAndUpdate(id, {is_viewed: true});
        return res.status(HTTP_200_OK).json({message: 'Notification Viewed'})
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function getUserNotifications(req, res){
    const {id} =req.params
    try {
        const notifications =await NotificationsModel.find({user: id});
        return res.status(HTTP_200_OK).json(notifications)
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function getNotification(req, res){
    const {id} =req.params;
    try {
        const notification =await NotificationsModel.findById(id);
        if(notification){
            return res.status(HTTP_200_OK).json(notification);
        }
        return res.status(HTTP_404_NOT_FOUND).json({message: 'Notification with id not found'});
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

module.exports ={
    notifyUser, readNotification, 
    getUserNotifications, getNotification,
};