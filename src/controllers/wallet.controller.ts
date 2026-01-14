import { Request, Response, NextFunction } from 'express';
import { WalletService } from '../services/wallet.service';
import { mockInitiatePayment, mockVerifyPayment } from '../services/payment.provider';
import { sendJsonResponse } from '../utils/send-response';

const walletService = new WalletService();

export const getWallet = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
	try {
		const userId = req.user.user_id;
		const wallet = await walletService.getOrCreateWallet(userId);
		sendJsonResponse(res, 200, 'Wallet retrieved', { wallet });
	} catch (error) {
		next(error);
	}
};

export const walletWebhook = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { providerReference, status, amount, userId } = req.body;

		if (!providerReference || !status) {
			return res.status(400).json({ success: false, message: 'Invalid webhook payload' });
		}

		if (status === 'success') {
			if (!userId || !amount) {
				return res.status(400).json({ success: false, message: 'Missing userId or amount for webhook credit' });
			}

			await walletService.fundWallet(userId, Number(amount), providerReference);
			return res.status(200).json({ success: true, message: 'Wallet credited' });
		}
		return res.status(200).json({ success: true, message: 'Webhook received' });
	} catch (error) {
		next(error);
	}
};

export const fundWallet = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
	try {
		const userId = req.user.user_id;
		const { amount } = req.body;
		if (!amount || amount <= 0) {
			return sendJsonResponse(res, 400, 'Invalid amount');
		}

		const providerResp = await mockInitiatePayment(amount, userId);

		const verify = await mockVerifyPayment(providerResp.providerReference);
		if (verify.status === 'success') {
			const wallet = await walletService.fundWallet(userId, amount, verify.providerReference);
			return sendJsonResponse(res, 200, 'Wallet funded successfully', { wallet });
		}

		sendJsonResponse(res, 500, 'Payment failed');
	} catch (error) {
		next(error);
	}
};
