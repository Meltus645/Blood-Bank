import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { useContext, useEffect, useState } from 'react';
import { DonorsCardComponent, Search } from '../components';
import { fetch_donors } from '../services/user-service';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';

const DonorsScreen = () => {
  const {username, userId} =useContext(AuthContext)
  const [donors, setDonors] =useState([]);
  const [fetchedDonors, setFetchedDonors] =useState([]);
  const [filter, setFilter] =useState(null);
  const [refreshing, setRefreshing] =useState(false);
  const title ="all donors".toUpperCase();
  const load_donors =() =>{
    (async ()=>{
      const {status, data} =await fetch_donors();
      if(status ==200){
            const result =[...data].filter(donor =>donor._id !=userId).map(({_id, first_name, last_name, blood_type: {bloodGroup, rhesusFactor}, contact_details: {location, email}, profile_photo }) =>{
            return {id: _id, location, email, name: `${first_name} ${last_name}`, profile: profile_photo, bloodGroup: `${bloodGroup}${rhesusFactor}`}
        });
        setDonors(result);
        setFetchedDonors(result);
      }
    })();
  }
  useEffect(() =>{
    load_donors();
  }, []);
  return (
    <View style ={{flex: 1, backgroundColor: '#f1f1f1', paddingBottom: 50}}>
        <StatusBar style='light'/>
        <View style ={{height: 30, backgroundColor: '#89190fa4'}}/>
          <View style ={{...tailwind`px-4 pb-4 pt-8 gap-2`}}>
            <Text style ={{...tailwind`uppercase text-lg`, color: '#444444', fontWeight: 'bold', fontWeight:'bold'}}>{username}</Text>
          </View>
        <View style ={{...tailwind`px-4 gap-2`}}>
            <Search setRelated={setFilter} data={[...fetchedDonors]} placeholder='Search donors' setResults={setDonors} searchFields={['name', 'bloodGroup', 'location']}/>
            <Text style ={{...tailwind`text-xl py-4`, fontWeight: 'bold', alignSelf: 'flex-start', color: '#444444'}}>{filter || title}</Text>
        </View>
        {
          donors.length?(<FlatList data ={donors} refreshing ={refreshing} onRefresh={() =>{
            setRefreshing(true);
            load_donors();
            setRefreshing(false)
          }} renderItem={({item}) =>(<DonorsCardComponent id={item.id} email={item.email} name={item.name} profile={item.profile} location={item.location} bloodGroup={item.bloodGroup}/>)}/>):
          (<View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style ={{color: 'gray'}}>Donors will be listed here</Text>
            </View>)

        }
    </View>
  )
}

export default DonorsScreen;