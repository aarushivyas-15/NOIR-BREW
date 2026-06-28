import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
const faqs = [
  {
    q: "What makes NOIR BREW special?",
    a: "We focus on premium coffee artistry, from bean selection to brewing perfection.",
  },
  {
    q: "Do you offer delivery?",
    a: "Yes, we offer fast delivery in selected areas with fresh coffee packs.",
  },
  {
    q: "Are your coffee beans organic?",
    a: "We source high-quality organic beans directly from trusted farms.",
  },
  {
    q: "What is the timing of Cafe?",
    a: "Cafe is open everyday 10am to 9pm.",
  },
];

export default function FAQChatPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hi 👋 I’m Noir Brew Assistant. Ask me anything!" },
  ]);

  const [input, setInput] = useState("");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 🤖 API function (replace later with real backend)
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userInput = input;

    setMessages((prev) => [...prev, { role: "user", text: userInput }]);

    setInput("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: data.reply || "No response received.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Failed to connect to AI server.",
        },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-20 px-6">
      <div className="mb-6 py-4">
        {/* <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
          style={{ textDecoration: "none", width: "fit-content" }}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="text-sm">Back to Home</span>
        </Link> */}
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span className="text-sm">Back to Home</span>
        </Link>
      </div>
      {/* <Link
        to="/"
        className="text-2xl font-serif font-bold tracking-wider text-center"
        style={{ color: "var(--foreground)", textDecoration: "none" }}
      >
        NOIR<span style={{ color: "var(--primary)" }}>BREW</span>
      </Link> */}
      {/* PAGE TITLE */}
      <div className="text-center mb-16 mt-0">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-0 py-0 mt-0">
          Help Center
        </h1>
        <p className="text-muted-foreground text-lg"></p>
      </div>

      {/* GRID LAYOUT */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* ================= FAQ ================= */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">FAQs</h2>

          <div className="space-y-4">
            {faqs.map((item, index) => (
              <div
                key={index}
                className="border border-muted rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-5 py-4 hover:bg-muted/10 transition"
                >
                  <span className="font-medium">{item.q}</span>
                  <span className="text-primary text-xl">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>

                {openIndex === index && (
                  <div className="px-5 pb-4 text-muted-foreground text-sm">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= CHATBOT ================= */}
        <div className="border border-muted rounded-2xl flex flex-col h-[400px] overflow-hidden ">
          {/* HEADER */}
          <div className="p-4 border-b border-muted font-medium">
            Noir Brew AI Assistant
          </div>

          {/* MESSAGES */}
          {/* <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-3 py-2 rounded-lg max-w-[75%] ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-white max-w-[80%] md:max-w-[70%]"
                    : "bg-muted text-foreground"
                }`}
              >
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            ))}
          </div> */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm px-4 py-4 rounded-xl wrap-break-words whitespace-pre-wrap overflow-hidden shadow-sm ${
                  m.role === "user"
                    ? "ml-auto bg-[#b89667] text-white max-w-[80%] md:max-w-[70%]"
                    : "bg-muted text-foreground max-w-[90%] md:max-w-[80%]"
                }`}
              >
                <ReactMarkdown>{m.text}</ReactMarkdown>
              </div>
            ))}
          </div>

          {/* INPUT */}
          <div className="p-3 border-t border-muted flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              className="flex-1 px-3 py-2 text-sm border rounded-lg bg-background outline-none focus:outline-none focus:ring-0 shadow-2xl"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-[#b89667] text-white rounded-lg text-sm"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
