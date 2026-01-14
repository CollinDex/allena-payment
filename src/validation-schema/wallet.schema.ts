import { z } from 'zod';

export const fundWalletSchema = z.object({
	amount: z
		.number({ invalid_type_error: 'amount must be a number' })
		.positive({ message: 'amount must be greater than zero' })
});

export const webhookSchema = z.object({
	providerReference: z.string().min(1, { message: 'providerReference is required' }),
	status: z.string().min(1, { message: 'status is required' }),
	amount: z.number().optional(),
	userId: z.string().optional()
});

export type FundWalletInput = z.infer<typeof fundWalletSchema>;
export type WebhookInput = z.infer<typeof webhookSchema>;

export default fundWalletSchema;
