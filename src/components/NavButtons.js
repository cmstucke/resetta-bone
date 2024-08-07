import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function NavButtons({page, setPage}) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    
  return (
    <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
      <Pressable style={page === 'record' ? {backgroundColor: "#6495ED"} : {}} onPress={()=> setPage('record')}><Text><Feather name="clipboard" size={24} color={page === 'record' ? 'white' : "#6495ED"} /></Text></Pressable>
      <Pressable style={page === 'scanQR' ? {backgroundColor: "#6495ED"} : {}} onPress={()=> setPage('scanQR')}><Text><MaterialCommunityIcons name="qrcode-scan" size={24} color={page === 'scanQR' ? 'white' : "#6495ED"} /></Text></Pressable>
      <Pressable style={page === 'profile' ? {backgroundColor: "#6495ED"} : {}} onPress={()=> setPage('profile')}><Text><AntDesign name="user" size={24} color={page === 'profile' ? 'white' : "#6495ED"} /></Text></Pressable>
    </View>
  )
}