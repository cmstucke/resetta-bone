// import 'dotenv/config';
// import Groq from "groq-sdk";
require('dotenv').config();
const Groq = require('groq-sdk');


console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  try {
    console.log("Starting main function...");
    const chatCompletion = await getGroqChatCompletion("Hello!");
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "No content received");
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

async function getGroqChatCompletion(content, prev) {

  // console.log('PREV:', prev);
  let prevMessages = '';
  const newMessage = [];
  
  if (prev) {
    prevMessages += 'This is the previous conversation: ';
    prev.forEach(message => prevMessages += `${message.role.toUpperCase()}: ${message.content} `);
    prevMessages += 'Now, here is the new user prompt: ';
  };

  prevMessages += content;

  newMessage.push({
    role: 'user',
    content: prevMessages,
  });
  console.log('PREV MESSAGES:', newMessage);

  return groq.chat.completions.create({
    messages: newMessage,
    model: "llama3-8b-8192",
  });
}

// Invoke the main function
main();

module.exports = { getGroqChatCompletion, main };
