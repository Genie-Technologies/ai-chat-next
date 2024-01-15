# ResponAI FE Repo

This Repo is a nextjs application that communicates with a nestJS backend. It uses the [OpenAI API](https://beta.openai.com/docs/api-reference/completions/create) to make completion requests based on user chat history.
It is bases off the vercel [ai-chatgpt](https://github.com/vercel/examples/tree/main/solutions/ai-chatgpt) repo.

### Components

- Next.js
- OpenAI API (REST endpoint)
- API Routes (NestJS Backend)

### Getting Started

Rename [`.env.example`](.env.example) to `.env.local`:

```bash
cp .env.example .env.local
```

then, update `OPENAI_API_KEY` with your [OpenAI](https://beta.openai.com/account/api-keys) secret key.

Next, run Next.js in development mode:

```bash
npm install
npm run dev

# or

yarn
yarn dev
```

The app should be up and running at http://localhost:3000.

### Screenshots
![ai_chat_landing](https://github.com/Genie-Technologies/ai-chat-next/assets/14829509/d7648ad1-e88c-47e9-a94c-24c714342292)

![chat_thread_landing](https://github.com/Genie-Technologies/ai-chat-next/assets/14829509/86e00d3f-cba6-4dc6-aa45-3d0b73e70d38)
![Screenshot 2024-01-15 at 3 59 58 PM](https://github.com/Genie-Technologies/ai-chat-next/assets/14829509/96db6265-13ee-44b2-b2af-8447f7eec359)
