import { Router } from 'express';
import { getWallet, fundWallet, walletWebhook } from '../controllers/wallet.controller';
import { authMiddleware } from '../middleware/auth';
import { validateData } from '../middleware/validationMiddleware';
import fundWalletSchema, { webhookSchema } from '../validation-schema/wallet.schema';

const walletRoute = Router();

walletRoute.get('/wallet', authMiddleware, getWallet);
walletRoute.post('/wallet/fund', authMiddleware, validateData(fundWalletSchema), fundWallet);

// Provider webhook (no auth) - for mocked payment provider callbacks
walletRoute.post('/wallet/webhook', validateData(webhookSchema), walletWebhook);

export { walletRoute };
