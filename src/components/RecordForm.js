import { View, Text, ScrollView, Pressable, TextInput} from 'react-native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchCurrentUserRecord } from '../../store/records';
// import Chat from './chat';

export default function RecordForm() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const record = useSelector(state => state.entities.records[currentUser._id]);
    const [isEditing, setIsEditing] = useState(false);
    const [editableRecord, setEditableRecord] = useState(record);
    const [selectedField, setSelectedField] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editableValue, setEditableValue] = useState('');

    const openModal = (field) => {
      setSelectedField(field);
      setEditableValue(record[field]);
      setModalVisible(true);
    };

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
        setEditableRecord({...editableRecord, [field]: updatedArray});
    };
    const handleArrayDelete = (field, id) => {
      const updatedArray = [...editableRecord[field]].filter((obj) => obj._id !== id);
      setEditableRecord({...editableRecord, [field]: updatedArray});
    };

    const handleAddToArrayField = (field) => {
        let newObject = {}; // Initialize with default values if needed
        if(field === 'procedures'){
            newObject = {
                procedure: '',
                date: '',
                surgeon: ''
            }
        }
        dispatch(updateRecord({...editableRecord, [field]: [...editableRecord[field], newObject]}));
    };
    
    const handleSave = () => {
        dispatch(updateRecord(editableRecord));
        setIsEditing(false);
    };

    if(!record) return <View></View>

    return (
      <>
        <ScrollView>
          <View>
            <Text>First Name: </Text>
            <Text>{record.firstName}</Text>
            <Pressable onPress={() => openModal('firstName')}><Text>Edit</Text></Pressable>
              {/* <TextInput value={editableRecord?.firstName} onChangeText={value => handleChange('firstName', value)} /> */}
          </View>
    
          <View>
            <Text>Last Name: </Text>
              <TextInput value={editableRecord?.lastName} onChangeText={value => handleChange('lastName', value)}/>
          </View>
    
    
          {editableRecord?.procedures.map((procedure, index) => (
            <View key={procedure._id}>
              <Text>Procedure: </Text>
              {/* {isEditing ? ( */}
                <Text>Name</Text><TextInput value={procedure.procedure} onChangeText={value => handleArrayChange('procedures', 'procedure', value)}/>
                <Text>Date</Text><TextInput placeholder="Chose date of procedure" value={moment(procedure.date).format('DD MMMM, YYYY')} onDateChange={value => handleArrayChange('procedures', 'date', value)}/>
                <Text>Surgeon</Text><TextInput value={procedure.surgeon} onChangeText={value => handleArrayChange('procedures', 'surgeon', value)}/>

                <Pressable onPress={() => handleArrayDelete('procedures', procedure._id)}><Text>Delete</Text></Pressable>
              {/* ) : (
                <Text>{procedure.procedure}</Text>
              )} */}
            </View>
          ))}

            <Pressable onPress={() => handleAddToArrayField('procedures')}><Text>Add Procedure</Text></Pressable>
    
            {/* <Pressable onPress={isEditing ? handleSave : handleEditToggle}><Text>{isEditing ? "Save" : "Edit"}</Text></Pressable> */}
            <Pressable onPress={handleSave}><Text>{"Save"}</Text></Pressable>
            <RecordFormModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSave={handleSave}
              fieldLabel={selectedField}
              fieldValue={editableValue}
              setFieldValue={setEditableValue}
            />

        </ScrollView>
        {/* <Chat /> */}
        </>
    );
};
    