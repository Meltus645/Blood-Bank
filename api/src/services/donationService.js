const DonationModel = require('../models/donationModel.js');
const { HTTP_200_OK, HTTP_201_CREATED, HTTP_204_NO_CONTENT, HTTP_400_BAD_REQUEST, HTTP_404_NOT_FOUND } = require('../utils/htpp_status_codes.js');

async function newDonation(req, res){
    const {units, donor, center, donated_on, expires_after} =req.body;
    const newDonation =new DonationModel({units, donor, donated_on, center, expires_after});
    try {
        await newDonation.save();
        return res.status(HTTP_201_CREATED).json({data: newDonation.toJSON()})
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message})
    }
}

async function updateDonation(req, res){
    const {id} =req.params
    const {units, donor, center, donated_on, expires_after} =req.body;
    try {
        await DonationModel.findByIdAndUpdate(id, {units, donor, center, donated_on, expires_after});
        return res.status(HTTP_200_OK).json({message: 'Update successful'})
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function removeDonation(req, res){
    const {id} =req.params
    try {
        await DonationModel.findByIdAndRemove(id);
        return res.status(HTTP_204_NO_CONTENT)
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}
async function getDonations(req, res){
    const {id} =req.params
    try {
        if(id){
            const donation =await DonationModel.findById(id);
            if(donation){
                return res.status(HTTP_200_OK).json(donation);
            }else {
                return res.status(HTTP_404_NOT_FOUND).json({message: 'Donor with id not found'});
            }
        }
        const donations =await DonationModel.find();
        return res.status(HTTP_200_OK).json(donations);
        
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

module.exports ={
    newDonation, updateDonation,
    removeDonation, getDonations,
};