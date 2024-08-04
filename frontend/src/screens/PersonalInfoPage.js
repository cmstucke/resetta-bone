// import React from 'react';
// import { View, Text, TextInput, Button, ScrollView, StyleSheet, Pressable } from 'react-native';
// import { useForm, Controller } from 'react-hook-form';
// import { useDispatch, useSelector } from 'react-redux';
// import { updatePersonalInfo } from '../../store/records';
// import { globalStyles } from '../components/styles';

// export default function PersonalInfoPage({ navigation }) {
//   const { control, handleSubmit } = useForm();
//   const dispatch = useDispatch();
//   const personalInfo = useSelector((state) => state.entities.records);
//   console.log(personalInfo)

//   const onSubmit = (data) => {
//     dispatch(updatePersonalInfo(data));
//     navigation.navigate('Allergies');
//   };

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       <View style={globalStyles.container}>
//         <Text>First Name</Text>
//         <Controller
//           control={control}
//           name="firstName"
//           defaultValue={personalInfo.firstName}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               style={globalStyles.input}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//         />
//         <Text>Last Name</Text>
//         <Controller
//           control={control}
//           name="lastName"
//           defaultValue={personalInfo.lastName}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               style={globalStyles.input}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//         />
//         <Text>Date of Birth</Text>
//         <Controller
//           control={control}
//           name="dateOfBirth"
//           defaultValue={personalInfo.dateOfBirth}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               style={globalStyles.input}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//         />
//         <Text>Biological Gender</Text>
//         <Controller
//           control={control}
//           name="biologicalGender"
//           defaultValue={personalInfo.biologicalGender}
//           render={({ field: { onChange, onBlur, value } }) => (
//             <TextInput
//               style={globalStyles.input}
//               onBlur={onBlur}
//               onChangeText={onChange}
//               value={value}
//             />
//           )}
//         />
//         <View style={globalStyles.buttonContainer}>
//           <Button title="Next" onPress={handleSubmit(onSubmit)} />
//         </View>
//       </View>
//     </ScrollView>
//   );
// }
import { View, Text } from 'react-native'
import React from 'react'

export default function PersonalInfoPage() {
  return (
    <View>
      <Text>PersonalInfoPage</Text>
    </View>
  )
}