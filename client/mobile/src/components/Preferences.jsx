import tailwind from 'twrnc';
import { useState, useEffect } from 'react';
import FormComponent from './FormComponent';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { fetch_centers } from '../services/centers-service';

const Prefences = () => {
  
  useEffect(() =>{
    (async ()=>{
      const {status,  data} =await fetch_centers();
      let result =[];
      if(status ==200){
        result =[...data].map(({name}) =>{
          return {key: name, value: name}});
        }
        setCenters(result);
    })();
  }, []);
  const [switchOn, setSwitchOn] =useState(false);
  const [donationCenter, setDonationCenter] =useState('');
  const [centers, setCenters] =useState([]);
  const [donationFreq, setDonationFreq] =useState(1);
  const fields =[
    {name: 'receive_notifications', type: 'switch', label: "Receive Notifications", switchOn, setSwitchOn},
    {name: "donation_center", placeholder: "--- select center ---", label: "Prefered Center", selected: donationCenter, onSelect: setDonationCenter, options:centers, type: 'select',},
    {name: "donation_frequency", placeholder: "select option", label: "Anual Donations", selected: donationFreq, onSelect: setDonationFreq, options:[
      {key: '1', value: 1},
      {key: '2', value: 2},
      {key: '3', value: 3},
      {key: '4', value: 4},
      {key: '5', value: 5},
      {key: '6', value: 6},
    ], type: 'select'},
  ];

  const savePreferences =async values =>{
    
  }
  return (
    <View style ={{flex: 1}}>
      <View style ={{...tailwind`px-4 gap-2 flex flex-row items-center justify-between`,}}>
          <Text style ={{...tailwind`text-xl uppercase`, fontWeight: 'bold', alignSelf: 'flex-start', color: '#444444'}}>Preferences</Text>
        </View>
        <ScrollView>
          <FormComponent fields={fields} action='Update' onSubmit={savePreferences}/>
        </ScrollView>
    </View>
  )
}

export default Prefences;