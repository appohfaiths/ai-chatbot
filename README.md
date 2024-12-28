<a href="https://chat.vercel.ai/">
  <img alt="Next.js 15 and App Router-ready AI chatbot." src="">
  <h1 align="center">Next.js AI Chatbot</h1>
</a>

<p align="center">
  An Open-Source AI Chatbot Template Built With Next.js and Hugging Face models.
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#models"><strong>Models</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## Features

- [Next.js](https://nextjs.org) App Router
    - Advanced routing for seamless navigation and performance
    - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [Hugging Face Models](https://huggingface.co)
    - appohfaiths/Llama-Ghanaba-AI
- [shadcn/ui](https://ui.shadcn.com)
    - Styling with [Tailwind CSS](https://tailwindcss.com)
    - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
    - [Vercel Postgres powered by Neon](https://vercel.com/storage/postgres) for saving chat history and user data
    - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
    - Simple and secure authentication

## Models


## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run AI Chatbot.

```bash
npm install
npm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).