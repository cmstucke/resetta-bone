const express = require('express');
const router = express.Router();
const { getGroqChatCompletion } = require('../../services/llamaGroq/chatCompletion');

router.get('/chats', async (req, res) => { });