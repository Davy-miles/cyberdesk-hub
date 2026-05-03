# Cyber Desk Hub

Frontend (Vite + React + TypeScript) para a landing e o fluxo de verificação Discord do **Cyber World**.

### Logo e favicon

- Coloque o arquivo em **`public/logo.svg`** ou **`public/logo.png`**.
- No código da home, constante **`LOGO_SRC`** em `src/pages/Index.tsx` deve bater com o nome do arquivo.
- O **favicon** da aba usa o mesmo arquivo (`<link rel="icon">` em `index.html`).

## Comandos

- `npm install` — dependências
- `npm run dev` — desenvolvimento (porta 8080)
- `npm run build` / `npm run preview` — build e preview de produção
- `npm test` — testes (Vitest)
- `npm run lint` — ESLint

## Variáveis

Defina no `.env` (não commitar segredos):

- `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` — cliente Supabase
- Edge functions: `SITE_ORIGIN`, credenciais Discord, etc. (ver pasta `supabase/functions`)

## Open Graph

`index.html` referencia `/og.jpg` (cópia do hero em `public/`). Em produção, defina URL absoluta nas meta se o crawler exigir.
