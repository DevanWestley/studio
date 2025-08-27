import { Leaf } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto py-6 px-4 md:px-6 text-center text-sm text-muted-foreground">
        <div className="flex justify-center items-center gap-2 mb-2">
           <Leaf className="h-5 w-5 text-primary" />
           <p className="font-headline font-semibold text-primary">Capstone Connector</p>
        </div>
        <p>&copy; {new Date().getFullYear()} Capstone Connector. All rights reserved.</p>
        <p className="mt-1">Fostering sustainability, one project at a time.</p>
      </div>
    </footer>
  );
}
