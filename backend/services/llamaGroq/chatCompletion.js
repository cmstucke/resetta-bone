// import 'dotenv/config';
// import Groq from "groq-sdk";
require('dotenv').config();
const Groq = require('groq-sdk');


console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function main() {
  try {
    console.log("Starting main function...");
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "No content received");
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "whos is the best husbando in genshin impact?",
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Invoke the main function
main();

module.exports = { getGroqChatCompletion, main };
