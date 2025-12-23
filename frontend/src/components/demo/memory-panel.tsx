"use client"

import { useState } from "react"
import { Brain, Sparkles, Database } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { api, MemoryData } from "@/lib/api"
import { FadeIn, FadeInStagger, FadeInItem } from "@/components/magicui/fade-in"

export function MemoryPanel() {
  const [memory, setMemory] = useState<MemoryData | null>(null)
  const [loading, setLoading] = useState(false)

  const handleExtract = async () => {
    setLoading(true)
    try {
      const data = await api.extractMemory()
      setMemory(data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="h-full flex flex-col border-border/50 bg-background/60 backdrop-blur-xl shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-violet-500" />
          Memory Viewer
        </CardTitle>
        <CardDescription>
          See what your AI companion remembers about you.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4 overflow-hidden">
        {!memory ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">No Memory Extracted</h3>
              <p className="text-sm text-muted-foreground">
                Extract memory from past conversations to see personalized insights.
              </p>
            </div>
            <Button onClick={handleExtract} disabled={loading} className="w-full max-w-xs group">
              {loading ? (
                "Extracting..."
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" /> 
                  Extract Memory
                </>
              )}
            </Button>
          </div>
        ) : (
          <ScrollArea className="flex-1 pr-4">
            <FadeInStagger className="space-y-6">
              <FadeInItem>
                <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                        {memory.preferences.map((item, i) => (
                            <Badge key={i} variant="secondary" className="px-3 py-1 text-sm bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800">
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>
              </FadeInItem>

              <FadeInItem>
                <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Emotional Patterns</h4>
                    <div className="flex flex-wrap gap-2">
                         {memory.emotional_patterns.map((item, i) => (
                            <Badge key={i} variant="secondary" className="px-3 py-1 text-sm bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 border-pink-200 dark:border-pink-800">
                                {item}
                            </Badge>
                        ))}
                    </div>
                </div>
              </FadeInItem>

              <FadeInItem>
                <div className="space-y-2">
                    <h4 className="text-sm font-bold text-foreground/80 uppercase tracking-wider">Facts</h4>
                    <div className="space-y-2">
                        {memory.facts.length > 0 ? memory.facts.map((item, i) => (
                            <div key={i} className="bg-muted/70 p-3 rounded-md text-sm border border-border/60 text-foreground/90 font-medium">
                                {item}
                            </div>
                        )) : (
                            <div className="text-sm text-muted-foreground italic px-2">No specific facts extracted yet.</div>
                        )}
                    </div>
                </div>
              </FadeInItem>
            </FadeInStagger>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  )
}
