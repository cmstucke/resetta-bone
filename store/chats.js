import jwtFetch from './jwt';

const GET_CHATS = 'chats/GET_CHATS';
const GET_CHAT = 'chats/GET_CHAT';
const ADD_CHAT = 'chats/ADD_CHAT';
const EDIT_CHAT = 'chats/EDIT_CHAT';

const getChats = chats => ({
  type: GET_CHATS,
  chats
});

const getChat = chat => ({
  type: GET_CHAT,
  chat
});

const addChat = currentChat => ({
  type: ADD_CHAT,
  currentChat
});

const editChat = currentChat => ({
  type: EDIT_CHAT,
  currentChat
});

export const getChatsThunk = () => async dispatch => {
  
  try {

    const res = await jwtFetch('/api/chats/');

    if (res.ok) {
      const data = await res.json();
      dispatch(getChats(data));
      return data;
    } else {
      const data = await res.json();
      console.error('Error in chat response.', data);
    };

  } catch (error) {

    console.error('Error fetching chat.', error);

  };

};

export const getCurrentChatThunk = chatId => async dispatch => {
  
  try {

    const res = await jwtFetch(`/api/chats/${chatId}`);

    if (res.ok) {
      const data = await res.json();
      dispatch(getChats(data));
      return data;
    } else {
      const data = await res.json();
      console.error('Error in chat response.', data);
    };

  } catch (error) {

    console.error('Error fetching chat.', error);

  };

};

export const addChatThunk = content => async dispatch => {

  try {

    const res = await jwtFetch('/api/chats/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    if (res.ok) {

      const data = await res.json();
      console.log('DATA:', data);
      dispatch(addChat(data));
      return data;
      
    } else {
      
      const data = await res.json();
      console.log('Error in chat response.', data);
      
    };
    
  } catch (error) {
    
    const data = await error.json();
    console.log('Error fetching chat.', data);

  };

};

export const editChatThunk = (id, content) => async dispatch => {

  console.log('ID:', id);
  console.log('CONTENT:', content);

  try {

    const res = await jwtFetch(`/api/chats/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    if (res.ok) {

      const { updatedChat } = await res.json();
      // console.log('DATA:', updatedChat);
      dispatch(editChat(updatedChat));
      return updatedChat;

    } else {

      const data = await res.json();
      console.error('Error in chat response.', data);

    };

  } catch (error) {

    console.error('Error fetching chat.', data);

  };

};

const initialState = {
  chats: [],
  currentChat: null,
};

const chatReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_CHATS:
      return { ...state, ...action.chats };
    case ADD_CHAT:
      return { ...state, currentChat: { ...action.currentChat } };
    case EDIT_CHAT:
      return {
        ...state, 
        currentChat: {
          ...action.currentChat,
          messages: [...action.currentChat.messages]
        }
      };
    default:
      return state;
  };
};

export default chatReducer;