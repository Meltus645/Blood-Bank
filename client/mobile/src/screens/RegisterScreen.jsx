import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import {  FormComponent } from '../components';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { createUser } from '../services/user-service';

const userDetails ={};

const RegisterScreen = () => {
  const navigation =useNavigation();
  const [rf, setRF] =useState('+');
  const [bg, setBG] =useState('A');
  const formFields ={

    'bio': [
      {type: 'text', name: 'first_name', label: 'First Name', placeholder: 'Enter first name', rules: {
        required: {
          value: true,
          message: "First name required*",
        }
      }},
      {type: 'text', name: 'last_name', label: 'Last Name', placeholder: 'Enter last name', rules: {
        required: {
          value: true,
          message: "Last name required*",
        }
      }},
    ],

    'contact': [
      {type: 'text', name: 'email', label: 'Email', placeholder: 'Enter Email', rules: {
        required: {
          value: true,
          message: "Email required*",
        }
      }},
      {type: 'text', name: 'location', label: 'Location', placeholder: 'Enter your location', rules: {
        required: {
          value: true,
          message: "Location required*",
        }
      }},
    ],

    'blood_type': [
      {type: 'select', onSelect: setBG, selected: bg, options: [{key: 'A', value: 'A'}, {key: 'B', value: 'B'}, {key: 'O', value: 'O'}, {key: 'AB', value: 'AB'}], name: 'bloodGroup', label: 'Blood Group', placeholder: 'Select Blood Group', rules: {
        required: {
          value: true,
          message: "Blood group required*",
        }
      }},
      {type: 'select', options: [{key: '+', value: '+'}, {key: '-', value: '-'}], onSelect: setRF, selected: rf, name: 'rhesusFactor', label: 'Rhesus Factor', placeholder: 'Select Rhesus Factor', rules: {
        required: {
          value: true,
          message: "Rhesus factor required*",
        }
      }},
    ],
    'login': [
      {type: 'password', name: 'password', label: 'Password', placeholder: 'Enter password', rules: {
        required: {
          value: true,
          message: "Password required*",
        }
      }},
      {type: 'password', name: 'cpassword', label: 'Confirm Password', placeholder: 'Confirm password',},
    ]
  };
  
  const [stage, setStage] =useState(0);
  const [action, setAction] =useState('next');
  const [section, setSection] =useState([...Object.keys(formFields)].at(stage));
  const [fields, setFields] =useState(formFields[section]);
  const stages =[...Object.keys(formFields)].length;
  

  useEffect(() =>{
      setSection([...Object.keys(formFields)].at(stage));
      setFields(formFields[section]);
      if(stage == stages-1) setAction('register');
      else setAction('next');
  }, [stage, section, action]);

  const handleSubmission =async details =>{
    if(stage >=stages) return;
    if(details){
      const submission ={};
      [...formFields[section]].map(({name}) =>submission[name] =details[name]);
      userDetails[section] =submission;
    }
    if(stage <stages-1) setStage(prev =>prev+1);
    else{
      delete userDetails[section].cpassword;
      const {status, message} =await createUser(userDetails);
      if(status ==201) navigation.navigate('Login');
      else Alert.alert("User Registration", message);
    }
  }

  const toTitleCase =str =>{
    let str_converted =[...str.split("_")].map(s =>`${s[0].toUpperCase()}${s.slice(1,).toLowerCase()}`).join(" ");
    return [...str_converted.split(" ")].map(s =>`${s[0].toUpperCase()}${s.slice(1,).toLowerCase()}`).join(" ")
  }

  return (
      <View style ={{flex: 1, flexDirection: 'column', backgroundColor: '#89190fa4'}}>
          <StatusBar style ="light"/>
          <View style ={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
            <Text style ={{color: 'white', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 25, paddingTop: 25}}>User Registration</Text>
          </View>
            <FormComponent fields={ fields} action={action} title={`${toTitleCase(section)} Details`} onSubmit={handleSubmission}>
              <View style ={{...tailwind`py-3 items-center`, gap: 5, flexDirection: 'row'}}>
                  <Text style ={{...tailwind`text-lg`, color: '#333333'}}>Already user?</Text>
                  <TouchableOpacity ><Text  style ={{...tailwind`text-lg font-bold`, color: '#89190fa4'}} onPress={() =>navigation.navigate('Login')}>Login</Text></TouchableOpacity>
              </View>
             </FormComponent>
      </View>
  )
}

export default RegisterScreen;