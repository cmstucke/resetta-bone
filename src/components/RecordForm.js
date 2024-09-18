import { View, Text, ScrollView, Pressable, TextInput, SafeAreaView, StyleSheet} from 'react-native';
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchCurrentUserRecord, fetchRecord, fetchRecordByUserId } from '../../store/records';
import { updateRecord } from '../../store/records';
import RecordFormModal from './RecordFormModal'
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

export default function RecordForm({userId}) {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const record = useSelector(state => state.entities.records[userId || currentUser._id]);
  const [editableRecord, setEditableRecord] = useState(record);
  const [editableFields, setEditableFields] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [saveFunction, setSaveFunction] = useState(null);
  const [myPage, setMyPage] = useState(false);


  useEffect(()=> {
    if(!userId){
      dispatch(fetchCurrentUserRecord());
      setMyPage(true);
    } else {
      dispatch(fetchRecordByUserId(userId))
      setMyPage(false);
    }
  }, [userId]);

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
          <Text style={styles.headerText}>{t("personal")}</Text>
          {myPage && <Pressable style={styles.editButton} onPress={() => openModal({
            firstName: record.firstName,
            lastName: record.lastName,
            dateOfBirth: record.dateOfBirth,
            biologicalGender: record.biologicalGender
            }, handleSave)}>
              <Text style={styles.editText}>
                {editButton}
              </Text>
          </Pressable>}
        </View>
          <View style={styles.field}>
          <Text>{t("first-name")}</Text>
          <Text>{record.firstName}</Text>
        </View>
        <View style={styles.field}>
          <Text>{t("last-name")}</Text>
            <Text>{record.lastName}</Text>
        </View>
        <View style={styles.field}>
          <Text>{t("DOB")}</Text>
            <Text>{record.dateOfBirth ? new Date(record.dateOfBirth).toLocaleDateString(): 'No Date Set'}</Text>
        </View>
        <View style={styles.field}>
          <Text>{t("gender")}</Text>
            <Text>{record.biologicalGender}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("habits")}</Text>
          {myPage && <Pressable onPress={() => openModal({
            smokingStatus: record.smokingStatus,
            alcoholConsumption: record.alcoholConsumption,
            exerciseFrequency: record.exerciseFrequency
            }, handleSave)}>
            <Text>
              <Text style={styles.editText}>
                {editButton}
              </Text>
            </Text>
          </Pressable>}
        </View>
        <View style={styles.field}>
          <Text>{t("smoke-status")}</Text>
          <Text>{record.smokingStatus}</Text>
        </View>
        <View style={styles.field}>
          <Text>{t("alcohol")}</Text>
            <Text>{record.alcoholConsumption}</Text>
        </View>
        <View style={styles.field}>
          <Text>{t("exercise")}</Text>
            <Text>{record.exerciseFrequency}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("emergency")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('emergencyContacts')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.emergencyContacts.map((contact) => (
          <View key={contact._id} style={styles.nestedFields}>
              <View>
                <View style={styles.field}>
                  <Text>{t("name")}</Text><Text>{contact.name}</Text>
                </View>
                <View style={styles.field}>
                  <Text>{t("phone")}</Text><Text>{contact.phone}</Text>
                </View>
                <View style={styles.field}>
                  <Text>{t("relationship")}</Text><Text>{contact.relationship}</Text>
                </View>
              </View>
              <View style={styles.nestedButtons}>
                {myPage && <Pressable onPress={() => openModal({name: contact.name, phone: contact.phone, relationship: contact.relationship}, handleArraySave('emergencyContacts', contact._id))}><Text>{editButton}</Text></Pressable>}
                {myPage && <Pressable onPress={() => handleArrayDelete('emergencyContacts', contact._id)}><Text>{deleteButton}</Text></Pressable>}
              </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("family-history")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('familyHistory')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.familyHistory.map((member) => (
          <View key={member._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}>
                <Text>{t("condition")}</Text><Text>{member.condition}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("relation")}</Text><Text>{member.relation}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("notes")}</Text><Text>{member.notes}</Text>
              </View>
            </View>
            <View style={styles.nestedButtons}>
              {myPage && <Pressable onPress={() => openModal({condition: member.condition, relation: member.relation, notes: member.notes}, handleArraySave('familyHistory', member._id))}><Text>{editButton}</Text></Pressable>}
              {myPage && <Pressable onPress={() => handleArrayDelete('familyHistory', member._id)}><Text>{deleteButton}</Text></Pressable>}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("lab-results")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('labResults')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.labResults.map((result) => (
          <View key={result._id} style={styles.nestedFields}>
              <View>
                <View style={styles.field}>
                  <Text>Test Name:</Text><Text>{result.testName}</Text>
                </View>
                <View style={styles.field}>
                  <Text>{t("result")}</Text><Text>{result.result}</Text>
                </View>
                <View style={styles.field}>
                  <Text>{t("date")}</Text><Text>{result.date ? new Date(result.date).toLocaleDateString(): 'No Date Set'}</Text>
                </View>
                <View style={styles.field}>
                  <Text>{t("notes")}</Text><Text>{result.notes}</Text>
                </View>
              </View>
              <View style={styles.nestedButtons}>
                {myPage && <Pressable onPress={() => openModal({testName: result.testName, result: result.result, date: result.date, notes: result.notes}, handleArraySave('labResults', result._id))}><Text>{editButton}</Text></Pressable>}
                {myPage && <Pressable onPress={() => handleArrayDelete('labResults', result._id)}><Text>{deleteButton}</Text></Pressable>}
              </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("immune")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('immunizations')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.immunizations.map((vaccine) => (
          <View key={vaccine._id} style={styles.nestedFields}>
              <View>
                <View style={styles.field}>
                  <Text>{t("vaccine")}</Text><Text>{vaccine.vaccine}</Text>
                </View>
                <View style={styles.field}>
                  <Text>{t("date")}</Text><Text>{vaccine.date ? new Date(vaccine.date).toLocaleDateString(): 'No Date Set'}</Text>
                </View>
              </View>
              <View style={styles.nestedButtons}>
                {myPage && <Pressable onPress={() => openModal({vaccine: vaccine.vaccine, date: vaccine.date}, handleArraySave('immunizations', vaccine._id))}><Text>{editButton}</Text></Pressable>}
                {myPage && <Pressable onPress={() => handleArrayDelete('immunizations', vaccine._id)}><Text>{deleteButton}</Text></Pressable>}
              </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("allergies")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('allergies')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.allergies.map((allergy) => (
          <View key={allergy._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}>
                <Text>{t("allergy-name")}</Text><Text>{allergy.allergyName}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("reaction")}</Text><Text>{allergy.reaction}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("severity")}</Text><Text>{allergy.severity}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}>
                {myPage && <Pressable onPress={() => openModal({allergyName: allergy.allergyName, reaction: allergy.reaction, severity: allergy.severity}, handleArraySave('allergies', allergy._id))}><Text>{editButton}</Text></Pressable>}
                {myPage && <Pressable onPress={() => handleArrayDelete('allergies', allergy._id)}><Text>{deleteButton}</Text></Pressable>}
              </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("blood-pressures")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('bloodPressures')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.bloodPressures.map((bloodPressure) => (
          <View key={bloodPressure._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}>
                <Text>{t("systolic")}</Text><Text>{bloodPressure.systolic}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("diastolic")}</Text><Text>{bloodPressure.diastolic}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("date")}</Text><Text>{bloodPressure.date ? new Date(bloodPressure.date).toLocaleDateString(): 'No Date Set'}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("time")}</Text><Text>{bloodPressure.time}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}>
                {myPage && <Pressable onPress={() => openModal({systolic: bloodPressure.systolic, diastolic: bloodPressure.diastolic, date: bloodPressure.date, time: bloodPressure.time}, handleArraySave('bloodPressures', bloodPressure._id))}><Text>{editButton}</Text></Pressable>}
                {myPage && <Pressable onPress={() => handleArrayDelete('bloodPressures', bloodPressure._id)}><Text>{deleteButton}</Text></Pressable>}
              </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("pre-conditions")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('preExistingConditions')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.preExistingConditions.map((condition) => (
          <View key={condition._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}>
                <Text>{t("condition-name")}</Text><Text>{condition.conditionName}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("diag-date")}</Text><Text>{condition.diagnosisDate ? new Date(condition.diagnosisDate).toLocaleDateString(): 'No Date Set'}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("notes")}</Text><Text>{condition.notes}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}>
                {myPage && <Pressable onPress={() => openModal({conditionName: condition.conditionName, diagnosisDate: condition.diagnosisDate, notes: condition.notes}, handleArraySave('preExistingConditions', condition._id))}><Text>{editButton}</Text></Pressable>}
                {myPage && <Pressable onPress={() => handleArrayDelete('preExistingConditions', condition._id)}><Text>{deleteButton}</Text></Pressable>}
              </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("medications")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('medications')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.medications.map((medication) => (
          <View key={medication._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}>
                <Text>{t("med-name")}</Text><Text>{medication.medicationName}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("dosage")}</Text><Text>{medication.dosage}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("frequency")}</Text><Text>{medication.frequency}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}>
                {myPage && <Pressable onPress={() => openModal({medicationName: medication.medicationName, dosage: medication.dosage, frequency: medication.frequency}, handleArraySave('medications', medication._id))}><Text>{editButton}</Text></Pressable>}
                {myPage && <Pressable onPress={() => handleArrayDelete('medications', medication._id)}><Text>{deleteButton}</Text></Pressable>}
              </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("procedures")}</Text>
          {myPage && <Pressable onPress={() => handleAddToArrayField('procedures')}><Text>{addButton}</Text></Pressable>}
        </View>
        {editableRecord?.procedures.map((procedure) => (
          <View key={procedure._id} style={styles.nestedFields}>
            <View>
              <View style={styles.field}>
                <Text>{t("proc-name")}</Text><Text>{procedure.procedureName}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("date")}</Text><Text>{procedure.date ? new Date(procedure.date).toLocaleDateString(): 'No Date Set'}</Text>
              </View>
              <View style={styles.field}>
                <Text>{t("surgeon")}</Text><Text>{procedure.surgeon}</Text>
              </View>
            </View>
              <View style={styles.nestedButtons}>
                {myPage && <Pressable onPress={() => openModal({procedureName: procedure.procedureName, date: procedure.date, surgeon: procedure.surgeon}, handleArraySave('procedures', procedure._id))}><Text>{editButton}</Text></Pressable>}
                {myPage && <Pressable onPress={() => handleArrayDelete('procedures', procedure._id)}><Text>{deleteButton}</Text></Pressable>}
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
