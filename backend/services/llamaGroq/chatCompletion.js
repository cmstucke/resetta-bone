import 'dotenv/config';
import Groq from "groq-sdk";

console.log("GROQ_API_KEY:", process.env.GROQ_API_KEY);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  try {
    console.log("Starting main function...");
    const chatCompletion = await getGroqChatCompletion();
    // Print the completion returned by the LLM.
    console.log(chatCompletion.choices[0]?.message?.content || "No content received");
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "is there a way that i can use groq to call for chat completions from llama 3 specifically?",
      },
    ],
    model: "llama3-8b-8192",
  });
}

// Invoke the main function
main();
