import Link from "next/link";
import { ArrowRight, MessageCircleHeart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { GradientBackground } from "@/components/magicui/gradient-background";
import { FadeIn } from "@/components/magicui/fade-in";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-4">
      <GradientBackground />
      
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="container max-w-4xl mx-auto text-center space-y-8 z-10">
        <FadeIn delay={0.2}>
          <div className="inline-flex items-center rounded-full border border-indigo-200 bg-white/50 backdrop-blur-sm px-3 py-1 text-sm text-indigo-800 dark:border-indigo-800 dark:bg-white/5 dark:text-indigo-300">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            <span>AI Companion V1.0 Demo</span>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.4} className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 dark:from-violet-400 dark:via-indigo-400 dark:to-cyan-300 animate-in fade-in zoom-in duration-1000">
            GuppShupp
          </h1>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground">
            Your AI Lifelong Friend
          </p>
        </FadeIn>

        <FadeIn delay={0.6}>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground/80 leading-relaxed text-balance">
            A companion that listens, remembers, and adapts to you. Experience a connection that grows deeper with every conversation.
          </p>
        </FadeIn>

        <FadeIn delay={0.8} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link href="/demo">
            <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40">
              Start Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="lg" className="rounded-full text-lg hover:bg-white/20 dark:hover:bg-white/10">
            Learn More
          </Button>
        </FadeIn>
      </div>

      {/* Decorative footer elements */}
      <div className="absolute bottom-10 animate-bounce delay-1000 opacity-50">
         <MessageCircleHeart className="h-8 w-8 text-primary/50" />
      </div>
    </main>
  );
}
