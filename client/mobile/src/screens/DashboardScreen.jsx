import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { fetch_centers } from '../services/centers-service';
import { AppointmentsComponent, DonationCentersCard, RequestBloodAppointment, Search } from '../components';
import { View, Text, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { fetch_donation_requests } from '../services/donation-request-service';

const DashboardScreen = () => {
  const {username} =useContext(AuthContext)
  const [RAVisible, setRAVisible] =useState(false);
  const [DAVisible, setDAVisible] =useState(false);
  const [DonationCenters, setDonationCenters] =useState([]);
  const [fetchedCenters, setFetchedCenters] =useState([]);
  const [refreshing, setRefreshing] =useState(false);
  const [criticalCases, setCriticalCases] =useState(0);
  const [bankLevel, setBankLevel] =useState('Empty');
  const [filter, setFilter] =useState(null)
  const title ='Donation Centers'.toUpperCase();
  const load_centers =() =>{
    (async ()=>{
      const {status,  data} =await fetch_centers();
      let result =[];
      if(status ==200){
        result =[...data].map(({_id, location, name, logo, operationHours}) =>{
          return {id: _id, location, name, logo, operationHours}});
        }

        setDonationCenters(result);
        setFetchedCenters(result);
    })();
  }
  
  useEffect(() =>{
    load_centers();
  }, []);

  useEffect(() =>{
    (async () =>{
      const req_response =await fetch_donation_requests();
      if(req_response.status ==200) setCriticalCases([...req_response.data].filter(({urgency, status}) =>urgency.toLowerCase() =='critical' && status.toLowerCase() =='pending').length);
      const bb_response =await fetch_donation_requests();
      if(bb_response.status ==200) {
       const bbl =bb_response.data.length;
       if(bbl <=0) setBankLevel('empty');
       else if(bbl <50) setBankLevel('Critical');
       else if(bbl <100) setBankLevel('Low');
       else setBankLevel('Good');
       
      }
      
    })();
  });

  return (
    <View style ={{flex: 1, backgroundColor: '#f1f1f1', paddingBottom: 50}}>
        <StatusBar style='light'/>
        <View style ={{height: 200}}>
          <View style ={{height: 30, backgroundColor: '#89190fa4'}}/>
          <View style ={{...tailwind`px-4 pt-5 gap-2`, flex: 1}}>
              <Text style ={{...tailwind`pb-2 uppercase text-lg`, color: '#555555', fontWeight: 'bold', fontWeight:'bold'}}>{username}</Text>
              <ScrollView showsHorizontalScrollIndicator ={false} horizontal ={true}>
                  <View style ={{...tailwind`gap-4`, flexDirection: 'row'}}>
                      <View style ={{...tailwind`rounded-xl p-5 gap-3`, backgroundColor: '#89190fa4',justifyContent: 'space-between'}}>
                        <Text style ={{...tailwind`text-white text-xl uppercase`, fontWeight: 'bold'}}>{criticalCases}</Text>
                        <Text style ={{...tailwind`text-white text-2xl uppercase`, fontWeight: 'bold'}}>Urgent Cases</Text>
                      </View>
                      <View style ={{...tailwind`rounded-xl p-5 gap-3`, backgroundColor: '#89190fa4',justifyContent: 'space-between'}}>
                        <Text style ={{...tailwind`text-white text-xl uppercase`, fontWeight: 'bold'}}>{bankLevel}</Text>
                        <Text style ={{...tailwind`text-white text-2xl uppercase`, fontWeight: 'bold'}}>Blood Bank Level</Text>
                      </View>
                  </View>
              </ScrollView>
          </View>
        </View>
        <View style ={{...tailwind`px-4 py-2 gap-2`}}>
          <ScrollView showsHorizontalScrollIndicator ={false}>
            <View style ={{...tailwind`py-3 gap-4 w-full`,flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style ={{...tailwind`py-3 px-6 rounded-lg bg-gray-200`}} onPress={() =>setRAVisible(true)}><Text style ={{...tailwind`text-sm`, color: '#555555', fontWeight: 'bold'}}>Request Donation</Text></TouchableOpacity>
            </View>
          </ScrollView>
            <Text style ={{...tailwind`text-xl`, fontWeight: 'bold', alignSelf: 'flex-start', color: '#444444'}}>{filter || title}</Text>
            <Search placeholder='Search facility by: name, location, or time open' data={[...fetchedCenters]} setResults={setDonationCenters} searchFields={['location', 'name', 'operationHours']} setRelated={setFilter}/>
        </View> 
        {DonationCenters.length? (<FlatList refreshing ={refreshing} onRefresh={
          () =>{
            setRefreshing(true);
            load_centers();
            setRefreshing(false);
          }
        } data ={DonationCenters} renderItem={({item}) =>(<DonationCentersCard id={item.id} location={item.location} logo={item.logo} name={item.name} operationHours={item.operationHours}/>)}/>):
        (<View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style ={{color: 'gray'}}>Donation centers will be listed here</Text>
        </View>)
        }
      <RequestBloodAppointment visible ={RAVisible} setVisible={setRAVisible}/>
      <AppointmentsComponent visible ={DAVisible} setVisible={setDAVisible}/>
    </View>
  )
}

export default DashboardScreen;