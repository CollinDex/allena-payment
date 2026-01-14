import { Router } from 'express';
import { initiateCall, updateCall, getCall } from '../controllers/call.controller';
import { authMiddleware } from '../middleware/auth';

const callRoute = Router();

callRoute.post('/calls/initiate', authMiddleware, initiateCall);
callRoute.patch('/calls/:sessionId', authMiddleware, updateCall);
callRoute.get('/calls/:sessionId', authMiddleware, getCall);

export { callRoute };
