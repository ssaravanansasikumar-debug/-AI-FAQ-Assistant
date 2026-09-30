# AnswerBot - AI-powered FAQ and Customer Support Automation

Backend project based on the supplied project specification.

## Technology
- Node.js 18+
- Express.js
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- Google Gemini AI (`@google/genai`)
- Postman/Thunder Client for API testing

## Setup

```bash
npm install
```

Copy `.env.example` to `.env` and configure MongoDB, JWT secret, and optionally Gemini.

Start:

```bash
npm run dev
```

or

```bash
npm start
```

Server: `http://localhost:5000`

## API endpoints

### Register
POST `/api/auth/register`

```json
{
  "name": "Priya Sharma",
  "email": "priya@writeflow.com",
  "password": "securepassword123"
}
```

### Login
POST `/api/auth/login`

```json
{
  "email": "priya@writeflow.com",
  "password": "securepassword123"
}
```

Copy the returned JWT and send it as:

`Authorization: Bearer <token>`

### Create FAQ
POST `/api/faqs`

```json
{
  "question": "How do I configure custom category tags?",
  "answer": "Navigate to settings panel, append keyword tags arrays, and save schema.",
  "category": "Configuration"
}
```

### List FAQs
GET `/api/faqs`

### Search FAQs
GET `/api/faqs/search?q=configure`

### Update FAQ
PUT `/api/faqs/:id`

### Delete FAQ
DELETE `/api/faqs/:id`

### Generate FAQ with AI
POST `/api/ai/generate-faq`

```json
{
  "topic": "Mongoose schema indexing validation runtime workflow optimization"
}
```

## Notes
- The AI route uses Gemini when `GEMINI_API_KEY` is configured.
- If Gemini is not configured or unavailable, the route returns a safe local fallback FAQ so the API can still be demonstrated.
- MongoDB must be running for persistence.
