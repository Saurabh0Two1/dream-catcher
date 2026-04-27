import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_KEY,
});

// Call Open AI API for dream interpretation
export async function getDreamInterpretation(dreamText) {
  if (!process.env.AI_KEY) {
    throw new Error("Server misconfigured: API_KEY is missing");
  }

  const model = process.env.AI_MODEL || "gpt-4o-mini";

  try {
    const message = await openai.chat.completions.create({
      model,
      max_completion_tokens: 5000,
      messages: [
        {
          role: "system",
          content:
            "You are a thoughtful dream interpreter. Be insightful but gentle, and consider common dream symbolism. Keep your interpretation to 2-3 paragraphs.",
        },
        {
          role: "user",
          content: `Dream: ${dreamText}`,
        },
      ],
      reasoning_effort: "minimal",
      verbosity: "low",
    });

    console.log({ model, message: JSON.stringify(message) });

    return message.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error(`API error: ${error.message}`);
  }
}
