import { Router } from 'express';
import { initiateCall, updateCall, getCall } from '../controllers/call.controller';
import { authMiddleware } from '../middleware/auth';
import { validateData } from '../middleware/validationMiddleware';
import initiateCallSchema, { updateCallSchema } from '../validation-schema/call.schema';

const callRoute = Router();

callRoute.post('/calls/initiate', authMiddleware, validateData(initiateCallSchema), initiateCall);
callRoute.patch('/calls/:sessionId', authMiddleware, validateData(updateCallSchema), updateCall);
callRoute.get('/calls/:sessionId', authMiddleware, getCall);

export { callRoute };
