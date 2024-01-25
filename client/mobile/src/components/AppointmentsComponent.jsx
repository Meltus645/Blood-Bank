import FormComponent from './FormComponent';
import { useContext, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { create_appointment } from '../services/appointments-service';
import { View, Alert, Modal, SafeAreaView, TouchableOpacity } from 'react-native';

const AppointmentsComponent = ({visible =false, setVisible, center}) => {  
    const [showDatePicker, setShowDatePicker] =useState(false);
    const [datesetPlaceholder, setDatesetPlaceholder] =useState("Date of appointment")
    const {userId} =useContext(AuthContext);
    const fields =[
        {name: "date_set", placeholder: datesetPlaceholder, setPlaceholder: setDatesetPlaceholder, mode: 'date', label: "Date", fieldShowing: showDatePicker, setFieldShowing: setShowDatePicker, date: new Date(), type: 'date', rules: {
            required: {
                value: true, 
                message: "Date of appointment required*"
            }
        }}
    ]
    const book_appointment =async values =>{
        const data ={...values, center, client: userId, reason: 'Blood Donation'};
        const {status, message} =await create_appointment(data);
        if(status ==201) Alert.alert("Success", message);
        else Alert.alert("Error", message);
        setVisible(false);
    }

    return (
    <Modal visible ={visible}>
        <SafeAreaView style ={{flex: 1, backgroundColor: '#f9f9f9', }}>
            <View style ={{paddingBottom: 50, paddingTop: 20, paddingRight: 20, alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() =>setVisible(false)}><FontAwesome name="close" size={24} color={'#888888'} style ={{position: 'relative', right: 0}}/></TouchableOpacity>
            </View>
            <FormComponent fields={fields} title={'Appointment'} action='book appointment' onSubmit={book_appointment}>
            </FormComponent>
        </SafeAreaView>
    </Modal>
    )
}

export default AppointmentsComponent;