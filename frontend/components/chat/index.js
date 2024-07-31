// import jwtFetch from '../../store/jwt';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatsThunk, addChatThunk, editChatThunk } from '../../store/chats';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const Chat = () => {

  const dispatch = useDispatch();

  const chats = useSelector(state => (
    state.chats ? state.chats : null
  ));

  useEffect(() => {
    dispatch(getChatsThunk());
  }, []);

  const [chatInput, setChatInput] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch(addChatThunk(chatInput));
    } catch (error) {
      console.error('Error submitting chat input.', error);
    };
  };

  return (
    <>
    {/* <View>
      {chats?.currentChat
      &&
      <FlatList
        data={currentChat.messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={item.role === 'user' ? styles.userMessage : styles.botMessage}>
            {item.content}
          </Text>
        )}
      />}
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View> */}
    </>
  );
};

export default Chat;
