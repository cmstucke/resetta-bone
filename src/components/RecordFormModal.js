import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DatePicker from 'react-datepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import 'react-datepicker/dist/react-datepicker.css';

const RecordFormModal = ({ visible, onClose, saveFunction, editableFields, setEditableFields}) => {
    const [localValue, setLocalValue] = useState(editableFields);
    
    useEffect(()=> {
        setLocalValue(editableFields);
    }, [editableFields]);

    const onSave = () => {
        setEditableFields(localValue);
        saveFunction(localValue);
        onClose();
    };
    const unPascalCase = (str) => {
        let newStr = '';
        for(const char of str){
            if(char === char.toUpperCase()){
                newStr += ` ${char}`;
            } else {
                newStr += char;
            }
        }
        return newStr.charAt(0).toUpperCase() + newStr.slice(1);
    }

    return (
        <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
        >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10 }}>
                {Object.keys(localValue).map((key)=> (
                    !!key.toLowerCase.match(/date/) ? 
                    (<View key={key}> 
                        <Text>{unPascalCase(key)}</Text>
                        {Platform.OS === 'web' ?
                            <DatePicker selected={localValue[key]} onChange={(date) => setLocalValue({...localValue, [key]: date})}/>
                            :
                            <DateTimePicker value={localValue[key] ? new Date(localValue[key]) : new Date()} mode='date' display='default' onChange={(e, date) => setLocalValue({...localValue, [key]: date})}/>
                        }
                    </View>)
                    : (<View key={key}> 
                        <Text>{unPascalCase(key)}</Text>
                        <TextInput
                            value={localValue[key]}
                            onChangeText={(e) => setLocalValue({...localValue, [key]: e})}
                            style={{ borderBottomWidth: 1, marginBottom: 20 }}
                        />
                    </View>)
                ))}
            <Pressable onPress={onSave}><Text>Save</Text></Pressable>
            <Pressable onPress={onClose}><Text>Cancel</Text></Pressable>
            </View>
        </View>
        </Modal>
    );
};

export default RecordFormModal;
