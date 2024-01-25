import tailwind from 'twrnc';
import { FontAwesome } from '@expo/vector-icons';
import { View, TextInput, TouchableOpacity } from 'react-native';

const SearchComponent = ({placeholder, data =[], setResults, searchFields, setRelated =null}) => {
    
    const searchData =q =>{
        const defaultData =[...data];
        const search =new RegExp(`.*${q.trim().toLowerCase()}.*`, "g");
        if(q.trim().length){
            if(setRelated) setRelated(`Related to ${q.trim()}`)
            const filtered =[...defaultData].filter(entry =>{
                const items =[];
                for (let i = 0; i < searchFields.length; i++)
                    if(entry[searchFields[i]].toLowerCase().match(search)) items.push(true);
                    if(items.length) return entry;
                });
            setResults(filtered);
        }else {
            setResults(defaultData);
            setRelated(null);
        }
    }
    return (
        <View style ={{...tailwind`w-full bg-white rounded border-gray-100`, borderWidth: 1, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style ={{...tailwind`pl-4 py-4 bg-white rounded`}}>
            <FontAwesome name="search" size={16} color={'#888888'}/>
            </TouchableOpacity>
            <TextInput style ={{...tailwind`px-4 py-2`, flex:1}}  placeholder={placeholder || 'Filter results'} onChangeText={searchData}/>
        </View>
    )
}

export default SearchComponent;