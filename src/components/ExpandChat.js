import React from 'react'
import { Pressable, Text, StyleSheet, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {openChatThunk} from '../../store/chats';

const ExpandChat = ({ activeChat, toggleChat }) => {

  return (
    <View style={styles.container}>
      <Pressable onPress={toggleChat} style={styles.openChatPressable}>
        <Text style={styles.openChatText}>
          {activeChat ? 'Close Assistant ^' : 'Assistant ^'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '5.75rem',
    width: '100%',
  },
  openChatPressable: {
    backgroundColor: '#6495ED',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10,
    color: 'blue',
  },
  openChatText: {
    color: '#fff',
    fontSize: 16,
  }
});

export default ExpandChat;