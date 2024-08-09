import { View, Text, ScrollView, Pressable, TextInput} from 'react-native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchCurrentUserRecord } from '../../store/records';
import { updateRecord } from '../../store/records';
import RecordFormModal from './RecordFormModal'

export default function RecordForm() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const record = useSelector(state => state.entities.records[currentUser._id]);
  const [editableRecord, setEditableRecord] = useState(record);
  const [editableFields, setEditableFields] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [saveFunction, setSaveFunction] = useState(null);

    
  useEffect(()=> {
    dispatch(fetchCurrentUserRecord());
  }, []);
  
  useEffect(()=> {
    setEditableRecord(record);
  }, [record]);

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
      
  const handleSave = (value) => {
    const record = {...editableRecord, ...value};
    dispatch(updateRecord(record));
  };
  const handleArraySave = (field, id) => (newValue) =>{
    const updatedArray = [...editableRecord[field]];
    const idx = updatedArray.findIndex((obj) => obj._id === id);
    updatedArray[idx] = {...updatedArray[idx], ...newValue};
    const updatedRecord = {...editableRecord, [field]: updatedArray};
    setEditableRecord(updatedRecord);
    dispatch(updateRecord(updatedRecord));
  }
  const openModal = (payload, saveFunc) => {
    setEditableFields(payload);
    setModalVisible(true);
    setSaveFunction(() => saveFunc);
  };
  if(!record) return <View></View>

  return (
    <ScrollView>
      <View>
        <Text>Personal Info</Text>
        <Pressable onPress={() => openModal({firstName: record.firstName, lastName: record.lastName}, handleSave)}><Text>Edit</Text></Pressable>
        <View>
          <Text>First Name: </Text>
          <Text>{record.firstName}</Text>
        </View>  
        <View>
          <Text>Last Name: </Text>
            <Text>{record.lastName}</Text>
        </View>
      </View>


      {editableRecord?.procedures.map((procedure) => (
        <View key={procedure._id}>
          <Text>Procedure: </Text>
            <Pressable onPress={() => openModal({procedure: procedure.procedure, date: procedure.date, surgeon: procedure.surgeon}, handleArraySave('procedures', procedure._id))}><Text>Edit</Text></Pressable>
            <Text>Name</Text><Text>{procedure.procedure}</Text>
            <Text>Date</Text><Text>{procedure.date ? new Date(procedure.date).toLocaleDateString(): 'No Date Set'}</Text>
            <Text>Surgeon</Text><Text>{procedure.surgeon}</Text>
            <Pressable onPress={() => handleArrayDelete('procedures', procedure._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}

        <Pressable onPress={() => handleAddToArrayField('procedures')}><Text>Add Procedure</Text></Pressable>

        <RecordFormModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          saveFunction={saveFunction}
          editableFields={editableFields}
          setEditableFields={setEditableFields}
        />

    </ScrollView>
  );
};
    