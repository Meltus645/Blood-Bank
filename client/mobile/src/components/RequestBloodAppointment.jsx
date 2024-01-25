import FormComponent from './FormComponent';
import { useContext, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { View, Modal, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { requestDonation } from '../services/donation-request-service';


const AppointmentsComponent = ({visible =false, setVisible}) => {
    const [urgency, setUrgency] =useState('normal');
    const [bloodType, setBloodType] =useState('O+');
    const {userId} =useContext(AuthContext);
    const fields =[
        {name: "urgency", placeholder: "Enter request urgency", label: "Urgency", type: 'select', options: [
            {key: 'Low', value: 'Low'},
            {key: 'Normal', value: 'Normal'},
            {key: 'Critical', value: 'Critical'},
        ], onSelect: setUrgency, selected: urgency, rules: {
            required: {
                value: true, 
                message: "Please select urgency*",
            }
        }},
        
        {name: "bloodType", placeholder: "Select blood type", label: "Blood Type", selected: bloodType, onSelect: setBloodType, options: [
            {key: 'A+', value: 'A+'},
            {key: 'A-', value: 'A-'},
            {key: 'AB+', value: 'AB+'},
            {key: 'AB-', value: 'AB-'},
            {key: 'B+', value: 'B+'},
            {key: 'B-', value: 'B-'},
            {key: 'O+', value: 'O+'},
            {key: 'O-', value: 'O-'},
        ], type: 'select', rules: {
            required: {
                value: true, 
                message: "Please select blood type*",
            }
        }},
    ]
    const request_donation =async values =>{
        const data ={...values, patient: userId};
        const {status, message} =await requestDonation(data);
        if(status ==201) Alert.alert("Success", message);
        else Alert.alert("Error", message),
        setVisible(prev =>!prev);
    }

    return (
    <Modal visible ={visible}>
        <SafeAreaView style ={{flex: 1, backgroundColor: '#f9f9f9', }}>
            <View style ={{paddingBottom: 50, paddingTop: 20, paddingRight: 20, alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() =>setVisible(false)}><FontAwesome name="close" size={24} color={'#888888'} style ={{position: 'relative', right: 0}}/></TouchableOpacity>
            </View>
            <FormComponent fields={fields} title={'Request Donation'} action='Request' onSubmit={request_donation}>
            </FormComponent>
        </SafeAreaView>
    </Modal>
    )
}

export default AppointmentsComponent;