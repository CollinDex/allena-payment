// @ts-nocheck
import { WalletService } from '../services';

describe('WalletService (unit)', () => {
	let service: WalletService;

	beforeEach(() => {
		service = new WalletService();
		jest.clearAllMocks();
	});

	it('should fund an existing wallet by updating balance and saving', async () => {
		const mockWallet: any = {
			userId: 'u1',
			balance: 100,
			transactions: [],
			save: jest.fn().mockResolvedValue(true)
		};

		jest.spyOn(service, 'getOrCreateWallet').mockResolvedValue(mockWallet as any);

		const updated = await service.fundWallet('u1', 50, 'ref123');

		expect(service.getOrCreateWallet).toHaveBeenCalledWith('u1');
		expect(mockWallet.save).toHaveBeenCalled();
		expect(updated.balance).toEqual(150);
	});
});
