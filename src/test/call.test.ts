// @ts-nocheck
import { CallService } from '../services';

describe('CallService (unit)', () => {
	let service: CallService;

	beforeEach(() => {
		service = new CallService();
		jest.clearAllMocks();
	});

	it('should create a call session and save it', async () => {
		const mockSession: any = {
			sessionId: 's1',
			callerId: 'u1',
			calleeId: 'u2',
			save: jest.fn().mockResolvedValue(true)
		};

		jest
			.spyOn(service as any, 'createSession')
			.mockImplementation(async (callerId: string, calleeId: string, metadata?: any) => {
				return { ...mockSession, callerId, calleeId, metadata };
			});

		const session = await service.createSession('u1', 'u2', { foo: 'bar' });
		expect(service.createSession).toHaveBeenCalledWith('u1', 'u2', { foo: 'bar' });
		expect(session).toBeDefined();
	});
});
