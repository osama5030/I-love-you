import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendChat } from "@/lib/chat.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "I love you Marigona ♥" },
      { name: "description", content: "a little space made just for u marigona ♥" },
      { property: "og:title", content: "I love you Marigona ♥" },
      { property: "og:description", content: "a little space made just for u marigona ♥" },
    ],
  }),
  component: Index,
});

const PHOTOS = [
  "https://i.postimg.cc/02GndsK4/IMG-20250930-WA0068.jpg",
  "https://i.postimg.cc/m23jNs1j/IMG-20251018-WA0074.jpg",
  "https://i.postimg.cc/MK05bSfD/IMG-20251018-WA0078.jpg",
  "https://i.postimg.cc/Prbyzjvz/IMG-20251018-WA0128.jpg",
  "https://i.postimg.cc/65VcLX4V/IMG-20251018-WA0143.jpg",
  "https://i.postimg.cc/TYj0q65m/IMG-20251018-WA0148.jpg",
  "https://i.postimg.cc/hP8sbBQT/IMG-20251018-WA0154.jpg",
  "https://i.postimg.cc/pXMkFTrr/IMG-20251019-WA0001.jpg",
  "https://i.postimg.cc/Hs0z4g8M/IMG-20251107-WA0011.jpg",
  "https://i.postimg.cc/fT7CjNSS/IMG-20251124-WA0002.jpg",
  "https://i.postimg.cc/hP8sbBQz/IMG-20251202-WA0015.jpg",
  "https://i.postimg.cc/4NRw9dy7/IMG-20251216-WA0040.jpg",
  "https://i.postimg.cc/pXQCYH5m/IMG-20251228-WA0063.jpg",
  "https://i.postimg.cc/WbcSk3zd/IMG-20260310-WA0015.jpg",
  "https://i.postimg.cc/rw8JfP5P/IMG20251017183006.jpg",
  "https://i.postimg.cc/Njg4dzRN/IMG20251017221216.jpg",
  "https://i.postimg.cc/zXw7SrH3/Screenshot-2026-03-14-23-31-32-29-6012fa4d4ddec268fc5c7112cbb265e7.jpg",
  "https://i.postimg.cc/fTQ59LyS/Screenshot-2026-03-14-23-42-19-76-6012fa4d4ddec268fc5c7112cbb265e7.jpg",
  "https://i.postimg.cc/Hs13yxny/Screenshot-2026-06-04-11-28-27-04-6012fa4d4ddec268fc5c7112cbb265e7.jpg",
];

const LOVE_LETTER = `marigona i dont even know where to start u have no idea how much u mean to me like fr ur the best thing that ever happened into my life im so lucky to have u by my side every single day bc life without u literally makes no sense u make me so happy and i just love everything about u ur smile ur voice the way u talk to me and how u always make me feel so safe and loved im typing this bc i want u to know that i will always be here for u no matter what happens between us ur my whole world and my future and i cant wait for us to build our life together forever and ever i love u so much more than words can say u are my everything marigona i mean it like srsly sometimes i just sit and think about how crazy it is that i found u out of all people in this world and how we became so close and how much we love each other now its just insane bc u are perfect to me even when u think ur not u are literally the most beautiful girl inside and out and i promise u i will never ever let u go or make u sad bc ur smile is the only thing i want to see every day when i wake up and before i go to sleep u are my peace and my home marigona and i dont think i can ever explain this properly bc words are just too small for how big my feelings are for u like fr im so obsessed with everything u do even the tiny things u dont notice u are my favorite person to talk to my best friend my partner and my whole entire universe i want to share every single moment of my life with u the good days and the bad days and i promise to always hold ur hand through it all bc we are a team and nothing can ever stop us or come between us i love u yesterday i love u today i love u tomorrow and i will love u for the rest of my life until eternity u are my girl forever and always marigona never forget that okay im always ur guy and ur always my queen i love u so so so so so so much more than u will ever know`;

type ChatMsg = { role: "user" | "assistant"; content: string };

function Index() {
  const [showLetter, setShowLetter] = useState(false);
  const [showChat, setShowChat] = useState(false);
  // Duplicate photos for seamless infinite scroll
  const loop = [...PHOTOS, ...PHOTOS];

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#fff5f8] via-[#ffeaf1] to-[#fff5f8] text-foreground">
      {/* floating hearts background */}
      <FloatingHearts />

      {/* Hero */}
      <section className="relative z-10 px-4 pt-12 pb-6 text-center sm:pt-20 sm:pb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--pink-deep)] sm:text-sm">
          osama &amp; marigona
        </p>
        <h1 className="mt-4 font-serif text-5xl font-light leading-tight text-[var(--pink-deep)] sm:text-7xl md:text-8xl">
          I love you <span className="italic">Marigona</span> <span className="inline-block animate-pulse">♥</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          a tiny corner of the internet made just for u 🥺
        </p>
      </section>

      {/* Horizontal scrolling timeline (right to left) */}
      <section className="relative z-10 mt-6 mb-12 sm:mt-10">
        <div className="group relative overflow-hidden py-6">
          <div
            className="flex w-max gap-5 px-4 animate-marquee group-hover:[animation-play-state:paused]"
            style={{ animationDuration: `${PHOTOS.length * 4}s` }}
          >
            {loop.map((src, i) => (
              <figure
                key={i}
                className="group/card relative h-56 w-44 shrink-0 overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(255,150,180,0.25)] ring-1 ring-pink-100 transition-transform duration-500 hover:-translate-y-2 hover:rotate-1 sm:h-72 sm:w-56 md:h-80 md:w-64"
              >
                {/* Replace src below with your own image if needed */}
                <img
                  src={src}
                  alt={`us ${(i % PHOTOS.length) + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-pink-200/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
              </figure>
            ))}
          </div>
          {/* fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#fff5f8] to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#fff5f8] to-transparent sm:w-32" />
        </div>
      </section>

      {/* The big button */}
      <section className="relative z-10 flex flex-col items-center px-4 pb-24 text-center">
        <p className="mb-6 max-w-md text-sm text-muted-foreground sm:text-base">
          i wrote something for u baby... open it only if u love me 🙈
        </p>
        <button
          onClick={() => setShowLetter(true)}
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-[var(--pink)] to-[var(--pink-deep)] px-10 py-5 text-base font-medium text-white shadow-[0_15px_40px_-10px_rgba(244,114,182,0.7)] transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_-10px_rgba(244,114,182,0.9)] sm:px-14 sm:py-6 sm:text-lg"
        >
          <span className="relative z-10 flex items-center gap-3">
            <span className="animate-pulse">♥</span>
            click here if u love me
            <span className="animate-pulse">♥</span>
          </span>
          <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
        </button>
        <p className="mt-3 text-xs text-[var(--pink-deep)]/70">our secret message ✨</p>
      </section>

      {/* Love letter modal */}
      {showLetter && <LoveLetterModal onClose={() => setShowLetter(false)} />}

      {/* AI Chat floating widget */}
      {/* TODO: train this AI on the full WhatsApp chat export so it responds exactly like osama/marigona */}
      <ChatWidget open={showChat} onToggle={() => setShowChat((s) => !s)} />

      <footer className="relative z-10 pb-8 text-center text-xs text-[var(--pink-deep)]/60">
        made with love, just for u marigona ♥
      </footer>
    </main>
  );
}

/* ─── Floating hearts ─────────────────────────────────────────── */
function FloatingHearts() {
  const hearts = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 8}s`,
    duration: `${6 + Math.random() * 8}s`,
    size: `${0.8 + Math.random() * 1.4}rem`,
    opacity: 0.15 + Math.random() * 0.25,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute bottom-0 animate-float-up select-none"
          style={{
            left: h.left,
            animationDelay: h.delay,
            animationDuration: h.duration,
            fontSize: h.size,
            opacity: h.opacity,
            color: "var(--pink-deep)",
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

/* ─── Love letter modal ───────────────────────────────────────── */
function LoveLetterModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-8 shadow-[0_30px_80px_-10px_rgba(244,114,182,0.5)] ring-1 ring-pink-100 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-pink-300 transition hover:text-[var(--pink-deep)]"
          aria-label="close"
        >
          ✕
        </button>
        <p className="mb-4 text-center text-2xl">💌</p>
        <h2 className="mb-6 text-center font-serif text-2xl font-light text-[var(--pink-deep)] sm:text-3xl">
          for marigona, with love
        </h2>
        <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground sm:text-base">
          {LOVE_LETTER}
        </p>
        <p className="mt-6 text-right font-serif italic text-[var(--pink-deep)]">— osama ♥</p>
      </div>
    </div>
  );
}

/* ─── Chat widget ─────────────────────────────────────────────── */
function ChatWidget({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  const sendChatFn = useServerFn(sendChat);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: "assistant", content: "hey bby 💕 its me osama, ask me anything u want 🥺" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    const next: ChatMsg[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setLoading(true);
    try {
      const reply = await sendChatFn({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "oops something went wrong 😢 try again bby" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={onToggle}
        className="fixed bottom-5 right-3 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--pink-deep)] text-2xl text-white shadow-[0_8px_30px_-4px_rgba(244,114,182,0.7)] transition-transform hover:scale-110 active:scale-95 sm:right-5 sm:h-16 sm:w-16"
        aria-label="toggle chat"
      >
        {open ? "✕" : "💬"}
      </button>

      {/* Chat panel */}
      <div
        className={`fixed bottom-24 right-3 z-40 flex w-[calc(100vw-1.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-10px_rgba(244,114,182,0.5)] ring-1 ring-pink-100 transition-all duration-500 sm:right-5 ${
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        style={{ height: "70vh", maxHeight: "560px" }}
      >
        <div className="bg-gradient-to-r from-[var(--pink)] to-[var(--pink-deep)] px-5 py-4 text-white">
          <p className="text-sm opacity-80">chat with</p>
          <p className="font-serif text-lg italic">ai osama 💕</p>
        </div>
        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-[#fff8fb] px-4 py-4">
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm leading-snug ${
                  m.role === "user"
                    ? "rounded-br-sm bg-gradient-to-br from-[var(--pink)] to-[var(--pink-deep)] text-white"
                    : "rounded-bl-sm bg-white text-[var(--pink-deep)] shadow-sm ring-1 ring-pink-100"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 shadow-sm ring-1 ring-pink-100">
                <span className="inline-flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--pink-deep)]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--pink-deep)]" style={{ animationDelay: "0.15s" }} />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-[var(--pink-deep)]" style={{ animationDelay: "0.3s" }} />
                </span>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSend} className="flex gap-2 border-t border-pink-100 bg-white p-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="say smth bby..."
            className="flex-1 rounded-full border border-pink-100 bg-[#fff8fb] px-4 py-2 text-sm text-[var(--pink-deep)] placeholder-pink-300 outline-none focus:border-[var(--pink-deep)]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-full bg-gradient-to-br from-[var(--pink)] to-[var(--pink-deep)] px-5 py-2 text-sm font-medium text-white transition disabled:opacity-50"
          >
            send
          </button>
        </form>
      </div>
    </>
  );
}
