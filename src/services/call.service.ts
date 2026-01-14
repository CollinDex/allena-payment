import { CallSession } from '../models/callSession.model';
import { ICallSession } from '../types';

export class CallService {
	public async createSession(callerId: string, calleeId: string, metadata?: any) {
		const session = new CallSession({
			sessionId: `sess_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
			callerId,
			calleeId,
			status: 'initiated',
			metadata
		});
		return session.save();
	}

	public async updateSession(sessionId: string, updates: Partial<ICallSession>) {
		return CallSession.findOneAndUpdate({ sessionId }, updates, { new: true });
	}

	public async getSession(sessionId: string) {
		return CallSession.findOne({ sessionId }).lean();
	}
}
