import React from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updatePersonalInfo } from '../../store/records';
import { globalStyles } from '../components/styles';

export default function PersonalInfoPage({ formData, setFormData }) {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const firstName = useSelector((state) => state.entities.records.firstName);
  // const lastName = useSelector((state => ))
  const update = field => {
    return e =>{
      dispatch(updateAllergies([...allergies, data]));
      // setFormData({...formData, [field]:e});  
    } 
  }

  return (

    <View style={globalStyles.container}>
      <Text>First Name</Text>
        <TextInput
            style={globalStyles.input}
            onChangeText={update('firstName')}
            defaultValue={formData.firstName}
          />
      <Text>Last Name</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={update('lastName')}
            defaultValue={formData.lastName}
          />
      <Text>Date of Birth</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={update('dateOfBirth')}
            defaultValue={formData.dateOfBirth}
          />
      <Text>Biological Gender</Text>
          <TextInput
            style={globalStyles.input}
            onChangeText={update('biologicalGender')}
            defaultValue={formData.biologicalGender}
          />
    </View>
  );
}