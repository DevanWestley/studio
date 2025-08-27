import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Project } from '@/lib/types';
import { ArrowRight, Users, Recycle, HeartPulse, Building, Car } from 'lucide-react';

const themeIcons: Record<Project['theme'], React.ReactNode> = {
  'Health': <HeartPulse className="h-4 w-4" />,
  'Waste Management': <Recycle className="h-4 w-4" />,
  'Smart City': <Building className="h-4 w-4" />,
  'Environmentally Friendly Transportation': <Car className="h-4 w-4" />,
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="relative h-48 w-full mb-4">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover rounded-t-lg"
            data-ai-hint={project.imageHint}
          />
        </div>
        <div className="flex justify-between items-start">
            <CardTitle className="font-headline text-xl leading-tight">{project.title}</CardTitle>
            <Badge variant="secondary" className="flex items-center gap-2 shrink-0">
                {themeIcons[project.theme]}
                <span className="font-body">{project.theme}</span>
            </Badge>
        </div>
        <CardDescription className="flex items-center gap-2 pt-1 text-sm">
            <Users className="h-4 w-4"/>
            <span>{project.group}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{project.summary}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="link" className="p-0 h-auto text-accent">
          <Link href={`/projects/${project.id}`}>
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
