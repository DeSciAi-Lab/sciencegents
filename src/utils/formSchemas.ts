
import * as z from 'zod';

export const capabilityFormSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters.').max(50, 'Name must be less than 50 characters.'),
  id: z.string().min(3, 'ID must be at least 3 characters.').max(30, 'ID must be less than 30 characters.').regex(/^[a-z0-9-]+$/, 'ID must contain only lowercase letters, numbers, and hyphens.'),
  domain: z.string().min(1, 'Domain is required.'),
  description: z.string().min(20, 'Description must be at least 20 characters.').max(500, 'Description must be less than 500 characters.'),
  fee: z.string().refine(val => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: 'Fee must be a positive number.',
  }),
  creatorAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address.'),
});

export type CapabilityFormValues = z.infer<typeof capabilityFormSchema>;
