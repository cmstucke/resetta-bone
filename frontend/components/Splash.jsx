import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import {useDispatch} from 'react-redux'

export default function Splash() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <View>
      <View>
        <Pressable>
          <Text>Sign Up</Text>
        </Pressable>
      </View>
      <View>
        <Text>Already a member? </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

  const styles = StyleSheet.create({

  })
