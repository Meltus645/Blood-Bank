import tailwind from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import AppointmentsComponent from './AppointmentsComponent';
import { useState } from 'react';

const DonationCentersCard = ({id, logo, name, location, operationHours}) => {
  const [modalVisible, setModalVisible] =useState(false);
  
  return (
    <View style ={{...tailwind`p-4 gap-2`}}>
      <View style ={{...tailwind`bg-white rounded shadow p-4 gap-4`}}>
        <View style ={{...tailwind`gap-4` ,flexDirection: 'row', alignItems: 'center'}}>
          <Image source={{uri: logo}} alt={`${name} logo`} height={32} width={32}/>
          <View style ={{...tailwind`gap-4`}}>
            <Text style ={{...tailwind`text-lg uppercase`, fontWeight: 'bold'}}>{name}</Text>
            <View style ={{ ...tailwind`gap-1`,alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              <View style ={{...tailwind`gap-2` ,flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name='map-marker' size={14} color={'#777777'}/>
                <Text style ={{...tailwind`text-sm`, color:'#777777'}}>{location}</Text>
              </View>
              <View style ={{...tailwind`gap-2`, flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name='clock-o' size={12} color={'#777777'}/>
                <Text style ={{...tailwind`text-sm`, color:'#777777'}}>{operationHours}</Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity style ={{...tailwind`rounded`, backgroundColor: '#89190fa4', paddingHorizontal: 20, paddingVertical: 10}} onPress={() =>setModalVisible(true)}>
          <Text style ={{...tailwind`text-center text-white uppercase text-lg`, fontWeight: 'bold'}}>Schedule Donation</Text>
        </TouchableOpacity>

      </View>
      <AppointmentsComponent visible ={modalVisible} setVisible={setModalVisible} center={id}/>
    </View>
  )
}

export default DonationCentersCard;