import Link from 'next/link';
import { Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-40 w-full border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-primary">MindfulChat</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/diagnosis" className="text-muted-foreground transition-colors hover:text-foreground">
            Symptom Checker
          </Link>
          <Link href="/mood-tracker" className="text-muted-foreground transition-colors hover:text-foreground">
            Mood Tracker
          </Link>
          <Link href="/health-info" className="text-muted-foreground transition-colors hover:text-foreground">
            Health Library
          </Link>
        </nav>
        <Link href="/diagnosis">
            <Button>Get Started</Button>
        </Link>
      </div>
    </header>
  );
}
