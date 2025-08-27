'use client';

import { useState } from 'react';
import type { Project, Theme } from '@/lib/types';
import { ProjectCard } from './project-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';

const themes: Theme[] = ['Health', 'Waste Management', 'Smart City', 'Environmentally Friendly Transportation'];

export function ProjectList({ projects }: { projects: Project[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.group.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = activeTheme ? project.theme === activeTheme : true;
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-card rounded-lg shadow">
        <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search by keyword, title, or group..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full"
            />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
            <p className="font-headline font-semibold mr-2">Filter by theme:</p>
            {themes.map(theme => (
                <Button
                    key={theme}
                    variant={activeTheme === theme ? 'default' : 'outline'}
                    onClick={() => setActiveTheme(activeTheme === theme ? null : theme)}
                    className="transition-all"
                >
                    {theme}
                </Button>
            ))}
            {activeTheme && (
                <Button variant="ghost" size="icon" onClick={() => setActiveTheme(null)}>
                    <X className="h-4 w-4"/>
                    <span className="sr-only">Clear filter</span>
                </Button>
            )}
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-xl font-headline text-muted-foreground">No projects found.</p>
            <p className="mt-2">Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
