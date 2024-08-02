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
  const [currChat, setCurrChat] = useState(null);
  // console.log('CURRENT CHAT ID:', currChat);

  const handleCreate = async e => {
    e.preventDefault();
    
    let postRes;
    try {
      postRes = await dispatch(addChatThunk({ content: chatInput}));
    } catch (error) {
      console.log('Error submitting chat input.', error);
    };
    
    if (postRes) {
      const { newChat } = postRes;
      setCurrChat(newChat);
    };
    
  };
  
  const handleEdit = async e => {
    e.preventDefault();

    let editRes;
    try {
      editRes = await dispatch(editChatThunk(currChat._id, { content: chatInput }));
    } catch (error) {
      console.log('Error submitting chat input.', error);
    };

    if (editRes) {
      setCurrChat({ ...editRes, messages: editRes.messages });
    };

  };

  return (
    <>
    {currChat &&
      <View>
      <FlatList
        data={currChat.messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>
            {item.content}
          </Text>
        )}
      />
      </View>}
      <TextInput
        value={chatInput}
        onChangeText={setChatInput}
        placeholder="Type your message"
      />
      <Pressable
        title="Send"
        onPress={
          currChat
            ? handleEdit
            : handleCreate
        }
      />
    </>
  );
};

export default Chat;
