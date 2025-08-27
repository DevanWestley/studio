'use server';
import { generateProjectSummary } from "@/ai/flows/generate-project-summary";
import { z } from 'zod';

const SummaryInputSchema = z.object({
    projectProposalDocument: z.string().startsWith('data:'),
});

export async function getSummary(data: { projectProposalDocument: string }): Promise<{ summary?: string; error?: string }> {
    const parsed = SummaryInputSchema.safeParse(data);
    if (!parsed.success) {
        return { error: 'Invalid input. Please provide a valid data URI.' };
    }

    try {
        const result = await generateProjectSummary({
            projectProposalDocument: parsed.data.projectProposalDocument,
        });
        return { summary: result.summary };
    } catch (e) {
        console.error(e);
        return { error: 'Failed to generate summary. The document may be corrupted or in an unsupported format.' };
    }
}
