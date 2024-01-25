import tailwind from 'twrnc';
import { View, Text, FlatList } from 'react-native'
import { useContext, useEffect, useState } from 'react';
import { fetch_my_appointments } from '../services/appointments-service';
import { AuthContext } from '../context/AuthContext';

const Appointments = () => {
  const {userId} =useContext(AuthContext);
  const [appointments, setAppointments] =useState([])
  const load_appointments =() =>{
    (async ()=>{
      const {status,  data} =await fetch_my_appointments(userId);
      if(status ==200){
        const records =[...data].map(({reason, status, date_set, center: {name}, }) =>{
          const date =new Date(date_set)
          const date_str =date.getFullYear()+ `-${date.getMonth()+1 <10? '0'+date.getMonth()+1: date.getMonth()+1}-`+ `${date.getDate() <10? '0'+date.getDate():date.getDate()}`
          return {reason, status, date_set: date_str, name}
        });
        setAppointments(records);
      }
    })();
  }
  useEffect(() =>{
    load_appointments();
  });
  return (
    <View style ={{flex: 1}}>
      <View style ={{...tailwind`px-4 gap-2 flex flex-row items-center justify-between`,}}>
          <Text style ={{...tailwind`text-xl uppercase`, fontWeight: 'bold', alignSelf: 'flex-start', color: '#444444'}}>Appointments</Text>
        </View>
        {appointments.length? (<FlatList data={appointments} renderItem={({item}) =>(
          <View style={{...tailwind`p-4 gap-2`}}>
          <View style ={{...tailwind`bg-white shadow p-4 rounded gap-4`, flex: 1}}>
            <Text style ={{...tailwind`text-xl font-bold uppercase`, color: '#444'}}>{item.reason}</Text>
            <Text>{item.name}</Text>
            <Text>{item.date_set}</Text>
            <Text style ={{...tailwind`text-xl font-bold uppercase text-white text-center py-2 rounded`, backgroundColor: item.status.toLowerCase() =='pending'? 'gray': item.status.toLowerCase() =='pending'? 'approved': 'red'}}>{item.status}</Text>
          </View>
          </View>
        )}/>)
        :(<View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style ={{color: 'gray'}}>Your appointments will be listed here</Text>
        </View>)}
    </View>
  )
}

export default Appointments;