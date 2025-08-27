import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card shadow-sm sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold font-headline text-primary">
            Capstone Connector
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/" className="font-headline">Home</Link>
          </Button>
          <Button variant="default" asChild className="bg-accent hover:bg-accent/90">
            <Link href="/submit" className="font-headline">Submit Project</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
