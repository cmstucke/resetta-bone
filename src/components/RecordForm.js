import { View, Text, ScrollView } from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchCurrentUserRecord } from '../../store/records';

export default function RecordForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const record = useSelector(state => state.entities.records[currentUser._id]);
    const [isEditing, setIsEditing] = useState(false);
    const [editableRecord, setEditableRecord] = useState(record);

    useEffect(()=> {
        dispatch(fetchCurrentUserRecord());
    }, []);

    useEffect(()=> {
        setEditableRecord(record);
    }, [record]);


    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        setEditableRecord(record);
    };
    const handleChange = (field, value) => {
        setEditableRecord({
          ...editableRecord,
          [field]: value
        });
    };
    const handleArrayChange = (field, index, key, value) => {
        const updatedArray = [...editableRecord[field]];
        updatedArray[index][key] = value;
        setEditableRecord({
          ...editableRecord,
          [field]: updatedArray
        });
    };
    const handleAddToArrayField = (field) => {
        const newObject = {}; // Initialize with default values if needed
        // dispatch(addObjectToArrayField(recordId, field, newObject));
    };
    
    const handleSave = () => {
        // dispatch(updateRecord(recordId, editableRecord));
        setIsEditing(false);
    };

    if(!record) return <View></View>

    return (
        <ScrollView>
          <View>
            <Text>First Name: </Text>
            {isEditing ? (
              <TextInput value={editableRecord.firstName} onChangeText={value => handleChange('firstName', value)} />
            ) : (
              <Text>{record.firstName}</Text>
            )}
          </View>
    
          <View>
            <Text>Last Name: </Text>
            {isEditing ? (
              <TextInput value={editableRecord.lastName} onChangeText={value => handleChange('lastName', value)} />
            ) : (
              <Text>{record.lastName}</Text>
            )}
          </View>
    
          {/* Repeat for other fields... */}
    
          {record.procedures.map((procedure, index) => (
            <View key={index}>
              <Text>Procedure: </Text>
              {isEditing ? (
                <TextInput value={editableRecord.procedures[index].procedure} onChangeText={value => handleArrayChange('procedures', index, 'procedure', value)} />
              ) : (
                <Text>{procedure.procedure}</Text>
              )}
            </View>
          ))}
    
          {/* {isEditing && (
            <Button title="Add Procedure" onPress={() => handleAddToArrayField('procedures')} />
          )}
    
          <Button title={isEditing ? "Save" : "Edit"} onPress={isEditing ? handleSave : handleEditToggle} /> */}
        </ScrollView>
    );
};
    