import tailwind from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image, Linking, Share } from 'react-native';
import AVATAR from '../assets/img/avatar.png';

const DonorsCard = ({id, profile, name, location, bloodGroup, email}) => {
  return (
    <View style ={{...tailwind`p-4 gap-2`}}>
      <View style ={{...tailwind`bg-white rounded shadow p-4 gap-4`}}>
        <View style ={{...tailwind`gap-4` ,flexDirection: 'row', alignItems: 'center'}}>
          <View style ={{...tailwind`rounded-full`, height: 64, width: 64, overflow: 'hidden', justifyContent: 'center', alignItems: 'center'}}>
            <Image source={profile?{uri: profile}: AVATAR} alt={`${name} image`} height={64} width={64} style ={{objectFit: 'contain'}}/>
          </View>
          <View style ={{...tailwind`gap-4`}}>
            <Text style ={{...tailwind`text-lg uppercase`, fontWeight: 'bold'}}>{name}</Text>
            <View style ={{ ...tailwind`gap-1`,alignItems: 'flex-start', justifyContent: 'flex-start'}}>
              <View style ={{...tailwind`gap-2` ,flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name='map-marker' size={14} color={'#777777'}/>
                <Text style ={{...tailwind`text-sm`, color:'#777777'}}>{location}</Text>
              </View>
              <View style ={{...tailwind`gap-2`, flexDirection: 'row', alignItems: 'center'}}>
                <FontAwesome name='plus-circle' size={12} color={'#777777'}/>
                <Text style ={{...tailwind`text-sm`, color:'#777777'}}>{bloodGroup}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style ={{gap: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <TouchableOpacity style ={{...tailwind`rounded`, backgroundColor: '#89190fa4', paddingHorizontal: 20, paddingVertical: 10, flex: 1, justifyContent: 'center', alignItems: 'center',}}
            onPress={() =>Linking.openURL(`mailto:${email}?Subject=Urgent%20Request%20for%20Blood%20Donation%3A%20Your%20Help%20Can%20Save%20a%20Life
            `)}
          >
          <FontAwesome name='envelope' size={20} color='white'/>
          </TouchableOpacity>
          <TouchableOpacity style ={{...tailwind`rounded`, justifyContent: 'center', alignItems: 'center', backgroundColor: '#89190fa4', paddingHorizontal: 20, paddingVertical: 10, flex: 1}}
            onPress={async () =>{
              try {
                await Share.share({
                  message: `Hello, ${name} is of blood type ${bloodGroup} and is registered as a donor on the Blood Bank App. Get in touch with him/her via email: ${email}`
                })
              } catch ({message}) {
                console.log(message);
              }
            }}
          >
            <FontAwesome name='share-alt' size={20} color='white'/>
          </TouchableOpacity>

        </View>

      </View>
    </View>
  )
}

export default DonorsCard;