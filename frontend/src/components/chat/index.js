import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChatsThunk, addChatThunk, editChatThunk } from '../../../store/chats';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';

const Chat = () => {
  const dispatch = useDispatch();

  const chats = useSelector(state => (
    state.chats ? state.chats : null
  ));

  useEffect(() => {
    dispatch(getChatsThunk());
  }, []);

  const [chatInput, setChatInput] = useState('');
  const [currChat, setCurrChat] = useState(null);

  const handleCreate = async e => {
    e.preventDefault();
    
    let postRes;
    try {
      postRes = await dispatch(addChatThunk({ content: chatInput }));
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

  const screenHeight = Dimensions.get('window').height;
  const chatContainerHeight = screenHeight / 2;

  return (
    <View style={styles.container}>
      {currChat &&
        <ScrollView style={[styles.chatContainer, { maxHeight: chatContainerHeight }]}>
          <FlatList
            data={currChat.messages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>
                  {item.content}
                </Text>
              </View>
            )}
          />
        </ScrollView>}
      <TextInput
        style={styles.input}
        value={chatInput}
        onChangeText={setChatInput}
        placeholder="Type your message"
      />
      <Pressable
        style={styles.button}
        onPress={currChat ? handleEdit : handleCreate}
      >
        <Text style={styles.buttonText}>Send</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    flexGrow: 0,
    marginBottom: 20,
  },
  messageContainer: {
    padding: 10,
    backgroundColor: '#e1f5fe',
    borderRadius: 5,
    marginVertical: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chat;
