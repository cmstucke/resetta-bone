import React from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {openChatThunk} from '../../store/chats';

const ExpandChat = () => {

  const dispatch = useDispatch();
  const openChat = useSelector(state => (
    state.chats ? state.chats?.openChat : false
  ));

  const handleOpenChat = async e => {
    e.preventDefault();

    if (openChat) {
      await dispatch(openChatThunk(false));
    } else {
      await dispatch(openChatThunk(true));
    };
  };

  return (
    <View>
    <Pressable onPress={handleOpenChat} styles={styles.openChatPressable}>
      <Text styles={styles.openChatText}>
        Assistant ^
      </Text>
    </Pressable>
    </View>
  )
}

export default ExpandChat

const styles = StyleSheet.create({
  openChatPressable: {
    backgroundColor: '#6495ED',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10
  },
  openChatText: {
    color: '#fff',
    fontSize: 16,
  }
});