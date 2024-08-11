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
    } else if(field === 'emergencyContacts'){
      newObject = {
        name: '',
        phone: '',
        relationship: ''
      }
    } else if (field === 'familyHistory'){
      newObject = {
        condition: '',
        relation: '',
        notes: ''
      }
    } else if (field === 'labResults'){
      newObject = {
        testName: '',
        result: '',
        date: '',
        notes: ''
      }
    } else if (field === 'immunizations'){
      newObject = {
        vaccine: '',
        date: ''
      }
    } else if (field === 'allergies'){
      newObject = {
        allergyName: '',
        reaction: '',
        severity: '',
      }
    } else if (field === 'heartRates'){
      newObject = {
        date: '',
        time: '',
        heartRate: '',
      }
    } else if (field === 'bloodPressures'){
      newObject = {
        date: '',
        time: '',
        systolic: '',
        diastolic: ''
      }
    } else if(field === 'preExistingConditions'){
      newObject = {
        conditionName: '',
        diagnosisDate: '',
        notes: ''
      }
    } else if(field === 'medications'){
      newObject = {
        medicationName: '',
        dosage: '',
        frequency: ''
      };
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
        <Pressable onPress={() => openModal({
          firstName: record.firstName, 
          lastName: record.lastName,
          dateOfBirth: record.dateOfBirth,
          biologicalGender: record.biologicalGender
          }, handleSave)}><Text>Edit</Text></Pressable>
        <View>
          <Text>First Name: </Text>
          <Text>{record.firstName}</Text>
        </View>  
        <View>
          <Text>Last Name: </Text>
            <Text>{record.lastName}</Text>
        </View>
        <View>
          <Text>Date of Birth: </Text>
            <Text>{record.dateOfBirth}</Text>
        </View>
        <View>
          <Text>Biological Gender: </Text>
            <Text>{record.biologicalGender}</Text>
        </View>
      </View>

      <View>
        <Text>Habits</Text>
        <Pressable onPress={() => openModal({
          smokingStatus: record.smokingStatus, 
          alcoholConsumption: record.alcoholConsumption,
          exerciseFrequency: record.exerciseFrequency
          }, handleSave)}><Text>Edit</Text></Pressable>
        <View>
          <Text>Smoking Status: </Text>
          <Text>{record.smokingStatus}</Text>
        </View>  
        <View>
          <Text>Alcohol Consumption: </Text>
            <Text>{record.alcoholConsumption}</Text>
        </View>
        <View>
          <Text>Exercise Frequency: </Text>
            <Text>{record.exerciseFrequency}</Text>
        </View>
      </View>

      

      <Text>Emergency Contacts: </Text>
      {editableRecord?.emergencyContacts.map((contact) => (
        <View key={contact._id}>
            <Pressable onPress={() => openModal({name: contact.name, phone: contact.phone, relationship: contact.relationship}, handleArraySave('emergencyContacts', contact._id))}><Text>Edit</Text></Pressable>
            <Text>Name</Text><Text>{contact.name}</Text>
            <Text>Phone</Text><Text>{contact.phone}</Text>
            <Text>Relationship</Text><Text>{contact.relationship}</Text>
            <Pressable onPress={() => handleArrayDelete('emergencyContacts', contact._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}    
      <Pressable onPress={() => handleAddToArrayField('emergencyContacts')}><Text>Add Contact</Text></Pressable>

      <Text>Family History: </Text>
      {editableRecord?.familyHistory.map((member) => (
        <View key={member._id}>
            <Pressable onPress={() => openModal({condition: member.condition, relation: member.relation, notes: member.notes}, handleArraySave('familyHistory', member._id))}><Text>Edit</Text></Pressable>
            <Text>Condition</Text><Text>{member.condition}</Text>
            <Text>Relation</Text><Text>{member.relation}</Text>
            <Text>Notes</Text><Text>{member.notes}</Text>
            <Pressable onPress={() => handleArrayDelete('familyHistory', member._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}    
      <Pressable onPress={() => handleAddToArrayField('familyHistory')}><Text>Add History</Text></Pressable> 

      <Text>Lab Results: </Text>
      {editableRecord?.labResults.map((result) => (
        <View key={result._id}>
            <Pressable onPress={() => openModal({testName: result.testName, result: result.result, date: result.date, notes: result.notes}, handleArraySave('labResults', result._id))}><Text>Edit</Text></Pressable>
            <Text>Test Name</Text><Text>{result.testName}</Text>
            <Text>Result</Text><Text>{result.result}</Text>
            <Text>Date</Text><Text>{result.date ? new Date(result.date).toLocaleDateString(): 'No Date Set'}</Text>
            <Text>Notes</Text><Text>{result.notes}</Text>
            <Pressable onPress={() => handleArrayDelete('labResults', result._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}    
      <Pressable onPress={() => handleAddToArrayField('labResults')}><Text>Add Lab Results</Text></Pressable> 

      <Text>Immunizations: </Text>
      {editableRecord?.immunizations.map((vaccine) => (
        <View key={vaccine._id}>
            <Pressable onPress={() => openModal({vaccine: vaccine.vaccine, date: vaccine.date}, handleArraySave('immunizations', vaccine._id))}><Text>Edit</Text></Pressable>
            <Text>Vaccine</Text><Text>{vaccine.vaccine}</Text>
            <Text>Date</Text><Text>{vaccine.date ? new Date(vaccine.date).toLocaleDateString(): 'No Date Set'}</Text>
            <Pressable onPress={() => handleArrayDelete('immunizations', vaccine._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}    
      <Pressable onPress={() => handleAddToArrayField('immunizations')}><Text>Add Immunization</Text></Pressable> 

      <Text>Allergies: </Text>
      {editableRecord?.allergies.map((allergy) => (
        <View key={allergy._id}>
            <Pressable onPress={() => openModal({allergyName: allergy.allergyName, reaction: allergy.reaction, severity: allergy.severity}, handleArraySave('allergies', allergy._id))}><Text>Edit</Text></Pressable>
            <Text>Allergy Name</Text><Text>{allergy.allergyName}</Text>
            <Text>Reaction</Text><Text>{allergy.reaction}</Text>
            <Text>Severity</Text><Text>{allergy.severity}</Text>
            <Pressable onPress={() => handleArrayDelete('allergies', allergy._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}    
      <Pressable onPress={() => handleAddToArrayField('allergies')}><Text>Add Allergy</Text></Pressable> 
      
      <Text>Blood Pressures: </Text>
      {editableRecord?.bloodPressures.map((bloodPressure) => (
        <View key={bloodPressure._id}>
            <Pressable onPress={() => openModal({systolic: bloodPressure.systolic, diastolic: bloodPressure.diastolic, date: bloodPressure.date, time: bloodPressure.time}, handleArraySave('bloodPressures', bloodPressure._id))}><Text>Edit</Text></Pressable>
            <Text>Systolic</Text><Text>{bloodPressure.systolic}</Text>
            <Text>Diastolic</Text><Text>{bloodPressure.diastolic}</Text>
            <Text>Date</Text><Text>{bloodPressure.date ? new Date(bloodPressure.date).toLocaleDateString(): 'No Date Set'}</Text>
            <Text>Time</Text><Text>{bloodPressure.time}</Text>
            <Pressable onPress={() => handleArrayDelete('bloodPressures', bloodPressure._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}    
      <Pressable onPress={() => handleAddToArrayField('bloodPressures')}><Text>Add Allergy</Text></Pressable> 

      <Text>Pre-Existing Conditions: </Text>
      {editableRecord?.preExistingConditions.map((condition) => (
        <View key={condition._id}>
            <Pressable onPress={() => openModal({conditionName: condition.conditionName, diagnosisDate: condition.diagnosisDate, notes: condition.notes}, handleArraySave('preExistingConditions', condition._id))}><Text>Edit</Text></Pressable>
            <Text>Condition Name</Text><Text>{condition.conditionName}</Text>
            <Text>Diagnosis Date</Text><Text>{condition.diagnosisDate ? new Date(condition.diagnosisDate).toLocaleDateString(): 'No Date Set'}</Text>
            <Text>Notes</Text><Text>{condition.notes}</Text>
            <Pressable onPress={() => handleArrayDelete('preExistingConditions', condition._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}    
      <Pressable onPress={() => handleAddToArrayField('preExistingConditions')}><Text>Add Pre-Existing Condition</Text></Pressable> 

      <Text>Medications: </Text>
      {editableRecord?.medications.map((medication) => (
        <View key={medication._id}>
            <Pressable onPress={() => openModal({medicationName: medication.medicationName, dosage: medication.dosage, frequency: medication.frequency}, handleArraySave('medications', medication._id))}><Text>Edit</Text></Pressable>
            <Text>Medication Name</Text><Text>{medication.medicationName}</Text>
            <Text>Dosage</Text><Text>{medication.dosage}</Text>
            <Text>Frequency</Text><Text>{medication.frequency}</Text>
            <Pressable onPress={() => handleArrayDelete('medications', medication._id)}><Text>Delete</Text></Pressable>
        </View>
      ))}    
      <Pressable onPress={() => handleAddToArrayField('medications')}><Text>Add Medication</Text></Pressable> 



      <Text>Procedure: </Text>
      {editableRecord?.procedures.map((procedure) => (
        <View key={procedure._id}>
            <Pressable onPress={() => openModal({procedureName: procedure.procedureName, date: procedure.date, surgeon: procedure.surgeon}, handleArraySave('procedures', procedure._id))}><Text>Edit</Text></Pressable>
            <Text>Procedure Name</Text><Text>{procedure.procedureName}</Text>
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
    