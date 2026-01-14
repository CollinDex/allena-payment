import { z } from 'zod';

export const initiateCallSchema = z.object({
	calleeId: z.string().min(1, { message: 'calleeId is required' }),
	metadata: z.record(z.any()).optional()
});

export const updateCallSchema = z.object({
	status: z.enum(['initiated', 'ongoing', 'ended', 'failed'])
});

export type InitiateCallInput = z.infer<typeof initiateCallSchema>;
export type UpdateCallInput = z.infer<typeof updateCallSchema>;

export default initiateCallSchema;
