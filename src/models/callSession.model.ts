import { Schema, model } from 'mongoose';
import { ICallSession } from '../types';

const callSessionSchema = new Schema<ICallSession>(
	{
		sessionId: { type: String, required: true, unique: true },
		callerId: { type: String, required: true },
		calleeId: { type: String, required: true },
		status: { type: String, required: true },
		startedAt: { type: Date },
		endedAt: { type: Date },
		metadata: { type: Schema.Types.Mixed }
	},
	{ timestamps: true }
);

export const CallSession = model<ICallSession>('CallSession', callSessionSchema);
