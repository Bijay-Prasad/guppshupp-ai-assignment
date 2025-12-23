"use client"

import { useState, useRef, useEffect } from "react"
import { Send, User, Bot, Sparkles, Smile, GraduationCap, Stethoscope } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { api, ChatResponse } from "@/lib/api"
import { cn } from "@/lib/utils"

type Message = {
  role: "user" | "assistant";
  content: string;
  personality?: string;
}

const PERSONALITIES = [
  { id: "mentor", label: "Mentor", icon: GraduationCap, color: "text-blue-500" },
  { id: "witty", label: "Witty Friend", icon: Sparkles, color: "text-amber-500" },
  { id: "therapist", label: "Therapist", icon: Stethoscope, color: "text-green-500" },
] as const

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm GuppShupp, your lifelong friend. How are you feeling today?", personality: "mentor" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [personality, setPersonality] = useState<"mentor" | "witty" | "therapist">("mentor")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      // Simple scroll to bottom
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    const userMsg = input
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMsg }])
    setLoading(true)

    try {
      const res = await api.chat({ message: userMsg, personality })
      setMessages(prev => [...prev, { role: "assistant", content: res.reply, personality: personality }])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Card className="h-full flex flex-col border-border/50 bg-background/60 backdrop-blur-xl shadow-xl overflow-hidden">
      <CardHeader className="p-4 border-b bg-background/50">
        <Tabs value={personality} onValueChange={(v: any) => setPersonality(v)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            {PERSONALITIES.map(p => (
              <TabsTrigger key={p.id} value={p.id} className="gap-2">
                <p.icon className={cn("h-4 w-4", p.color)} />
                <span className="hidden sm:inline">{p.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="flex-1 p-0 overflow-hidden relative">
        <ScrollArea ref={scrollRef} className="h-full p-4">
          <div className="space-y-4">
            {messages.map((msg, i) => {
              const personalityData = msg.personality ? PERSONALITIES.find(p => p.id === msg.personality) : null;

              return (
                <div
                  key={i}
                  className={cn(
                    "flex w-full gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300",
                    msg.role === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {msg.role === "assistant" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-5 w-5 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-none"
                        : "bg-muted/80 backdrop-blur-sm text-foreground rounded-tl-none"
                    )}
                  >
                    <div className="markdown-content">
                      <ReactMarkdown
                        components={{
                          p: ({ children }: any) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
                          ul: ({ children }: any) => <ul className="list-disc pl-4 mb-2 space-y-1">{children}</ul>,
                          ol: ({ children }: any) => <ol className="list-decimal pl-4 mb-2 space-y-1">{children}</ol>,
                          li: ({ children }: any) => <li>{children}</li>,
                          strong: ({ children }: any) => <span className="font-semibold">{children}</span>,
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                    {personalityData && (
                      <div className="mt-2 flex items-center gap-1.5 text-[11px] font-medium opacity-80">
                        <personalityData.icon className={cn("h-3 w-3", personalityData.color)} />
                        <span>{personalityData.label}</span>
                      </div>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                      <User className="h-5 w-5 text-primary-foreground" />
                    </div>
                  )}
                </div>
              )
            })}
            {loading && (
              <div className="flex w-full gap-2 justify-start animate-pulse">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div className="bg-muted px-4 py-2 rounded-2xl rounded-tl-none flex items-center gap-1">
                  <span className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce delay-0" />
                  <span className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce delay-100" />
                  <span className="h-2 w-2 bg-foreground/30 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-4 bg-background/50 border-t">
        <div className="flex w-full items-center space-x-2">
          <Input
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-background/80"
            disabled={loading}
          />
          <Button size="icon" onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
