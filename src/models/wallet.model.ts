import { Schema, model } from 'mongoose';
import { IWallet, ITransaction } from '../types';

const transactionSchema = new Schema<ITransaction>(
	{
		type: { type: String, enum: ['credit', 'debit'], required: true },
		amount: { type: Number, required: true },
		reference: { type: String }
	},
	{ timestamps: { createdAt: true, updatedAt: false } }
);

const walletSchema = new Schema<IWallet>(
	{
		userId: { type: String, required: true, unique: true },
		balance: { type: Number, default: 0 },
		currency: { type: String, default: 'NGN' },
		transactions: { type: [transactionSchema], default: [] }
	},
	{ timestamps: true }
);

export const Wallet = model<IWallet>('Wallet', walletSchema);
