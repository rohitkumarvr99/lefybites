# दादी सूत्र (Dadi Sutra) - Sales & Delivery Web Platform

This is a premium, conversion-focused landing page, checkout, and automatic secure delivery system built for the Hindi Ayurvedic e-book **"दादी सूत्र (Dadi Sutra)"**.

## Tech Stack
- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS (v4) with custom Maroon (`#6b1f1f`), Gold (`#c79a3a`), and Cream (`#FAF7F2`) palette.
- **Database**: SQLite (via Prisma) for order and lead management.
- **Payments**: Razorpay (Primary) + Stripe (Optional, toggleable via environment variables).
- **Email Delivery**: Resend (via REST API or SDK) for automated receipt & secure download link delivery.
- **Security**: Node.js Web Crypto API (HMAC-SHA256) to sign download tokens (no external heavy JWT dependencies, compatible with Vercel Edge).

---

## Getting Started

### 1. Install Dependencies
Ensure you have Node.js 18+ installed. Run:
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in the required keys:
```bash
cp .env.example .env
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Prisma DB URL. For local SQLite: `"file:./dev.db"` |
| `RAZORPAY_KEY_ID` | Razorpay API Key ID (Sandbox or Live) |
| `RAZORPAY_KEY_SECRET` | Razorpay API Secret Key |
| `NEXT_PUBLIC_ENABLE_STRIPE` | Set to `"true"` to enable Stripe checkout option |
| `STRIPE_PUBLISHABLE_KEY` | Stripe Publishable API Key |
| `STRIPE_SECRET_KEY` | Stripe Secret API Key |
| `RESEND_API_KEY` | Resend API Key for emailing download links |
| `EMAIL_FROM` | Verified sender address in Resend (e.g. `Dadi Sutra <onboarding@resend.dev>`) |
| `JWT_SECRET` | Secret key used to sign secure time-limited PDF tokens |
| `NEXT_PUBLIC_APP_URL` | Base URL of the app (e.g. `http://localhost:3000` or production domain) |

*Note: If no API keys are provided in `.env`, the app automatically enters **Mock Payment Mode** which simulates successful transactions and exposes download tokens immediately for developer sandbox testing.*

### 3. Initialize the Database
Initialize the local SQLite database and generate the Prisma Client using:
```bash
npx prisma db push
```

### 4. Put the E-book PDF in place
Create a folder named `private` in the root of the project (if it doesn't already exist) and place your e-book PDF file inside it named `dadi-sutra.pdf`:
```
/private/dadi-sutra.pdf
```
*A basic mockup PDF has been seeded automatically to allow end-to-end testing immediately.*

### 5. Run local development server
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the sales landing page.

---

## Folder Structure
- `src/config/site.ts`: Central configurations containing prices, copy, FAQs, and reviews.
- `src/lib/crypto.ts`: Cryptographic helper to sign and verify download link tokens.
- `src/lib/db.ts`: Initialized Prisma client.
- `src/app/api/checkout/razorpay/`: Razorpay order creation and verification routes.
- `src/app/api/checkout/stripe/`: Stripe session creation and verification routes.
- `src/app/api/download/`: Secure download route that validates signed token, checks payment status, and streams the PDF.
- `src/app/api/lead-magnet/`: Captures free sample signup leads and emails a preview chapter.
- `src/app/thank-you/`: Thank you redirect page that handles gateway callback validation.
- `src/app/privacy-policy/`, `/terms-of-service/`, `/refund-policy/`, `/contact/`: Compliance legal pages.

---

## Security & Download Validation Flow
1. **Verification**: After payment, the server marks the order status as `PAID` and signs a JWT-style token containing `{ email, orderId, exp }` using a local server secret.
2. **Time Limit**: The download token expires automatically after **24 hours**.
3. **Limit Downloads**: The download handler restricts download count to **5 times** per order (configurable).
4. **No Direct Path**: The actual PDF is stored inside `/private/dadi-sutra.pdf` which is outside the public folder and served as a binary buffer stream from `/api/download?token=xxx`.

---

## Vercel Deployment

1. Set up a PostgreSQL, MySQL, or SQLite host (e.g. Prisma can connect to Supabase/Neon PostgreSQL). If deploying to Vercel, change `provider = "sqlite"` to `provider = "postgresql"` in `prisma/schema.prisma` and point the `DATABASE_URL` environment variable to your remote database.
2. Set all Environment Variables listed in `.env.example` in your Vercel Project Settings.
3. Add the build command:
   ```bash
   npx prisma generate && next build
   ```
4. Deploy the project!
