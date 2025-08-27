import { SubmitForm } from '@/components/submit-form';

export default function SubmitProjectPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 md:px-6 py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline">Submit Your Capstone Project</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Share your project with the community and find a group to continue your work.
        </p>
      </div>
      <SubmitForm />
    </div>
  );
}
