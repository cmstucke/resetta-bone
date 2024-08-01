const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const { getGroqChatCompletion } = require('../../services/llamaGroq/chatCompletion');

router.put('/:id', async (req, res) => {

  const { id } = req.params;
  // console.log('ID:', id);
  // console.log('REQ PARAMS:', req.params);
  const { content } = req.body;

  try {

    const chat = await Chat.findById(id);
    
    if (!chat)
      return res.status(404).json({ "error": "Chat not found." });

    const chatCompletion = await getGroqChatCompletion(content, chat.messages);
    const modelRes = chatCompletion.choices[0]?.message?.content || "No response.";

    chat.messages.push({ role: 'user', content: content });
    chat.messages.push({ role: 'bot', content: modelRes });

    await chat.save();

    res.status(200).json({ "updatedChat": chat });

  } catch (error) {

    console.error("Error updating chat messages:", error);
    res.status(500).json({ "error": "Error updating chat messages." });

  };


});

router.get('/', async (req, res) => {

  console.log('GET CHAT ROUTE');
  const chats = await Chat.find();

  res.json({ "chats": chats });

});

router.post('/', async (req, res) => {

  // console.log('YOU ARE HERE NOW');

  const { content } = req.body;
  // console.log('CONTENT:', content);

  try {

    const chatCompletion = await getGroqChatCompletion(content);
    const botRes = chatCompletion.choices[0]?.message?.content || "No response.";
    
    const newChat = new Chat({
      messages: [
        { role: 'user', content: content },
        { role: 'bot', content: botRes },
      ],
    });

    await newChat.save();
    res.status(201).json({ "newChat": newChat['messages'] });

  } catch (error) {

    console.error('Error fetching chat completion:', error);
    res.status(500).json({ error: 'Error fetching chat completion.' });

  };

});

module.exports = router;