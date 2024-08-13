import { View, Text, Pressable, SafeAreaView } from 'react-native'
import React, { useState } from 'react';
import { logout } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';

export default function Profile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View >
                <Text>Profile</Text>
                <Text>{sessionUser?.email ? sessionUser.email : "no one is logged in"}</Text>
                <Pressable onPress={() => dispatch(logout())}><Text>Logout</Text></Pressable>
            </View>
        </SafeAreaView>
    )
}