import Groq from "groq-sdk";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function humanizeText(text: string, tone: string) {
  try {
    // Create a prompt based on the tone
    const toneInstructions: Record<string, string> = {
      casual: "casual and conversational",
      professional: "professional and polished",
      friendly: "warm and friendly",
      formal: "formal and academic",
      creative: "creative and expressive",
    };

    const toneDescription = toneInstructions[tone] || "natural and engaging";

    const prompt = `You are a text humanizer. Your task is to transform the following text into more natural, human-like content while maintaining its core meaning and information.

Make the text sound ${toneDescription}. Remove any robotic or AI-generated patterns. Make it flow naturally as if written by a human.

Original text:
${text}

Please rewrite this text to sound more human and ${toneDescription}. Only return the humanized text without any additional commentary.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile", // Using one of Groq's fastest models
      temperature: 0.7,
      max_tokens: 2048,
    });

    const humanizedText = chatCompletion.choices[0]?.message?.content || "";

    if (!humanizedText) {
      return {
        error: "Failed to generate humanized text. Please try again.",
        humanizedText: null,
      };
    }

    return {
      humanizedText,
      error: null,
    };
  } catch (error: any) {
    console.error("Groq API Error:", error);

    // Handle specific error cases
    if (error.status === 401) {
      return {
        error: "Invalid API key. Please check your Groq API key configuration.",
        humanizedText: null,
      };
    }

    if (error.status === 429) {
      return {
        error: "Rate limit exceeded. Please try again in a moment.",
        humanizedText: null,
      };
    }

    return {
      error:
        error.message || "An error occurred while processing your request.",
      humanizedText: null,
    };
  }
}
