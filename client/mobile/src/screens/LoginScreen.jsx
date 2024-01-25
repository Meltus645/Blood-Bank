import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import {  FormComponent } from '../components';
import { AuthContext } from '../context/AuthContext';
import { loginUser } from '../services/user-service';
import { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const {setIsAuth} =useContext(AuthContext);
  const navigation =useNavigation();
  const fields =[
    {type: 'text', name: 'email', label: 'Email', placeholder: 'Enter Email', rules: {
      required: {
        value: true,
        message: "Email required*"
      }
    }},
    {type: 'password', name: 'password', label: 'Password', placeholder: 'Enter Password', rules: {
      required: {
        value: true,
        message: "Password required*"
      }
    }},
  ];

  const login_user =async ({email, password}) =>{
    const {status, session, message} =await loginUser({email, password});
    if(status ==200 && session){
      await AsyncStorage.setItem('session',JSON.stringify({...session, isAuth: true}));
      setIsAuth(true);
    }else Alert.alert("User Login", message || "Unknown error. Unable to login");
  }
  return (
      <View style ={{flex: 1, flexDirection: 'column', backgroundColor: '#89190fa4'}}>
          <StatusBar style ="light"/>
          <View style ={{height: 150, justifyContent: 'center', alignItems: 'center'}}>
            <Text style ={{color: 'white', fontWeight: 'bold', textTransform: 'uppercase', fontSize: 25, paddingTop: 25}}>User Login</Text>
          </View>
            <FormComponent fields={fields} action='login' title={'Welcome Back'} onSubmit={login_user}>
              <View style ={{...tailwind`py-3 items-center`, gap: 5, flexDirection: 'row'}}>
                  <Text style ={{...tailwind`text-lg`, color: '#333333'}}>New to the app?</Text>
                  <TouchableOpacity ><Text  style ={{...tailwind`text-lg font-bold`, color: '#89190fa4'}} onPress={() =>navigation.navigate('Register')}>Register</Text></TouchableOpacity>
              </View>
            </FormComponent>
      </View>

  )
}

export default LoginScreen;