// screens/PersonalInfoPage.js
import React from 'react';
import { View, Text, TextInput, Button, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

export default function PersonalInfoPage({ navigation }) {
  const { control, handleSubmit } = useForm();

  const onSubmit = data => {
    // Save data and navigate to the next page
    console.log(data);
    navigation.navigate('Allergies');
  };

  return (
    <View>
      <Text>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Text>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Text>Date of Birth</Text>
      <Controller
        control={control}
        name="dateOfBirth"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Text>Biological Gender</Text>
      <Controller
        control={control}
        name="biologicalGender"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Pressable title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
