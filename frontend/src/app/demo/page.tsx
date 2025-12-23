import { MemoryPanel } from "@/components/demo/memory-panel";
import { ChatInterface } from "@/components/demo/chat-interface";
import { ThemeToggle } from "@/components/theme-toggle";
import { GradientBackground } from "@/components/magicui/gradient-background";
import { FadeIn } from "@/components/magicui/fade-in";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DemoPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <GradientBackground />
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/10 bg-background/30 backdrop-blur-md">
        <div className="container h-16 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
                 <Link href="/">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                 </Link>
                 <span className="font-semibold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">GuppShupp Demo</span>
            </div>
            <ThemeToggle />
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 container mx-auto pt-24 pb-8 px-4 flex flex-col md:flex-row gap-6 md:h-[calc(100vh-2rem)]">
        {/* Left Panel: Memory */}
        <div className="w-full md:w-1/3 h-auto min-h-[400px] md:h-full flex flex-col">
            <FadeIn delay={0.2} className="h-full">
                <MemoryPanel />
            </FadeIn>
        </div>

        {/* Right Panel: Chat */}
        <div className="w-full md:w-2/3 h-[600px] md:h-full flex flex-col">
            <FadeIn delay={0.4} className="h-full">
                <ChatInterface />
            </FadeIn>
        </div>
      </main>
    </div>
  );
}
