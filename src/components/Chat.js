import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addChatThunk, editChatThunk, getChatsThunk } from '../../store/chats';
import ExpandChat from './ExpandChat';

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
      // const errRes = await error.json();
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
      <ExpandChat />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '8rem',
    width: '100%',
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    // width: '10rem'
    // flexGrow: 0,
    marginBottom: 20,
  },
  messageContainer: {
    margin: 10
    // backgroundColor: '#e1f5fe',
    // borderRadius: 5,
    // marginVertical: 5,
  },
  messageText: {
    // fontSize: 16,
    // color: '#333',
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#6495ED',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Chat;
