// screens/AllergiesPage.js
import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { updateAllergies } from '../../store/records';

export default function AllergiesPage({ navigation }) {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const allergies = useSelector((state) => state.form.allergies);

  const onSubmit = (data) => {
    dispatch(updateAllergies([...allergies, data]));
    navigation.navigate('HeartRates');
  };

  return (
    <View>
      <Text>Allergy</Text>
      <Controller
        control={control}
        name="allergy"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Text>Reaction</Text>
      <Controller
        control={control}
        name="reaction"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Text>Severity</Text>
      <Controller
        control={control}
        name="severity"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <Button title="Next" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
