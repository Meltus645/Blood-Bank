import tailwind from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';
import { read_notification } from '../services/notification-service';

const NotificationTileComponent = ({id, body, read =false, onReaload =null}) => {

  const readNotification =async () =>{
    const {status} =read_notification(id);
    if(status ==200 && onReaload) onReaload();
  }

  return (
    <View style ={{...tailwind`py-2 px-4`}}> 
        <View style ={{...tailwind`bg-white p-4 rounded-xl gap-2`, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style ={{fontWeight: read? 'normal': 'bold'}}>{body}</Text>
          {!read &&(<TouchableOpacity style ={{...tailwind`rounded-full`, alignItems: 'center', justifyContent:'center' , backgroundColor: '#89190fa4', width: 24, height: 24}} onPress={readNotification}>
            <FontAwesome name="eye" size={10} color='white'/>
          </TouchableOpacity>)}
        </View>
    </View>
    )
}

export default NotificationTileComponent;