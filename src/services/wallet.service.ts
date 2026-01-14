import { Wallet } from '../models/wallet.model';
import { IWallet } from '../types';

export class WalletService {
	public async getWalletByUser(userId: string): Promise<IWallet | null> {
		return Wallet.findOne({ userId }).lean();
	}

	public async createWalletForUser(userId: string) {
		const wallet = new Wallet({ userId, balance: 0 });
		return wallet.save();
	}

	public async getOrCreateWallet(userId: string) {
		let wallet = await Wallet.findOne({ userId });
		if (!wallet) {
			wallet = (await this.createWalletForUser(userId)) as any;
		}
		return wallet;
	}

	public async fundWallet(userId: string, amount: number, reference?: string) {
		const wallet = await this.getOrCreateWallet(userId);
		wallet.balance = (wallet.balance || 0) + amount;
		wallet.transactions.push({ type: 'credit', amount, reference });
		await wallet.save();
		return wallet;
	}

	public async debitWallet(userId: string, amount: number, reference?: string) {
		const wallet = await this.getOrCreateWallet(userId);
		wallet.balance = (wallet.balance || 0) - amount;
		wallet.transactions.push({ type: 'debit', amount, reference });
		await wallet.save();
		return wallet;
	}
}
