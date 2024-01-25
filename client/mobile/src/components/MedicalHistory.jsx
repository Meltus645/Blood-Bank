import tailwind from 'twrnc';
import { useState, useEffect } from 'react';
import FormComponent from './FormComponent';
import { FontAwesome } from '@expo/vector-icons';
import { fetch_my_medical_records, save_medical_record } from '../services/user-service';
import { View, Text, Alert, FlatList, TouchableOpacity, Modal, SafeAreaView } from 'react-native';

const MedicalHistory = ({visible, setVisible, user}) => {
  const [records, setRecords] =useState([]);
  const [showDatePicker, setShowDatePicker] =useState(false);
  const [dateDiagnosedPlaceholder, setDateDiagnosedPlaceholder] =useState('When were you diagnosed?');
  const fields =[
    {type: 'text', name: 'diagnosis', label: 'Diagnosis', placeholder: 'What were you diagnised with?', rules: {
      required: {
        value: true,
        message: "Diagnosis required*",
      }
    }},
    {type: 'text', name: 'medication', label: 'Medication', placeholder: 'Which medication were you prescribed?', rules: {
      required: {
        value: true,
        message: "Medication required*",
      }
    }},
    {type: 'text', name: 'facility', label: 'Facility', placeholder: 'Where were you diagnised?', rules: {
      required: {
        value: true,
        message: "Facility required*",
      }
    }},
    {type: 'date', name: 'date_diagnosed', date: new Date(), setPlaceholder: setDateDiagnosedPlaceholder, label: 'Date', fieldShowing: showDatePicker, setFieldShowing: setShowDatePicker, placeholder: dateDiagnosedPlaceholder, mode: 'date', rules: {
      required: {
        value: true,
        message: "Donation date required*",
      }
    }},
  ]

  const load_medical_records =() =>{
    (async ()=>{
      const {status, data} =await fetch_my_medical_records(user);
      
      let result =[];
      if(status ==200){
        result =[...data].map(({facility, diagnosis, medication, date_diagnosed}) =>{
          const date =new Date(date_diagnosed);
          const date_str =date.getFullYear()+ `-${date.getMonth()+1 <10? '0'+date.getMonth()+1: date.getMonth()+1}-`+ `${date.getDate() <10? '0'+date.getDate():date.getDate()}`
          return {facility, diagnosis, medication,  date: date_diagnosed? date_str: null}});
        }
        setRecords(result);
    })();
  }
  const saveRecord =async values =>{
    const {status, message} =await save_medical_record(user, values);
    if(status ==200) Alert.alert("Success", message);
    else Alert.alert("Error", message);
  }

  useEffect(() =>{
    load_medical_records();
  });

  return (
    <>
    <View style ={{flex: 1}}>
      <View style ={{...tailwind`px-4 gap-2 flex flex-row items-center justify-between`,}}>
          <Text style ={{...tailwind`text-xl uppercase`, fontWeight: 'bold', alignSelf: 'flex-start', color: '#444444'}}>Medical History</Text>
        </View>
        {records.length? (<FlatList data ={records} renderItem={({item}) =>(
          <View style={{...tailwind`p-4 gap-2`}}>
          <View style ={{...tailwind`bg-white shadow p-4 rounded gap-2`, flex: 1}}>
            <Text style ={{...tailwind`text-xl font-bold uppercase`, color: '#444'}}>{item.diagnosis}</Text>
            <Text>At {item.facility}</Text>
            {item.medication &&(<Text>Prescribed {item.medication}</Text>)}
            {item.date &&(<Text>On {item.date}</Text>)}
          </View>
          </View>
        )}/>):
        (<View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style ={{color: 'gray'}}>Medical history will be displayed here</Text>
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

export default MedicalHistory;