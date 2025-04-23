# Genesis Forms

Life group member and service management system.

## Prerequisites

- Node.js 18+
- MongoDB running locally

## Initial Setup

1. Create `.env.local` file in project root with:

```env
MONGODB_URI="mongodb://root:secret@localhost:27017/genesis?authSource=admin"
```

2. Install dependencies:

```bash
npm install
```

3. Seed the database:

```bash
npm run seed
```

## Running the Project

For development:

```bash
npm run dev
```

For production:

```bash
npm run build
npm start
```
