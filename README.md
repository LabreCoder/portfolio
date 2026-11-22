# Portfólio · João Labre

Portfólio pessoal de cibersegurança: experiência, competências com evidência, labs de CTF, projetos e contato, num único site estático sobre um fundo de ardósia.

> **English summary:** personal cybersecurity portfolio built with React 19, Vite, Tailwind CSS v4 and TypeScript. Single-page, no backend, no tracking scripts. Most content lives in one data file (`src/data.ts`). Free to reuse as a template (MIT code; personal content excluded, see [License](#licença)). Built to be fast (Lighthouse 95+ on mobile), accessible and print-friendly.

**Site:** em breve <!-- Quando publicar, troque por: [endereço](https://...) -->

## O que tem no site

- **Sobre, Experiência, Competências, Labs, Projetos, Formação e Contato**, uma seção por vez, sem barras de nível autodeclaradas.
- **Competências como matriz:** cada ferramenta mostra em que contexto foi usada (trabalho, lab, ensino, projeto, estudo) e qual é a evidência.
- **Estudo de caso** do projeto Bank of Ideas (problema, o que foi construído, decisões técnicas, resultado).
- **Espaço pronto para writeups** de labs e CTFs, no formato de relatório de pentest (escopo, recon, achado, impacto, remediação). Fica escondido enquanto não houver nenhum.
- **Terminal escondido:** aperte `~` (ou use o link do rodapé) e rode `help`, `whoami`, `ls`, `cd projetos`, `cat contato`...
- **Detalhes de movimento:** rastro de giz no cursor, luz passando pela ardósia, entrada suave das seções. Tudo desligado para quem pede menos movimento no sistema (`prefers-reduced-motion`).
- **Impressão:** `Ctrl+P` gera uma versão limpa, em fundo branco.

## Tecnologias

React 19 · Vite 8 · Tailwind CSS 4 · TypeScript · pnpm. Sem backend, sem bibliotecas de animação e sem scripts de rastreamento.

## Como rodar

Pré-requisitos: Node 22 e pnpm 10. O `.mise.toml` fixa as duas versões para quem usa o [mise](https://mise.jdx.dev/).

```bash
pnpm install
pnpm dev        # servidor de desenvolvimento em http://localhost:5173
pnpm typecheck  # confere os tipos do TypeScript
pnpm build      # confere os tipos e gera a versão de produção em dist/
pnpm preview    # serve o dist/ em http://localhost:4173
```

### Sem Node instalado (Docker)

```bash
docker run --rm -p 5173:5173 -v "$(pwd):/app" -v portfolio_node_modules:/app/node_modules -w /app node:22-alpine \
  sh -c "corepack enable && pnpm install --frozen-lockfile --store-dir /app/node_modules/.pnpm-store && pnpm exec vite --host 0.0.0.0 --port 5173"
```

No PowerShell, troque `$(pwd)` por `${PWD}`. Depois abra `http://localhost:5173`.

## Estrutura

```
src/
├── data.ts          # quase todo o conteúdo do site (textos, experiência, competências, projetos, links)
├── index.css        # tema (cores e fontes) e animações
├── App.tsx          # monta a página e a animação de entrada na rolagem
└── components/      # uma seção por arquivo, mais Nav, Background, Chalk e Terminal
public/              # favicon, imagem de prévia e as texturas de ardósia (WebP)
index.html           # título, descrição e prévia de compartilhamento (og:*)
.github/workflows/   # deploy automático no GitHub Pages
```

Para mudar um texto, edite o `src/data.ts`; o site se atualiza sozinho no `pnpm dev`. Nome e marca "~/labre" também aparecem em `index.html`, `Nav.tsx`, `Footer.tsx`, `Terminal.tsx` e `Projects.tsx`.

### Detalhes de implementação

- **Fundo e placas de ardósia** são texturas geradas a partir de filtros SVG e exportadas uma vez como WebP (`public/slate*.webp`). Calcular o filtro ao vivo pesava no celular.
- **Competências marcadas como "a confirmar"** no `data.ts` só aparecem no `pnpm dev`; o build publicado as esconde até a evidência ser confirmada.
- **Paleta "Orquídea da Meia-Noite":** `#0B0B10`, `#23102F`, `#4A1F6F`, `#7B3FA6` e `#E7D8FF`, com três tons derivados para texto legível sobre o fundo escuro.

## Desempenho e acessibilidade

Lighthouse no build de produção, medido em novembro de 2026: celular 95 (desempenho), desktop 100; acessibilidade, boas práticas e SEO em 100 nas duas.

## Use como base para o seu portfólio

Fique à vontade para usar este projeto como ponto de partida. O passo a passo abaixo publica o site de graça no GitHub Pages, direto do seu GitHub.

1. **Copie o repositório.** Clique em **Fork** (ou em **Use this template**, se estiver disponível) e escolha um nome.
   - Com o nome `<seu-usuario>.github.io`, o site fica em `https://<seu-usuario>.github.io/`.
   - Com qualquer outro nome (ex.: `portfolio`), fica em `https://<seu-usuario>.github.io/portfolio/`.
2. **Instale as ferramentas:** Node 22 e pnpm 10.
   - Com [mise](https://mise.jdx.dev/): `mise install`.
   - Sem mise: instale o Node 22 e rode `corepack enable` (ele usa a versão do pnpm fixada no `package.json`).
3. **Rode na sua máquina:**
   ```bash
   git clone https://github.com/<seu-usuario>/<seu-repo>.git
   cd <seu-repo>
   pnpm install
   pnpm dev   # http://localhost:5173
   ```
4. **Troque o meu conteúdo pelo seu.** Ele não está coberto pela licença MIT (veja [Licença](#licença)):
   - `src/data.ts`: textos, experiência, competências, labs, projetos, links e e-mail.
   - `index.html`: `<title>`, `description`, `author` e as tags `og:*`.
   - `src/components/Nav.tsx`, `Footer.tsx`, `Terminal.tsx` (prompt `visitante@labre`) e `Projects.tsx`: nome, "~/labre" e link do GitHub.
   - `public/og-image.jpg` (1200×630), `public/favicon.svg`, `public/favicon-32.png` e `public/apple-touch-icon.png`.
   - Este README.
5. **Ajuste os endereços no `index.html`.** Troque `https://labrecoder.github.io/portfolio/` pelo endereço do seu site em `canonical`, `og:url` e `og:image`. Redes como LinkedIn e WhatsApp só mostram a prévia com endereço completo.
6. **Ligue o GitHub Pages.**
   - No seu repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
   - Num fork, o GitHub Actions vem desligado: abra a aba **Actions** e clique para ativar.
   - Faça um push na `main` (ou rode o workflow manualmente em **Actions → Deploy no GitHub Pages → Run workflow**).
   - O workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) instala as dependências, confere os tipos, gera o build e publica. O caminho do site (`/<seu-repo>/` ou `/`) é detectado sozinho; não precisa editar o `vite.config.ts`.
   - Para testar localmente com o mesmo caminho: `BASE_PATH=/<seu-repo> pnpm build && pnpm preview`.
7. **Domínio próprio (opcional).**
   - Em **Settings → Pages → Custom domain**, informe o domínio e marque **Enforce HTTPS**.
   - No DNS: um `CNAME` de `www` para `<seu-usuario>.github.io`; para o domínio raiz, registros `A` para `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`.
   - Rode o workflow de novo (o caminho passa a ser `/` sozinho) e atualize `canonical`, `og:url` e `og:image`.

O repositório do GitHub Pages gratuito precisa ser público. Mantenha o arquivo `LICENSE` com o aviso de copyright original (é a única exigência da licença MIT); você pode acrescentar uma linha com o seu nome.

## Licença

- **Código** (componentes, estilos, configuração, a estrutura do `index.html` e as texturas `public/slate*.webp`): licença [MIT](LICENSE). Pode usar, copiar e modificar, mantendo o aviso de copyright.
- **Conteúdo pessoal, todos os direitos reservados:** os textos e dados de `src/data.ts`; meu nome, e-mail, links e a marca "~/labre" (em `index.html`, `Nav.tsx`, `Footer.tsx`, `Terminal.tsx` e `Projects.tsx`); e as imagens `public/og-image.jpg`, `public/favicon.svg`, `public/favicon-32.png` e `public/apple-touch-icon.png`.
- A licença MIT não autoriza o uso do meu nome, da minha imagem ou da minha identidade. Se usar este projeto como base, troque todo esse conteúdo pelo seu.

---

[GitHub](https://github.com/LabreCoder) · [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-victor-labre/)
