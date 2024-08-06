import { View, Text, Pressable } from 'react-native'
import React from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

export default function NavButtons() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
  return (
    <View>
        <Text>{sessionUser?.email ? sessionUser.email : "no one is logged in"}</Text>
      <Pressable disabled={!sessionUser} onPress={() => dispatch(logout())}><Text>Logout</Text></Pressable>
    </View>
  )
}