import tailwind from 'twrnc';
import { StatusBar } from 'expo-status-bar';
import { View, Text, FlatList } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect, useState } from 'react';
import { NotificationTileComponent, Search } from '../components';
import { fetch_my_notifications } from '../services/notification-service';

const NotificationsScreen = () => {
  const {username, userId} =useContext(AuthContext)
  const [notifications, setNotifications] =useState([]);
  const [fetchedNotifications, setFetchedNotifications] =useState([]);
  const [filter, setFilter] =useState(null);
  const [refreshing, setRefreshing] =useState(false);
  const title ="All Notifications".toUpperCase();
  const load_notifications =() =>{
    (async ()=>{
      const {status, data} =await fetch_my_notifications(userId);
      if(status ==200){
            const result =[...data].map(({_id, body, is_viewed}) =>{
            return {id: _id, body, read: is_viewed}
        }).sort((a, b) =>!a.read && b.read? -1: a.read && !b.read? 1: 0);
        setNotifications(result);
        setFetchedNotifications(result);
      }
    })();
  }
  useEffect(() =>{
    load_notifications();
  }, []);
  return (
    <View style ={{flex: 1, backgroundColor: '#f1f1f1', paddingBottom: 50}}>
        <StatusBar style='light'/>
        <View style ={{height: 30, backgroundColor: '#89190fa4'}}/>
          <View style ={{...tailwind`px-4 pb-4 pt-8 gap-2`}}>
            <Text style ={{...tailwind`uppercase text-lg`, color: '#444444', fontWeight: 'bold', fontWeight:'bold'}}>{username}</Text>
          </View>
        <View style ={{...tailwind`px-4 gap-2`}}>
            <Search placeholder='Search notifications' data={[...fetchedNotifications]} searchFields={['body']} setResults={setNotifications} setRelated={setFilter}/>
            <Text style ={{...tailwind`text-xl py-4`, fontWeight: 'bold', alignSelf: 'flex-start', color: '#444444'}}>{filter || title}</Text>
        </View>
        {notifications.length? (<FlatList refreshing ={refreshing} onRefresh={
          () =>{
            setRefreshing(true);
            load_notifications();
            setRefreshing(false);
          }
        } data ={notifications} renderItem={({item}) =>(<NotificationTileComponent id={item.id} body={item.body} read ={item.read} onReaload={load_notifications}/>)}/>):
        (<View style ={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style ={{color: 'gray'}}>Notifications will be listed here</Text>
        </View>)
        }
    </View>
  )
}

export default NotificationsScreen;