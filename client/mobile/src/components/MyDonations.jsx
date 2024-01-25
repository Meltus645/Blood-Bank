import tailwind from 'twrnc';
import { useEffect, useState } from 'react';
import FormComponent from './FormComponent';
import { FontAwesome } from '@expo/vector-icons';
import { fetch_my_donation_records, save_donation_record } from '../services/user-service';
import { View, Text, FlatList, TouchableOpacity, Modal, SafeAreaView, Alert } from 'react-native';

const MyDonations = ({visible, setVisible, user}) => {
  const [records, setRecords] =useState([]);
  const [showDatePicker, setShowDatePicker] =useState(false);
  const [dateDonatedPlaceholder, setDateDonatedPlaceholder] =useState('When did you donate?');
  const fields =[
    {type: 'number', name: 'quantity', label: 'Units', placeholder: 'How many units did you donate?', rules: {
      required: {
        value: true,
        message: "Quantity of blood donated required*",
      }
    }},

    {type: 'text', name: 'facility', label: 'Facility', placeholder: 'Where were did you donate?', rules: {
      required: {
        value: true,
        message: "Facility required*",
      }
    }},
    {type: 'date', name: 'date_donated', date: new Date(), setPlaceholder: setDateDonatedPlaceholder, label: 'Date', fieldShowing: showDatePicker, setFieldShowing: setShowDatePicker, placeholder: dateDonatedPlaceholder, mode: 'date', rules: {
      required: {
        value: true,
        message: "Diagnosis date required*",
      }
    }},
  ]

  const load_donation_records =() =>{
    (async ()=>{
      const {status,  data} =await fetch_my_donation_records(user);
      
      let result =[];
      if(status ==200){
        result =[...data].map(({facility, quantity, date_donated}) =>{

          const date =new Date(date_donated);
          const date_str =date.getFullYear()+ `-${date.getMonth()+1 <10? '0'+date.getMonth()+1: date.getMonth()+1}-`+ `${date.getDate() <10? '0'+date.getDate():date.getDate()}`
          return {facility, units: quantity, date: date_donated? date_str: null}});
        }
        setRecords(result);
    })();
  }
  useEffect(() =>{
    load_donation_records();
  });
  const saveRecord =async values =>{
    const {status, message} =await save_donation_record(user, values);
    if(status ==200) Alert.alert("Success", message);
    else Alert.alert("Error", message);
  }

  return (
    <>
      <View style ={{flex: 1}}>
        <View style ={{...tailwind`px-4 gap-2 flex flex-row items-center justify-between`,}}>
            <Text style ={{...tailwind`text-xl uppercase`, fontWeight: 'bold', alignSelf: 'flex-start', color: '#444444'}}>My Donations</Text>
    
        </View>
        {records.length? (<FlatList data ={records} renderItem={({item}) =>(
          <View style={{...tailwind`p-4 gap-2`}}>
          <View style ={{...tailwind`bg-white shadow p-4 rounded gap-2`, flex: 1}}>
            <Text style ={{...tailwind`text-xl font-bold uppercase`, color: '#444'}}>{item.units} Units</Text>
            <Text>At {item.facility}</Text>
            {item.date &&(<Text>On {item.date}</Text>)}
          </View>
          </View>
        )}/>):
        (<View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style ={{color: 'gray'}}>Donation history will be displayed here</Text>
        </View>)}
      </View>
      <Modal visible ={visible}>
        <SafeAreaView style ={{flex: 1, backgroundColor: '#f9f9f9', }}>
            <View style ={{paddingBottom: 50, paddingTop: 20, paddingRight: 20, alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() =>setVisible(false)}><FontAwesome name="close" size={24} color={'#888888'} style ={{position: 'relative', right: 0}}/></TouchableOpacity>
            </View>
            <FormComponent fields={fields} title={'New Record'} action='Save record' onSubmit={saveRecord}>
            </FormComponent>
        </SafeAreaView>
    </Modal>
    </>
  )
}

export default MyDonations;