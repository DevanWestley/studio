'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { getSummary } from "@/app/actions";
import { useState } from "react";
import { Loader2, Wand2 } from "lucide-react";
import type { Theme } from "@/lib/types";

const themes: Theme[] = ['Health', 'Waste Management', 'Smart City', 'Environmentally Friendly Transportation'];

const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  group: z.string().min(2, "Group name is required."),
  theme: z.enum(themes, { required_error: "Please select a theme." }),
  summary: z.string().min(20, "Summary must be at least 20 characters long.").max(500, "Summary must be less than 500 characters."),
  proposal: z.any().refine(file => file?.length === 1, "Proposal document is required.").optional(),
});

export function SubmitForm() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      group: "",
      summary: "",
    },
  });

  const handleGenerateSummary = async () => {
    const fileList = form.getValues("proposal");
    if (!fileList || fileList.length === 0) {
      toast({
        title: "No file selected",
        description: "Please upload a project proposal document to generate a summary.",
        variant: "destructive",
      });
      return;
    }
    const file = fileList[0];

    setIsGenerating(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result as string;
      const result = await getSummary({ projectProposalDocument: base64 });

      if (result.error) {
        toast({
          title: "Error Generating Summary",
          description: result.error,
          variant: "destructive",
        });
      } else if (result.summary) {
        form.setValue("summary", result.summary);
        toast({
          title: "Summary Generated!",
          description: "The summary has been populated below. You can edit it before submitting.",
        });
      }
      setIsGenerating(false);
    };
    reader.onerror = () => {
        setIsGenerating(false);
        toast({
            title: "File Read Error",
            description: "Could not read the selected file.",
            variant: "destructive",
        });
    };
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Project Submitted!",
      description: "Your project has been submitted for review. (Check console for data)",
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Project Title</FormLabel>
              <FormControl>
                <Input placeholder="e.g., AI-Powered Telemedicine Platform" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-8">
            <FormField
            control={form.control}
            name="group"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="font-headline">Group Name</FormLabel>
                <FormControl>
                    <Input placeholder="e.g., Health Innovators" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
                <FormItem>
                <FormLabel className="font-headline">Project Theme</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        {themes.map(theme => <SelectItem key={theme} value={theme}>{theme}</SelectItem>)}
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>

        <FormField
          control={form.control}
          name="proposal"
          render={({ field: { onChange, ...fieldProps }}) => (
            <FormItem>
              <FormLabel className="font-headline">Project Proposal Document</FormLabel>
              <FormControl>
                <Input 
                  type="file"
                  {...fieldProps}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => onChange(e.target.files)}
                />
              </FormControl>
              <FormDescription>
                Upload your proposal to automatically generate a summary.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button 
            type="button" 
            onClick={handleGenerateSummary} 
            disabled={isGenerating} 
            variant="outline"
            className="flex items-center gap-2"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="h-4 w-4" />
          )}
          Generate Summary with AI
        </Button>

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-headline">Project Summary</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A short, engaging summary of your project..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This summary will be displayed on the project listing.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="lg" className="w-full md:w-auto bg-accent hover:bg-accent/90">Submit Project</Button>
      </form>
    </Form>
  );
}
