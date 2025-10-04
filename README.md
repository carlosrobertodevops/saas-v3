This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).
## Estructure

```
./saas-v3/
├─ .vincent/
│  └─ mcp.json
├─ .vscode/
│  └─ settings.json
├─ messages/
│  ├─ en.json
│  ├─ es.json
│  └─ pt.json
├─ public/
│  └─ ai-verse-dashboard.png
├─ src/
│  ├─ app/
│  │  ├─ api/
│  │  │  ├─ create-order/
│  │  │  │  └─ route.ts
│  │  │  ├─ generate/
│  │  │  │  └─ route.ts
│  │  │  ├─ histories/
│  │  │  │  └─ route.ts
│  │  │  ├─ users/
│  │  │  │  └─ route.ts
│  │  │  └─ webhooks/
│  │  │     └─ route.ts
│  │  ├─ dashboard/
│  │  │  ├─ ContentGenerator/
│  │  │  ├─ FavoriteTemplates/
│  │  │  ├─ Hisotry/
│  │  │  ├─ MainArea/
│  │  │  ├─ SideBar/
│  │  │  ├─ Templates/
│  │  │  ├─ subscription/
│  │  │  ├─ MainHeader.tsx
│  │  │  └─ page.tsx
│  │  ├─ DropDowns/
│  │  ├─ Hooks/
│  │  ├─ fonts/
│  │  ├─ sign-in/
│  │  ├─ sign-up/
│  │  ├─ AppContext.tsx
│  │  ├─ PayPalWrapper.tsx
│  │  ├─ custom-quil.css
│  │  ├─ favicon.ico
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  ├─ middleware.ts
│  │  ├─ page.tsx
│  │  └─ PayPalWrapper.tsx
│  ├─ components/
│  │  ├─ AllHisotryList.tsx
│  │  ├─ Chart.tsx
│  │  ├─ DashStats.tsx
│  │  ├─ HistorySubHeader.tsx
│  │  ├─ Keywords.tsx
│  │  ├─ LanguageSelector.tsx
│  │  ├─ LocaleSwitcher.tsx
│  │  ├─ LocaleSwitcherSelect.tsx
│  │  ├─ Logo.tsx
│  │  ├─ MainSection.tsx
│  │  ├─ NavLink.tsx
│  │  ├─ OthersSection.tsx
│  │  ├─ RemainingWords.tsx
│  │  ├─ SingleHistoryItem.tsx
│  │  ├─ TemplateSingleCard.tsx
│  │  ├─ TemplatesList.tsx
│  │  └─ TemplatesSubHeader.tsx
│  ├─ LocalData/
│  ├─ Windows/
│  ├─ i18n/
│  ├─ lib/
│  ├─ models/
│  ├─ services/
│  ├─ types/
│  └─ Windows/
├─ .dockerignore
├─ .env
├─ .env.exemplo
├─ .env.local
├─ .gitignore
├─ docker-compose.coolify.yaml
├─ docker-compose.local.yaml
├─ eslint.config.mts
├─ next-env.d.ts
├─ next.config.mjs
├─ next.config.ts
├─ package.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ postcss.config.mjs
├─ Read This Before you Use The Source Code.pdf
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json
```
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or (base of code)
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
