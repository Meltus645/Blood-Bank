import LOGO from '../../assets/favicon.png';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { View, Text, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = () => {
  const {setIsAuth} =useContext(AuthContext);

  useEffect(() =>{
    (async () =>{
        try {
          const session =JSON.parse(await AsyncStorage.getItem('session'));
          if(session) await AsyncStorage.removeItem('session');
          setIsAuth(false);
        } catch ({message}) {
          Alert.alert("Error", message)
        }
    })()
  }, []);
  return (
    <View style ={{flex: 1, backgroundColor: '#f1f1f1', paddingBottom: 50}}>
        <StatusBar style='light'/>
        <View style ={{height: 30, backgroundColor: '#89190fa4'}}/>
        <View style ={{flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10}}>
          <Image source={LOGO} alt='logo'/>
          <Text style ={{ textAlign: 'center', fontSize: 12}}>Logging off. Please Wait ...</Text>
        </View>
    </View>
  )
}

export default LogoutScreen;