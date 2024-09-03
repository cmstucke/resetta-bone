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
    <Pressable onPress={handleOpenChat} styles={styles.openChatPressable}>
      <Text styles={styles.openChatText}>
        Assistant ^
      </Text>
    </Pressable>
  )
}

export default ExpandChat

const styles = StyleSheet.create({
  openChatPressable: {
    // position: 'absolute',
    // bottom: '5rem',
    // width: '100%',
    // flex: 1,
    // justifyContent: 'center',
  },
  openChatText: {

  }
});