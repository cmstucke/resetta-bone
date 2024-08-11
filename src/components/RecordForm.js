import { View, Text, ScrollView, Pressable, TextInput, SafeAreaView, StyleSheet} from 'react-native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchCurrentUserRecord } from '../../store/records';
import { updateRecord } from '../../store/records';
import RecordFormModal from './RecordFormModal'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

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

  const styles = StyleSheet.create({
    section: {
      padding: 10,
      borderColor: 'black',
      borderWidth: 2,
      borderRadius: 5,
      margin: 5
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerText:{
      fontWeight: 'bold'
    },
    field:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontWeight: 'bold'
    },
    editButton: {
      color: "#6495ED", 
      borderRadius: 5,
    },
    editText: {
      color: 'white'
    }, 
    nestedFields: {
      flexDirection:'row', 
      justifyContent:'space-between', 
      borderBottomWidth: 1, 
      borderBottomColor:'black', 
      padding: 5
    },
    nestedButtons: {
      justifyContent: 'space-between'
    }
  });
  const addButton = <AntDesign name="pluscircleo" size={24} color="#6495ED" />;
  const editButton = <Feather name="edit" size={24} color="#6495ED" />;
  const deleteButton = <MaterialIcons name="delete-forever" size={24} color="red" />;

  return (
    <SafeAreaView>
    <ScrollView>
      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Personal Info</Text>
          <Pressable style={styles.editButton} onPress={() => openModal({
            firstName: record.firstName, 
            lastName: record.lastName,
            dateOfBirth: record.dateOfBirth,
            biologicalGender: record.biologicalGender
            }, handleSave)}>
              <Text style={styles.editText}>
                {editButton}
              </Text>
          </Pressable>
        </View>
          <View style={styles.field}>
          <Text>First Name: </Text>
          <Text>{record.firstName}</Text>
        </View>  
        <View style={styles.field}>
          <Text>Last Name: </Text>
            <Text>{record.lastName}</Text>
        </View>
        <View style={styles.field}>
          <Text>Date of Birth: </Text>
            <Text>{record.dateOfBirth ? new Date(record.dateOfBirth).toLocaleDateString(): 'No Date Set'}</Text>
        </View>
        <View style={styles.field}>
          <Text>Biological Gender: </Text>
            <Text>{record.biologicalGender}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Habits</Text>
          <Pressable onPress={() => openModal({
            smokingStatus: record.smokingStatus, 
            alcoholConsumption: record.alcoholConsumption,
            exerciseFrequency: record.exerciseFrequency
            }, handleSave)}>
            <Text>
              <Text style={styles.editText}>
                {editButton}
              </Text>
            </Text>
          </Pressable>
        </View>
        <View style={styles.field}>
          <Text>Smoking Status: </Text>
          <Text>{record.smokingStatus}</Text>
        </View>  
        <View style={styles.field}>
          <Text>Alcohol Consumption: </Text>
            <Text>{record.alcoholConsumption}</Text>
        </View>
        <View style={styles.field}>
          <Text>Exercise Frequency: </Text>
            <Text>{record.exerciseFrequency}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Emergency Contacts</Text>
          <Pressable onPress={() => handleAddToArrayField('emergencyContacts')}><Text>{addButton}</Text></Pressable>
        </View>
        {editableRecord?.emergencyContacts.map((contact) => (
          <View key={contact._id} style={styles.nestedFields}>
              <View>
                <View style={styles.field}>
                  <Text>Name:</Text><Text>{contact.name}</Text>
                </View>
                <View style={styles.field}>
                  <Text>Phone:</Text><Text>{contact.phone}</Text>
                </View>
                <View style={styles.field}>
                  <Text>Relationship:</Text><Text>{contact.relationship}</Text>
                </View>
              </View>
              <View style={styles.nestedButtons}> 
                <Pressable onPress={() => openModal({name: contact.name, phone: contact.phone, relationship: contact.relationship}, handleArraySave('emergencyContacts', contact._id))}><Text>{editButton}</Text></Pressable>
                <Pressable onPress={() => handleArrayDelete('emergencyContacts', contact._id)}><Text>{deleteButton}</Text></Pressable>
              </View>
          </View>
        ))}    
      </View>

      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Family History</Text>
          <Pressable onPress={() => handleAddToArrayField('familyHistory')}><Text>{addButton} </Text></Pressable> 
        </View>
        {editableRecord?.familyHistory.map((member) => (
          <View key={member._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}> 
                <Text>Condition:</Text><Text>{member.condition}</Text>
              </View>
              <View style={styles.field}> 
                <Text>Relation:</Text><Text>{member.relation}</Text>
              </View>
              <View style={styles.field}> 
                <Text>Notes:</Text><Text>{member.notes}</Text>
              </View>
            </View>
            <View style={styles.nestedButtons}> 
              <Pressable onPress={() => openModal({condition: member.condition, relation: member.relation, notes: member.notes}, handleArraySave('familyHistory', member._id))}><Text>{editButton}</Text></Pressable>
              <Pressable onPress={() => handleArrayDelete('familyHistory', member._id)}><Text>{deleteButton}</Text></Pressable>
            </View>
          </View>
        ))}    
      </View>

      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Lab Results</Text>
          <Pressable onPress={() => handleAddToArrayField('labResults')}><Text>{addButton}</Text></Pressable> 
        </View>
        {editableRecord?.labResults.map((result) => (
          <View key={result._id} style={styles.nestedFields}>
              <View> 
                <View style={styles.field}> 
                  <Text>Test Name:</Text><Text>{result.testName}</Text>
                </View>
                <View style={styles.field}> 
                  <Text>Result:</Text><Text>{result.result}</Text>
                </View>
                <View style={styles.field}> 
                  <Text>Date:</Text><Text>{result.date ? new Date(result.date).toLocaleDateString(): 'No Date Set'}</Text>
                </View>
                <View style={styles.field}> 
                  <Text>Notes:</Text><Text>{result.notes}</Text>
                </View>
              </View>
              <View style={styles.nestedButtons}> 
                <Pressable onPress={() => openModal({testName: result.testName, result: result.result, date: result.date, notes: result.notes}, handleArraySave('labResults', result._id))}><Text>{editButton}</Text></Pressable>
                <Pressable onPress={() => handleArrayDelete('labResults', result._id)}><Text>{deleteButton}</Text></Pressable>
              </View>
          </View>
        ))}    
      </View>

      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Immunizations</Text>
          <Pressable onPress={() => handleAddToArrayField('immunizations')}><Text>{addButton}</Text></Pressable> 
        </View>
        {editableRecord?.immunizations.map((vaccine) => (
          <View key={vaccine._id} style={styles.nestedFields}>
              <View> 
                <View style={styles.field}> 
                  <Text>Vaccine:</Text><Text>{vaccine.vaccine}</Text>
                </View>
                <View style={styles.field}> 
                  <Text>Date:</Text><Text>{vaccine.date ? new Date(vaccine.date).toLocaleDateString(): 'No Date Set'}</Text>
                </View>
              </View>
              <View style={styles.nestedButtons}> 
                <Pressable onPress={() => openModal({vaccine: vaccine.vaccine, date: vaccine.date}, handleArraySave('immunizations', vaccine._id))}><Text>{editButton}</Text></Pressable>
                <Pressable onPress={() => handleArrayDelete('immunizations', vaccine._id)}><Text>{deleteButton}</Text></Pressable>
              </View>
          </View>
        ))}    
      </View>

      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Allergies</Text>
          <Pressable onPress={() => handleAddToArrayField('allergies')}><Text>{addButton}</Text></Pressable> 
        </View>
        {editableRecord?.allergies.map((allergy) => (
          <View key={allergy._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}> 
                <Text>Allergy Name:</Text><Text>{allergy.allergyName}</Text>
              </View>
              <View style={styles.field}> 
                <Text>Reaction:</Text><Text>{allergy.reaction}</Text>
              </View>
              <View style={styles.field}> 
                <Text>Severity:</Text><Text>{allergy.severity}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}> 
                <Pressable onPress={() => openModal({allergyName: allergy.allergyName, reaction: allergy.reaction, severity: allergy.severity}, handleArraySave('allergies', allergy._id))}><Text>{editButton}</Text></Pressable>
                <Pressable onPress={() => handleArrayDelete('allergies', allergy._id)}><Text>{deleteButton}</Text></Pressable>
              </View>
          </View>
        ))}    
      </View>

      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Blood Pressures</Text>
          <Pressable onPress={() => handleAddToArrayField('bloodPressures')}><Text>{addButton}</Text></Pressable> 
        </View>
        {editableRecord?.bloodPressures.map((bloodPressure) => (
          <View key={bloodPressure._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}> 
                <Text>Systolic:</Text><Text>{bloodPressure.systolic}</Text>
              </View>
              <View style={styles.field}>
                <Text>Diastolic:</Text><Text>{bloodPressure.diastolic}</Text>
              </View>
              <View style={styles.field}>
                <Text>Date:</Text><Text>{bloodPressure.date ? new Date(bloodPressure.date).toLocaleDateString(): 'No Date Set'}</Text>
              </View>
              <View style={styles.field}>
                <Text>Time:</Text><Text>{bloodPressure.time}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}> 
                <Pressable onPress={() => openModal({systolic: bloodPressure.systolic, diastolic: bloodPressure.diastolic, date: bloodPressure.date, time: bloodPressure.time}, handleArraySave('bloodPressures', bloodPressure._id))}><Text>{editButton}</Text></Pressable>
                <Pressable onPress={() => handleArrayDelete('bloodPressures', bloodPressure._id)}><Text>{deleteButton}</Text></Pressable>
              </View>
          </View>
        ))}    
      </View>
      
      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Pre-Existing Conditions</Text>
          <Pressable onPress={() => handleAddToArrayField('preExistingConditions')}><Text>{addButton}</Text></Pressable> 
        </View>
        {editableRecord?.preExistingConditions.map((condition) => (
          <View key={condition._id} style={styles.nestedFields}>
            <View> 
              <View style={styles.field}>
                <Text>Condition Name:</Text><Text>{condition.conditionName}</Text>
              </View>
              <View style={styles.field}>
                <Text>Diagnosis Date:</Text><Text>{condition.diagnosisDate ? new Date(condition.diagnosisDate).toLocaleDateString(): 'No Date Set'}</Text>
              </View>
              <View style={styles.field}>
                <Text>Notes:</Text><Text>{condition.notes}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}> 
                <Pressable onPress={() => openModal({conditionName: condition.conditionName, diagnosisDate: condition.diagnosisDate, notes: condition.notes}, handleArraySave('preExistingConditions', condition._id))}><Text>{editButton}</Text></Pressable>
                <Pressable onPress={() => handleArrayDelete('preExistingConditions', condition._id)}><Text>{deleteButton}</Text></Pressable>
              </View>
          </View>
        ))}    
      </View>
      
      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Medications</Text>
          <Pressable onPress={() => handleAddToArrayField('medications')}><Text>{addButton}</Text></Pressable> 
        </View>
        {editableRecord?.medications.map((medication) => (
          <View key={medication._id} style={styles.nestedFields}>
            <View> 
              <View style={styles.field}>
                <Text>Medication Name:</Text><Text>{medication.medicationName}</Text>
              </View>
              <View style={styles.field}>
                <Text>Dosage:</Text><Text>{medication.dosage}</Text>
              </View>
              <View style={styles.field}>
                <Text>Frequency:</Text><Text>{medication.frequency}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}> 
                <Pressable onPress={() => openModal({medicationName: medication.medicationName, dosage: medication.dosage, frequency: medication.frequency}, handleArraySave('medications', medication._id))}><Text>{editButton}</Text></Pressable>
                <Pressable onPress={() => handleArrayDelete('medications', medication._id)}><Text>{deleteButton}</Text></Pressable>
              </View>
          </View>
        ))}    
      </View>

      <View style={styles.section}>
        <View style={styles.header}> 
          <Text style={styles.headerText}>Procedures:</Text>
          <Pressable onPress={() => handleAddToArrayField('procedures')}><Text>{addButton}</Text></Pressable>
        </View>
        {editableRecord?.procedures.map((procedure) => (
          <View key={procedure._id} style={styles.nestedFields}>
            <View> 
              <View style={styles.field}>
                <Text>Procedure Name:</Text><Text>{procedure.procedureName}</Text>
              </View>
              <View style={styles.field}>
                <Text>Date:</Text><Text>{procedure.date ? new Date(procedure.date).toLocaleDateString(): 'No Date Set'}</Text>
              </View>
              <View style={styles.field}>
                <Text>Surgeon:</Text><Text>{procedure.surgeon}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}> 
                <Pressable onPress={() => openModal({procedureName: procedure.procedureName, date: procedure.date, surgeon: procedure.surgeon}, handleArraySave('procedures', procedure._id))}><Text>{editButton}</Text></Pressable>
                <Pressable onPress={() => handleArrayDelete('procedures', procedure._id)}><Text>{deleteButton}</Text></Pressable>
              </View>
          </View>
        ))}

      </View>

      <RecordFormModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        saveFunction={saveFunction}
        editableFields={editableFields}
        setEditableFields={setEditableFields}
      />

    </ScrollView>
  </SafeAreaView>
  );
};
    