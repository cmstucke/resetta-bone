const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Chat = mongoose.model('Chat');
const { getGroqChatCompletion } = require('../../services/llamaGroq/chatCompletion');

router.get('/chats', async (req, res) => {

  try {

    const chatCompletion = await getGroqChatCompletion();
    const content = chatCompletion.choices[0]?.message?.content || "No content received";
    
    const newChat = new Chat({
      messages: [
        { role: 'user', content: 'is there a way that i can use groq to call for chat completions from llama 3 specifically?' },
        { role: 'assistant', content: content },
      ],
    });

    await newChat.save();
    res.json({ message: content }, { status: 201 });

  } catch (error) {

    console.error('Error fetching chat completion:', error);
    res.status(500).json({ error: 'Error fetching chat completion' });

  };

});

module.exports = router;