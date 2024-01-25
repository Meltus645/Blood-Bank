import tailwind from 'twrnc';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {SelectList} from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity, TextInput, SafeAreaView, Switch } from 'react-native';

const FormComponent = ({fields =[], action ='submit', title, onSubmit, children, clear =false, default_values ={}}) => {
    const {handleSubmit, reset, control, setValue} =useForm({defaultValues: default_values});
    const [loading, setLoading] =useState(false);
    const onFormSubmit =async values =>{
        setLoading(true);
        await onSubmit(values);
        setLoading(false);
        reset();
    }
    useEffect(() =>{
        // setValue()
    },[])
    useEffect(() =>{
        if(clear) reset();
    }, [clear])
    return (
        <SafeAreaView style ={{...tailwind`px-5`, flex: 1, backgroundColor: '#f9f9f9', borderTopLeftRadius: 25, borderTopRightRadius: 25, justifyContent: 'center'}} >
            <View>
                <ScrollView>

                    {title &&(<Text style ={{...tailwind`text-center text-4xl font-bold py-5 uppercase`, color: '#444444'}}>{title}</Text>)}
                    {fields.map(({type, label, name, placeholder, rules, options =[], selected ="", onSelect=null, date =null, mode, fieldShowing, setFieldShowing =null, setPlaceholder =null, switchOn =false, setSwitchOn =null}, index) =>(<View key={index} style ={{...tailwind`mb-3`}}>
                        {(label && type.toLowerCase() !='switch') &&(<Text style ={{...tailwind`text-lg pb-1`, color: '#333333'}}>{label}</Text>)}
                        <Controller 
                            name={name}
                            rules={ rules || {} }
                            control={control}
                            render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (<>
                                    {type.toLowerCase() =='select'? 
                                        (<SelectList data ={options} onChangeText={onChange} onBlur={onBlur} onSelect={() =>setValue(name, selected)} setSelected ={selectedValue => onSelect(selectedValue)} placeholder={placeholder}/>)
                                        :type.toLowerCase() =='date'? (<>
                                        {fieldShowing && (<DateTimePicker onChangeText={onChange} onBlur={onBlur} onChange={(_evt, value) =>{
                                            const day =value.getDate() <10? `0${value.getDate()}`: `${value.getDate()}`;
                                            const month =value.getMonth() +1 <=10? `0${value.getMonth()+1}`: `${value.getMonth()+1}`;
                                            setPlaceholder(`${day}-${month}-${value.getFullYear()}`)
                                            setValue(name, value.toLocaleString());
                                            setFieldShowing(false);
                                        }} is24Hour={true} mode={mode} value={date} display='default' testID='picker'/>) }
                                        <TouchableOpacity onPress={() =>setFieldShowing(true)} style ={{...tailwind`px-5 py-4 rounded-lg`, borderColor: error? '#b30047' :'#c5c5c5', borderWidth: 1,}}>
                                            <Text style ={{color: 'gray'}}>{placeholder}</Text>
                                        </TouchableOpacity>
                                        <TextInput value={value} onChangeText={onChange} onBlur={onBlur} style ={{display: 'none'}}/>
                                        <TouchableOpacity />
                                        </>)
                                        :type.toLowerCase() =='switch'? 
                                        (<View style ={{...tailwind`flex-row items-center justify-between`}}>
                                            {label && (<Text style ={{...tailwind`text-lg pb-1`, color: '#333333'}}>{label}</Text>)}
                                            <Switch value ={value || switchOn} onValueChange={() =>{setSwitchOn(prev =>!prev); setValue(name, switchOn)}} onChangeText={onChange} onBlur={onBlur} />
                                        </View>)
                                        :(<TextInput secureTextEntry ={type.toLowerCase() ==='password'} keyboardType={`${type.toLowerCase() =='number'? 'numeric':'default'}`} multiline ={type.toLowerCase() =='textarea'} value={value} onChangeText={onChange} onBlur={onBlur} placeholder={placeholder || ''} style ={{...tailwind`px-5 py-2 rounded-lg`, borderColor: error? '#b30047' :'#c5c5c5', borderWidth: 1,}}/>)
                                    }
                                    {error &&(<Text style ={{...tailwind`text-sm`, color: '#b30047'}}>{error?.message || 'Error'}</Text>)}
                                </>)
                            }
                        />
                        
                    </View>))}
                    {!loading?(
                            <TouchableOpacity style ={{...tailwind`rounded`, backgroundColor: '#89190fa4'}} onPress={handleSubmit(onFormSubmit)}>
                                <Text style ={{...tailwind`text-center text-white py-3 uppercase font-bold text-lg`}}>{action}</Text>
                            </TouchableOpacity>
                        ): (<ActivityIndicator />)
                    }
                    {children}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default FormComponent;