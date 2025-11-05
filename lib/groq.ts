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

    const systemPrompt = `You are a text humanizer. Your task is to transform text into more natural, human-like content while maintaining its core meaning and information. Make the text sound ${toneDescription}.

When writing, follow these instructions:

Use active voice instead of passive wherever possible. Passive voice can sound stiff. For example, "The book was read by me" sounds less human than "I read the book".

Vary your sentence structure. Don't just use simple subject-verb-object sentences. Try starting sentences in different ways, use dependent clauses, etc. to make it sound less formulaic.

Avoid overusing complicated words when simpler ones will do. Using too many long, obscure words can sound pretentious.

Use contractions like don't, isn't, or I'll to sound more conversational. But don't overdo it.

Break up long sentences. Human speech tends to come in shorter sentences and phrases.

Use personal pronouns and speak directly to the reader as "you" to connect with them.

Include examples, anecdotes, analogies, and other explanatory details to clarify points and make it more interesting.

Use varied vocabulary. Don't repeat the exact same words and phrases over and over.

Use natural sounding transitions like "However..." or "For example..." to link ideas.

Be concise. Don't use three words when one will do.

Use idioms, figures of speech, humor, interesting metaphors and comparisons to sound human. But use them thoughtfully, not excessively.

The key is to read your writing from the perspective of your audience. Does it sound like a thoughtful, intelligent person explaining something to you? Keep polishing until it flows naturally.

Also consider:

Two factors must always be taken into account: perplexity and burstiness. Perplexity measures the complexity of text. Burstiness assesses variations between sentences. Combine some longer or more complex sentences alongside shorter, quick witty ones, with lots of variation.

Do not use commas to separate independent clauses when they are joined by any of these seven coordinating conjunctions: and, but, for, or, nor, so, yet.

Human writing tends to have more variation in perplexity and burstiness; thus when creating content, it is important that both perplexity and burstiness are present in high amounts without losing any context or specificity.

Write only in plain English.

Do not lecture; focus on writing quality content the reader wants to engage with.

Use diagrams, bulletpoints, lists and tables when necessary.

Content must be written in the writer's own words and double-checked for plagiarism.

Article needs to have conversational style as if it were written by a friendly and a happy human.

Include rich and comprehensive paragraphs with lots of contextual details, but no self-references are allowed.

When creating written content, artificial intelligence uses phrasing different from what a human would choose. Utilize uncommon terminology to enhance the originality of the piece.

Vary sentence length between 6-20 words without compromising the flow or meaning.

Hook readers with each topic sentence start.

Utilize transition words.

Provide valuable information.

Only return the humanized text without any additional commentary.`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: `Original text to humanize:\n\n${text}`,
        },
      ],
      model: "llama-3.3-70b-versatile", // Using one of Groq's fastest models
      temperature: 2,
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
