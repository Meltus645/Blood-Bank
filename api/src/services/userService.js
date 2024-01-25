const UserModel = require('../models/userModel.js');
const { HTTP_200_OK, HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_401_UNAUTHORIZED, HTTP_404_NOT_FOUND, HTTP_409_CONFLICT } = require('../utils/htpp_status_codes.js');

async function loginUser(req, res){
    const {email, password} =req.body;
    const userWithPassword =await UserModel.find({password});
    const userWithEmail =userWithPassword.find(({contact_details}) =>contact_details.email ==email);
    if(!userWithEmail) return res.status(HTTP_401_UNAUTHORIZED).json({message: 'User with email and password not found'})
    const {_id, role, last_name, first_name} =userWithEmail;
    return res.status(HTTP_200_OK).json({session: {_id, role, last_name, first_name, email}});
}

async function registerUser(req, res){
    const {bio, contact, role ='donor', login, blood_type, profile_photo} =req.body;
    const {first_name, last_name} =bio;
    const {password} =login;
    const userModel =new UserModel({first_name, last_name, password, blood_type, contact_details: contact, role, profile_photo});
    try {
        if(await UserModel.findOne({'contact_details.email': contact.email})) return res.status(HTTP_409_CONFLICT).json({message: 'User with email already exist. Please login instead.'})
        await userModel.save();
        return res.status(HTTP_201_CREATED).json({data: userModel.toJSON()});
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function updateUser(req, res){
    const {id} =req.params;
    const {bio, contact, login, blood_type, profile_photo} =req.body;
    const {first_name, last_name} =bio;
    const {password} =login;
    const data ={first_name, last_name, password, blood_type, contact_details: contact, profile_photo};
    try {
        const updated =await UserModel.findByIdAndUpdate(id, data, {new: true});
        if(updated) return res.status(HTTP_200_OK).json({data: updated});
        else return res.status(HTTP_404_NOT_FOUND).json({message: 'Account with Id not found'});
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function saveUserMedicalRecord(req, res){
    const {id} =req.params;
    const {diagnosis, medication, facility, date_diagnosed} =req.body;
    const data ={diagnosis, medication, facility, date_diagnosed};
    try {
        const userFound =await UserModel.findById(id);
        if(userFound){
            userFound.medical_history.push(data);
            await userFound.save();
            return res.status(HTTP_200_OK).json({message: 'Record saved successfully'});
        }
        return res.status(HTTP_404_NOT_FOUND).json({message: 'User with Id not found'});
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function saveUserDonationRecord(req, res){
    const {id} =req.params;
    const {quantity, facility, date_donated} =req.body;
    const data ={quantity, facility, date_donated};
    try {
        const userFound =await UserModel.findById(id);
        if(userFound){
            userFound.donation_history.push(data);
            await userFound.save();
            return res.status(HTTP_200_OK).json({message: 'Record saved successfully'});
        }
        return res.status(HTTP_404_NOT_FOUND).json({message: 'User with Id not found'});
    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function getDonors(req, res){
    try {
        const donors =await UserModel.find({role: 'donor'});
        return res.status(HTTP_200_OK).json(donors);

    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

async function getUserByID(req, res){
    try {
        const {id, field} =req.params;
        const user =await UserModel.findById(id,);
        if(user) return res.status(HTTP_200_OK).json(field? user[field]: user);
        return res.status(HTTP_404_NOT_FOUND).json({message: 'User with ID not found'});

    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}


async function deleteUser(req, res){
    try {
        const {id} =req.params;
        await UserModel.findByIdAndDelete(id);
        return res.status(HTTP_200_OK).json({message: 'User removed successfully'});

    } catch ({message}) {
        return res.status(HTTP_400_BAD_REQUEST).json({message});
    }
}

module.exports ={
    loginUser, registerUser, getDonors, saveUserDonationRecord,
    deleteUser, getUserByID, updateUser, saveUserMedicalRecord,
};