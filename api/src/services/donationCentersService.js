const DonationCentersModel = require('../models/donationCenterModel.js');
const { HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } = require('../utils/htpp_status_codes.js');

async function registerDonationCenter(req, res){
    const {name, logo, location, operationHours} =req.body;
    const newCenter =new DonationCentersModel({name, logo, location, operationHours});
    try {
        await newCenter.save();
        return res.status(HTTP_201_CREATED).json({data: newCenter.toJSON()})
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function updateDonationCenter(req, res){
    const {id} =req.params
    const {name, logo, location, operationHours} =req.body;
    try {
        await DonationCentersModel.findByIdAndUpdate(id, {_id: id, name, logo, location, operationHours});
        return res.status(HTTP_200_OK).json({message: 'Update successful'})
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function removeDonationCenter(req, res){
    const {id} =req.params
    try {
        await DonationCentersModel.findByIdAndDelete(id);
        return res.status(HTTP_200_OK).json({message: 'Center removed successfully'});
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function getDonationCenters(req, res){
    const {id, filters} =req.params;
    try {
        if(id){
            const donationCenter =await DonationCentersModel.findById(id);
            if(donationCenter){
                return res.status(HTTP_200_OK).json(donationCenter);
            }else {
                return res.status(HTTP_404_NOT_FOUND).json({message: 'Center with id not found'});
            }
        }
        const donationCenters =filters? await DonationCentersModel.find({where: filters}) :await DonationCentersModel.find();
        return res.status(HTTP_200_OK).json(donationCenters);
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}


module.exports ={
    registerDonationCenter, updateDonationCenter,
    removeDonationCenter, getDonationCenters,
};