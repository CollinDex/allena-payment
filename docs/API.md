# API Reference — AIleana Payments & Calls

Base path: `/api/v1`

Authentication

1) POST /auth/signUp
- Body (application/json):
  {
    "username": "alice",
    "email": "alice@example.com",
    "password": "secret",
    "role": "user"
  }
- Response 201:
  {
    "status": "success",
    "message": "User Created Successfully",
    "status_code": 201,
    "data": { "user": { "id": "...", "username": "alice", "email": "alice@example.com" }, "access_token": "..." }
  }

2) POST /auth/signIn
- Body: { "email": "alice@example.com", "password": "secret" }
- Response 200: returns `access_token` and user info.

Using the token
- Include header: `Authorization: Bearer <access_token>`

Wallet

1) GET /wallet
- Auth required
- Returns user's wallet (created if missing)
- Response 200: `{ data: { wallet: { userId, balance, currency, transactions } } }`

2) POST /wallet/fund
- Auth required
- Body: `{ "amount": 1000 }`
- Behavior: initiates a mocked provider call, immediately verifies, and credits the wallet for assessment purposes.
- Response 200: updated wallet

Calls (REST signaling)

1) POST /calls/initiate
- Auth required
- Body: `{ "calleeId": "<user-id>", "metadata": { ... } }`
- Response 201: `{ data: { session } }` where `session` contains `sessionId` and `status: initiated`.

2) PATCH /calls/:sessionId
- Auth required
- Body: `{ "status": "ongoing" }` or `{ "status": "ended" }`
- Response 200: updated session

3) GET /calls/:sessionId
- Auth required
- Response 200: session record

Notes
- Payment provider is mocked at `src/services/payment.provider.ts`.
- For production: replace the mock with real provider integration and implement webhook verification.

Webhook (provider callbacks)

- `POST /wallet/webhook` — endpoint for payment provider callbacks (mock)
  - Body example: `{ "providerReference": "mock_123", "status": "success", "amount": 5000, "userId": "<user-id>" }`
  - Behavior: on `status: "success"` the service credits the wallet with the provided `amount` for the given `userId`.
  - Note: In production this endpoint must verify provider signatures and should not accept arbitrary credits without validation.

Examples (curl)

Sign in:

```bash
curl -X POST http://localhost:3000/api/v1/auth/signIn \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret"}'
```

Fund wallet:

```bash
curl -X POST http://localhost:3000/api/v1/wallet/fund \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"amount":5000}'
```

Initiate call:

```bash
curl -X POST http://localhost:3000/api/v1/calls/initiate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"calleeId":"<user-id>","metadata":{}}'
```
