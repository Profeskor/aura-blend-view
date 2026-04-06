import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Sparkles, Loader2, ArrowUp, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "assistant"; content: string };

interface InsightsChatbotProps {
  dashboardContext: string;
}

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const suggestedQuestions = [
  "What's the biggest risk in this scenario?",
  "Which months show the largest sales drop?",
  "How does GP% trend compare across seasons?",
  "Summarize the FY impact vs base",
];

const InsightsChatbot = ({ dashboardContext }: InsightsChatbotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const streamChat = async (allMessages: Message[]) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
      },
      body: JSON.stringify({ messages: allMessages, dashboardContext }),
    });

    if (!resp.ok || !resp.body) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || `Request failed (${resp.status})`);
    }

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let textBuffer = "";
    let assistantSoFar = "";
    let streamDone = false;

    while (!streamDone) {
      const { done, value } = await reader.read();
      if (done) break;
      textBuffer += decoder.decode(value, { stream: true });

      let newlineIndex: number;
      while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
        let line = textBuffer.slice(0, newlineIndex);
        textBuffer = textBuffer.slice(newlineIndex + 1);

        if (line.endsWith("\r")) line = line.slice(0, -1);
        if (line.startsWith(":") || line.trim() === "") continue;
        if (!line.startsWith("data: ")) continue;

        const jsonStr = line.slice(6).trim();
        if (jsonStr === "[DONE]") {
          streamDone = true;
          break;
        }

        try {
          const parsed = JSON.parse(jsonStr);
          const content = parsed.choices?.[0]?.delta?.content as string | undefined;
          if (content) {
            assistantSoFar += content;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantSoFar }];
            });
          }
        } catch {
          textBuffer = line + "\n" + textBuffer;
          break;
        }
      }
    }
  };

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(newMessages);
    } catch (e: any) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `⚠️ ${e.message || "Something went wrong. Please try again."}` },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* Floating toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-foreground text-background shadow-lg hover:bg-foreground/90 transition-colors"
          >
            <Sparkles className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel — Claude style, fixed size */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Chat container */}
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-6 right-6 z-50 flex w-[420px] flex-col rounded-2xl border border-border bg-card shadow-2xl"
              style={{ height: "min(640px, calc(100vh - 48px))" }}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
                    <Sparkles className="h-3.5 w-3.5 text-background" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">OmniLens AI</span>
                  <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
                    Scenario Insights
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <button
                      onClick={() => setMessages([])}
                      className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    >
                      <RotateCcw className="h-3 w-3" />
                      New chat
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages area */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto">
                <div className="mx-auto max-w-2xl px-4 py-8">
                  {/* Empty state */}
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-foreground mb-6">
                        <Sparkles className="h-7 w-7 text-background" />
                      </div>
                      <h2 className="text-xl font-semibold text-foreground mb-2">
                        What would you like to know?
                      </h2>
                      <p className="text-sm text-muted-foreground mb-8 text-center max-w-md">
                        Ask me about your scenario data — sales trends, GP margins, inventory risks, or any metric on your dashboard.
                      </p>
                      <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                        {suggestedQuestions.map((q) => (
                          <button
                            key={q}
                            onClick={() => sendMessage(q)}
                            className="text-left rounded-xl border border-border bg-card px-4 py-3.5 text-sm text-foreground hover:bg-muted/70 transition-colors leading-snug"
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Messages */}
                  {messages.map((msg, i) => (
                    <div key={i} className={`mb-6 ${msg.role === "user" ? "flex justify-end" : ""}`}>
                      {msg.role === "user" ? (
                        <div className="max-w-[80%] rounded-2xl bg-foreground text-background px-5 py-3 text-[0.9rem] leading-relaxed">
                          {msg.content}
                        </div>
                      ) : (
                        <div className="flex gap-3">
                          <div className="flex-shrink-0 mt-1">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground">
                              <Sparkles className="h-3 w-3 text-background" />
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 text-[0.9rem] leading-relaxed text-foreground prose prose-neutral max-w-none prose-p:my-2 prose-ul:my-2 prose-ol:my-2 prose-li:my-0.5 prose-headings:text-foreground prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-xs prose-pre:bg-muted prose-pre:rounded-xl">
                            <ReactMarkdown>{msg.content}</ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Thinking indicator */}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <div className="mb-6 flex gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-foreground">
                          <Sparkles className="h-3 w-3 text-background" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 py-2">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Input area — Claude style bottom bar */}
              <div className="border-t border-border/50 bg-background/90 backdrop-blur-md">
                <div className="mx-auto max-w-2xl px-4 py-4">
                  <div className="relative rounded-2xl border border-border bg-card shadow-sm focus-within:border-foreground/20 focus-within:shadow-md transition-all">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about your scenario data..."
                      disabled={isLoading}
                      rows={1}
                      className="w-full resize-none bg-transparent px-4 pt-3.5 pb-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
                    />
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                      <span className="text-[0.6rem] text-muted-foreground/50">
                        Shift+Enter for new line
                      </span>
                      <button
                        onClick={() => sendMessage(input)}
                        disabled={!input.trim() || isLoading}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground text-background transition-all hover:bg-foreground/90 disabled:opacity-30 disabled:bg-muted disabled:text-muted-foreground"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-center text-[0.6rem] text-muted-foreground/40 mt-2">
                    AI can make mistakes. Verify important data against the dashboard.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InsightsChatbot;
