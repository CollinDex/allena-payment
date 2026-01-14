import { Router } from "express";
import { getWallet, fundWallet, walletWebhook } from "../controllers/wallet.controller";
import { authMiddleware } from "../middleware/auth";

const walletRoute = Router();

walletRoute.get("/wallet", authMiddleware, getWallet);
walletRoute.post("/wallet/fund", authMiddleware, fundWallet);

// Provider webhook (no auth) - for mocked payment provider callbacks
walletRoute.post("/wallet/webhook", walletWebhook);

export { walletRoute };
