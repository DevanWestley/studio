export type Theme = 'Health' | 'Waste Management' | 'Smart City' | 'Environmentally Friendly Transportation';

export type Project = {
  id: string;
  title: string;
  group: string;
  theme: Theme;
  summary: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  proposalUrl?: string; // Add this line
  continuationRequirements?: string;
  contact?: string;
};
