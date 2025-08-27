import { ProjectList } from "@/components/project-list";
import { projects } from "@/lib/projects";
import { Leaf } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <section className="py-12 md:py-20 text-center bg-card border-b">
        <div className="container mx-auto px-4 md:px-6">
          <Leaf className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tight">
            Discover Sustainable Capstone Projects
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Explore innovative student projects focused on sustainability. Find a project to continue, or get inspired for your own.
          </p>
        </div>
      </section>
      
      <ProjectList projects={projects} />
    </div>
  );
}
