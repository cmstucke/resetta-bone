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
  
  const newMessage = {
    role: 'user',
    content: content,
  };

  const messages = [];

  if (prev) messages.push(...prev);

  messages.push(newMessage);

  return groq.chat.completions.create({
    messages: messages,
    model: "llama3-8b-8192",
    temperature: 0.1,
  });
}

// Invoke the main function
main();

module.exports = { getGroqChatCompletion, main };
