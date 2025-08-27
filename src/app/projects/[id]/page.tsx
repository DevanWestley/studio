import { projects } from '@/lib/projects';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Users, Recycle, HeartPulse, Building, Car, Mail, FileText, Lightbulb } from 'lucide-react';
import type { Project } from '@/lib/types';

const themeIcons: Record<Project['theme'], React.ReactNode> = {
  'Health': <HeartPulse className="h-5 w-5" />,
  'Waste Management': <Recycle className="h-5 w-5" />,
  'Smart City': <Building className="h-5 w-5" />,
  'Environmentally Friendly Transportation': <Car className="h-5 w-5" />,
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = projects.find(p => p.id === params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Projects
        </Link>
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden mb-6">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint={project.imageHint}
            />
          </div>
          <h1 className="font-headline text-4xl font-bold mb-2">{project.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              <span className="font-semibold">{project.group}</span>
            </div>
            <div className="flex items-center gap-2">
              {themeIcons[project.theme]}
              <Badge variant="secondary" className="text-base">{project.theme}</Badge>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Project Description
              </CardTitle>
            </CardHeader>
            <CardContent className="text-base leading-relaxed space-y-4">
              <p>{project.description}</p>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {project.continuationRequirements && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Lightbulb className="h-6 w-6 text-primary" />
                  Continuation Needs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.continuationRequirements}</p>
              </CardContent>
            </Card>
          )}

          {project.contact && (
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Mail className="h-6 w-6 text-primary" />
                  Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Get in touch with the project group to learn more.</p>
                <Button asChild className="mt-4 w-full bg-accent hover:bg-accent/90">
                  <a href={`mailto:${project.contact}`}>Email {project.group}</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
