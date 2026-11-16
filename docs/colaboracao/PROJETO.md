# PROJETO — Treina Comigo

## Decisões
- Planos: Treina Comigo (completo), Força Comigo (só musculação), Corre Comigo (só corrida); o plano libera os módulos no cadastro.
- Aluno se cadastra com anamnese e a Renata aprova; login com e-mail e senha.
- Ela escolhe o formato por aluno (full body, A/B/C, com ou sem periodização); aluno pode ser só de corrida.
- IA gera rascunho do treino e ela aprova; cada exercício traz observação dos pontos sensíveis (postura, escápulas etc.).
- Scout: ajustes automáticos sem aprovação, mas ela é avisada se o aluno ficar com status baixo na semana. Scout manual por check-in (sono, cansaço, doença) para quem não tem relógio.
- Corrida com Strava/Garmin opcional; senão registro manual.
- Feedback completo do aluno com notificação para ela; avisos por notificação no celular.
- Cobrança começa só como controle; vídeos do YouTube dela entram depois.
- Chave da Anthropic fica na conta dela.
- Infra: Supabase na organização da Renata; banco em "treina-comigo-sp" (São Paulo); o projeto antigo "treina-comigo" (EUA) fica até testar o app e depois é pausado. Hospedagem provisória em beag.com.br/treinacomigo até liberar o domínio dela.

## Status
- Fase 1 (base) em andamento — ver plano em `docs/superpowers/plans/`.
- Domínio da Renata aguardando liberação.

## Log
- 2026-11-16 [Claude] Criada a estrutura de colaboração Claude + ChatGPT.
