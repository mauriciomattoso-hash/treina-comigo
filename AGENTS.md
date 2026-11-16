# AGENTS.md — Treina Comigo

App de treino e corrida da personal Renata: painel dela (`painel.html`) + app do aluno (`aluno.html`) + cadastro com anamnese (`cadastro.html`). Base: o sistema do repo `protocolo`.

## Estrutura
- `js/`: `supabase.js` (cliente), `regras.js` (regras de negócio), `painel.js`, `cadastro.js`, `config.js`.
- `supabase/migrations` e `supabase/tests`: banco (projeto Supabase "treina-comigo-sp", São Paulo).
- `tests/`: `npm test` (regras e biblioteca); interface em `tests/e2e/`.
- `scripts/`: geração da biblioteca de exercícios (`npm run biblioteca`).
- Plano da fase 1: `docs/superpowers/plans/2026-10-30-fase-1-base.md`.

## Atenção
- Este repositório é **público**. Nada de dados de alunos, e-mails ou chaves aqui (a anon key do Supabase no front é aceitável; a service key nunca).
- Rodar `npm test` antes de abrir PR.

## Como Claude e ChatGPT trabalham juntos neste repositório

Este arquivo é lido pelo ChatGPT/Codex (`AGENTS.md`) e pelo Claude (via `CLAUDE.md`). As regras valem para os dois.

### Papéis
- **Os dois discutem**: decisões de arquitetura, banco, UX ou escopo passam por `docs/colaboracao/DISCUSSAO.md` antes de virar código.
- **O Claude constrói**: código, migrations no Supabase, deploy e atualização do status.
- **O ChatGPT revisa e contrapõe**: lê o código, aponta riscos, bugs prováveis, custo e alternativas. Discordância bem justificada é o valor dele aqui; não concordar por educação.
- **O Mauricio decide** quando os dois discordam.

### Antes de qualquer trabalho
1. Ler este arquivo, `docs/colaboracao/PROJETO.md` (status e decisões) e `docs/colaboracao/DISCUSSAO.md` (o que está em aberto).
2. Nunca desfazer uma decisão registrada em `PROJETO.md` sem abrir um item em `DISCUSSAO.md` explicando o motivo.

### Como registrar
- Assinar cada entrada com `[Claude]` ou `[ChatGPT]` e a data (AAAA-MM-DD).
- Tópicos curtos, não redação.
- Nunca gravar chaves, senhas, tokens ou dados pessoais de alunos nestes arquivos.

### Fluxo de uma discussão
1. Quem levanta o tema abre um item em `DISCUSSAO.md`: problema, opções, recomendação.
2. O outro responde no mesmo item: concorda / discorda / alternativa, e por quê.
3. Convergiu → move para "Decisões" em `PROJETO.md`. Não convergiu → Mauricio desempata.
4. O Claude implementa, abre PR e registra no Log de `PROJETO.md`.

### Quando o ChatGPT não consegue gravar no repositório
O conector do GitHub no ChatGPT costuma ser só leitura (o Codex consegue abrir PR). Sem escrita, o ChatGPT responde neste bloco, que o Mauricio cola no Claude e o Claude grava em `DISCUSSAO.md`:

```
PARECER [ChatGPT] — <projeto> — <data>
Item: <qual discussão ou PR>
Posição: concorda | discorda | alternativa
Motivo:
Riscos:
Sugestão concreta:
```

### Revisão de PR
Todo PR do Claude pode ser revisado pelo ChatGPT antes do merge. Foco: segurança (RLS, chaves expostas no front), regressões, custo de API e se o PR respeita as decisões registradas.

### Modo automático (GitHub Actions)
`.github/workflows/claude.yml` liga o ciclo:
1. Claude abre PR → Codex revisa sozinho (Automatic reviews ligado nas configurações do Codex).
2. A revisão do Codex dispara o Claude, que corrige ou contesta, dá push no mesmo PR e pede `@codex review` de novo.
3. Máximo de 2 rodadas por PR; depois disso o Mauricio decide.
4. Issue com a label `claude` vira tarefa para o Claude (ele abre PR). Comentário com `@claude` também aciona.
5. Merge na `main` é sempre manual (Mauricio), porque publica o site.

Para o Codex: revise com foco em P0/P1 e sempre respeitando as decisões de `docs/colaboracao/PROJETO.md`. Se discordar de uma decisão, diga isso na revisão em vez de pedir a mudança direto.

### Deploy
Push na `main` publica por FTP (GitHub Actions, `.github/workflows/deploy.yml`). Por isso: trabalhar em branch, abrir PR e só fazer merge depois da revisão. `AGENTS.md`, `CLAUDE.md` e `docs/` não vão para o servidor.
