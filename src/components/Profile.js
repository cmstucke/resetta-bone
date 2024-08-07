import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    return (
        <View>
            <Text>Profile</Text>
            <Text>{sessionUser?.email ? sessionUser.email : "no one is logged in"}</Text>
            <Pressable onPress={() => dispatch(logout())}><Text>Logout</Text></Pressable>
        </View>
    )
}