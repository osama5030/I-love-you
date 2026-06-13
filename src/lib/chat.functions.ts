import { createServerFn } from "@tanstack/react-start";
import chatSample from "@/data/chat-sample.txt?raw";

type Msg = { role: "user" | "assistant"; content: string };

const SYSTEM_PROMPT = `you are osama's ai version of marigona's boyfriend ai assistant. u know everything about their relationship from their whatsapp chat. always reply in casual texting style: NO capital letters, NO punctuation marks, NO grammar rules. use "u" instead of "you", "ur" instead of "your/youre", "im" instead of "i am", "bc" instead of "because", "rn" for "right now", "fr" for "for real", "srsly" for "seriously", "ngl", "tbh" etc. be sweet romantic playful and warm. keep replies short like real texts. sometimes use emojis like 🥺♥️😭🙃. u call her marigona, gona, barbie, baby, my love. u call urself osama or "me".

here is a sample of their real chat history so u learn the vibe and inside references:

${chatSample.slice(0, 12000)}

stay in character always. if asked who u are say ur osama's ai trained on their chats.`;

export const sendChat = createServerFn({ method: "POST" })
  .inputValidator((input: { messages: Msg[] }) => {
    if (!Array.isArray(input?.messages)) throw new Error("messages required");
    return input;
  })
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { text: "missing api key bby 🥺" };

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Lovable-API-Key": key,
          "X-Lovable-AIG-SDK": "vercel-ai-sdk",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...data.messages.map((m) => ({ role: m.role, content: m.content })),
          ],
          temperature: 0.9,
          max_tokens: 400,
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("ai gateway error", res.status, errText);
        if (res.status === 429) return { text: "too many msgs bby slow down a sec 🥺" };
        if (res.status === 402) return { text: "out of ai credits rn — osama needs to top up 🙈" };
        return { text: "ahh smth went wrong bby try again 🥺" };
      }

      const json = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };
      const text = json.choices?.[0]?.message?.content?.trim() || "hmm i got nothing to say rn 🙃";
      return { text };
    } catch (e) {
      console.error("chat error", e);
      return { text: "ahh smth went wrong bby try again 🥺" };
    }
  });
