import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { AuthContext } from './src/context/AuthContext';
import { NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DashboardScreen, LogoutScreen, LoginScreen, RegisterScreen, NotificationsScreen, DonorsScreen, ProfileScreen } from './src/screens';

const Tabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App =() =>{
  const [isAuth, setIsAuth] =useState(false);
  const [userId, setUserId] =useState(null);
  const [username, setUsername] =useState(null);
  useEffect(() =>{
    (async () =>{
      const session =JSON.parse(await AsyncStorage.getItem('session'));
      setIsAuth(session?.isAuth || false);
      setUserId(session?._id);
      setUsername(`${session?.first_name} ${session?.last_name}`)
    })();
  }, [isAuth]);
  return (
    <AuthContext.Provider value={{isAuth, setIsAuth, userId, setUserId, username, setUsername}}>
      <NavigationContainer>
        {isAuth?(
          <Tabs.Navigator screenOptions ={{headerShown: false,  tabBarShowLabel: false, tabBarStyle: { position: 'absolute', bottom: 0, left: 0, right: 0, elevation: 0, backgroundColor: '#f1f1f1' }}}>
          <Tabs.Screen name='Dashboard' component={DashboardScreen} options={{
            tabBarIcon: (({focused}) =>(<View style ={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome name="home" size={20} color={focused? '#89190fa4': '#888888'}/>
              <Text style ={{fontSize: 12, color: focused? '#89190fa4': '#888888'}}>Home</Text>
            </View>))
          }}/>
          <Tabs.Screen name='Profile' component={ProfileScreen} options={{
            tabBarIcon: (({focused}) =>(<View style ={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome name="user-circle-o" size={20} color={focused? '#89190fa4': '#888888'}/>
              <Text style ={{fontSize: 12, color: focused? '#89190fa4': '#888888'}}>Profile</Text>
            </View>))
          }}/>
          <Tabs.Screen name='History' component={DonorsScreen} options={{
            tabBarIcon: (({focused}) =>(<View style ={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome name="users" size={20} color={focused? '#89190fa4': '#888888'}/>
              <Text style ={{fontSize: 12, color: focused? '#89190fa4': '#888888'}}>Donors</Text>
            </View>))
          }}/>
          <Tabs.Screen name='Notifications' component={NotificationsScreen} options={{
            tabBarIcon: (({focused}) =>(<View style ={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome name="bell" size={20} color={focused? '#89190fa4': '#888888'}/>
              <Text style ={{fontSize: 12, color: focused? '#89190fa4': '#888888'}}>Notifications</Text>
            </View>))
          }}/>
          
          <Tabs.Screen name='Logout' component={LogoutScreen} options={{
            tabBarIcon: (({focused}) =>(<View style ={{alignItems: 'center', justifyContent: 'center'}}>
              <FontAwesome name="sign-out" size={20} color={focused? '#89190fa4': '#888888'}/>
              <Text style ={{fontSize: 12, color: focused? '#89190fa4': '#888888'}}>Logout</Text>
            </View>))
          }}/>
      </Tabs.Navigator>
        ): (
          <Stack.Navigator screenOptions ={{headerShown: false}}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      
    </AuthContext.Provider>
  );
}

export default App;