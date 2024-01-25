import tailwind from 'twrnc';
import { useContext, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Prefences from '../components/Preferences';
import MyDonations from '../components/MyDonations';
import { AuthContext } from '../context/AuthContext';
import { View, Text, TouchableOpacity } from 'react-native';
import Appointments from '../components/Appointments';
import MedicalHistory from '../components/MedicalHistory';

const ProfileScreen = () => {
  const {username, userId} =useContext(AuthContext);
  const [showMedicalForm, setShowMedicalForm] =useState(false);
  const [showDonationForm, setShowDonationForm] =useState(false);
  return (
    <View style ={{flex: 1, backgroundColor: '#f1f1f1', paddingBottom: 50}}>
        <StatusBar style='light'/>
        <View style ={{height: 30, backgroundColor: '#89190fa4'}}/>
          <View style ={{...tailwind`px-4 pt-8 gap-2`}}>
            <Text style ={{...tailwind`uppercase text-lg`, color: '#444444', fontWeight: 'bold', fontWeight:'bold'}}>{username}</Text>
          </View>
          <View style ={{...tailwind`py-5 px-4 gap-4 w-full`,flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style ={{...tailwind`py-3 px-6 rounded-lg bg-gray-200`}} onPress={() =>setShowMedicalForm(true)}><Text style ={{...tailwind`text-sm`, color: '#444',  fontWeight: 'bold'}}>Medical +</Text></TouchableOpacity>
              <TouchableOpacity style ={{...tailwind`py-3 px-6 rounded-lg bg-gray-200`}} onPress={() =>setShowDonationForm(true)}><Text style ={{...tailwind`text-sm`, color: '#444', fontWeight: 'bold'}}>Donation +</Text></TouchableOpacity>
            </View>
            <MedicalHistory visible={showMedicalForm} setVisible={setShowMedicalForm} user={userId}/>
            <MyDonations visible={showDonationForm} setVisible={setShowDonationForm} user={userId}/>
            <Prefences />
            <Appointments />
      </View>
  )
}

export default ProfileScreen;