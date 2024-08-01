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

export const addChatThunk = content => async dispatch => {

  try {

    const res = await jwtFetch('/api/chats/', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    if (res.ok) {

      const data = await res.json();
      dispatch(addChat(data));
      return data;
      
    } else {
      
      const data = await res.json();
      // console.error('Error in chat response.', data);
      console.log('Error in chat response.', data);

    };

  } catch (error) {

    // console.error('Error fetching chat.', data);
    console.log('Error fetching chat.', data);

  };

};

export const editChatThunk = message => async dispatch => {

  try {

    const res = await jwtFetch('/api/chats/', {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message)
    });

    if (res.ok) {

      const data = await res.json();
      dispatch(editChat(data));
      return data;

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