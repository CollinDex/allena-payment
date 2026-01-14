import { Request, Response, NextFunction } from 'express';
import { CallService } from '../services/call.service';
import { sendJsonResponse } from '../utils/send-response';

const callService = new CallService();

export const initiateCall = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
	try {
		const callerId = req.user.user_id;
		const { calleeId, metadata } = req.body;
		if (!calleeId) return sendJsonResponse(res, 400, 'Missing calleeId');
		const session = await callService.createSession(callerId, calleeId, metadata);
		return sendJsonResponse(res, 201, 'Call session created', { session });
	} catch (error) {
		next(error);
	}
};

export const updateCall = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
	try {
		const { sessionId } = req.params;
		const updates = req.body;
		const session = await callService.updateSession(sessionId, updates);
		if (!session) return sendJsonResponse(res, 404, 'Session not found');
		return sendJsonResponse(res, 200, 'Session updated', { session });
	} catch (error) {
		next(error);
	}
};

export const getCall = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
	try {
		const { sessionId } = req.params;
		const session = await callService.getSession(sessionId);
		if (!session) return sendJsonResponse(res, 404, 'Session not found');
		return sendJsonResponse(res, 200, 'Session retrieved', { session });
	} catch (error) {
		next(error);
	}
};
