import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { element } from 'prop-types';

export default function NavButtons({page, setPage}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    
  return (
    <View style={styles.navbar}>
      <Pressable style={page === 'record' ? styles.selectedNavElement : styles.navElement} 
        onPress={()=> setPage('record')}>
          <View style={{alignItems:'center'}}>
            <Text >
              <Feather name="clipboard" size={24} color={page === 'record' ? 'white' : "#6495ED"} />
            </Text>
            <Text>
              My Record
            </Text>
          </View>
      </Pressable>
      <Pressable 
        style={page === 'scanQR' ? styles.selectedNavElement : styles.navElement} 
        onPress={()=> setPage('scanQR')}>
          <View style={{alignItems:'center'}}>
            <Text>
              <MaterialCommunityIcons name="qrcode-scan" size={24} color={page === 'scanQR' ? 'white' : "#6495ED"} /> 
            </Text>
            <Text>
              QR Code
            </Text>
          </View>
      </Pressable>
      <Pressable style={page === 'profile' ? styles.selectedNavElement : styles.navElement} 
        onPress={()=> setPage('profile')}>
          <View style={{alignItems:'center'}}>
            <Text>
              <AntDesign name="user" size={24} color={page === 'profile' ? 'white' : "#6495ED"} />
            </Text>
            <Text>
              Profile
            </Text>
          </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({

  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#DCDCDC',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  navElement:{ 
    padding: 10, 
    paddingBottom: 30,
    flex: 1,
  },
  selectedNavElement:{
    backgroundColor: "#6495ED",
    // borderTopWidth: '3',
    borderColor:'#DCDCDC',
    padding: 10,
    paddingBottom: 30,
    flex: 1,
  }
});