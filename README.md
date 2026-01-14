# AIleana — Payments & Calls (Backend)

This repository is a small backend service implementing a wallet/payment flow and REST-based call session signaling for the AIleana assessment.

Tech Stack

- Node.js (TypeScript) + Express
- MongoDB (Mongoose)
- Auth: JWT
- Payment provider: OnePipe (mocked)

Quick start

1. Install

```bash
npm install
```

2. Environment

Create a `.env` (or export) with at least:

- `PORT` (default 8000)
- `MONGO_URI` or `MONGO_HOST`/`MONGO_PORT`/`MONGO_DB_NAME`
- `TOKEN_SECRET` (JWT secret)
- `TOKEN_EXPIRY` (e.g. `1h`)

3. Run

```bash
npm run start:dev
```

4. Tests

```bash
npm test
```

API overview

Base path: `/api/v1`

Auth

- `POST /auth/signUp` — create user
- `POST /auth/signIn` — login, returns `access_token`

Wallet (requires `Authorization: Bearer <token>`)

- `GET /wallet` — get or create user's wallet
- `POST /wallet/fund` — fund wallet (mocked provider)

Calls (requires `Authorization: Bearer <token>`)

- `POST /calls/initiate` — create call session (REST signaling)
- `PATCH /calls/:sessionId` — update session status
- `GET /calls/:sessionId` — get session

Verify Payment (requires `Authorization: Bearer <token>`)

- `POST /wallet/fund` immediately verifies and credits for the assessment;
- Note Payment provider integration is mocked

See API Docs and Postman Collection at

- [Postman Collection](docs/AIleana%20Payments%20&%20Calls%20API.postman_collection.json)
- [API docs](docs/API.md)
