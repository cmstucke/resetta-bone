// import jwtFetch from '../../store/jwt';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatsThunk, addChatThunk, editChatThunk } from '../../store/chats';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Pressable } from 'react-native';

const Chat = () => {

  const dispatch = useDispatch();

  const chats = useSelector(state => (
    state.chats ? state.chats : null
  ));

  useEffect(() => {
    dispatch(getChatsThunk());
  }, []);

  const [chatInput, setChatInput] = useState('');
  // console.log('CHAT INPUT:', chatInput);

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(addChatThunk({ content: chatInput}));
    // try {
    //   dispatch(addChatThunk({ content: chatInput}));
    // } catch (error) {
    //   // console.error('Error submitting chat input.', error);
    //   console.log('Error submitting chat input.', error);
    // };
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
      </View> */}
      <TextInput
        value={chatInput}
        onChangeText={setChatInput}
        placeholder="Type your message"
      />
      <Button title="Send" onPress={handleSubmit} />
    </>
  );
};

export default Chat;
