import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useState } from 'react';
import {useDispatch} from 'react-redux'

export default function Splash() {
    return (
      <View>
        <View>
          <Pressable>
            <Text>Log in</Text>
          </Pressable>
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }
