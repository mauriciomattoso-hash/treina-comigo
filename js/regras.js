// Regras puras do Treina Comigo: rodam no navegador e no Node (testes), sem dependências.

// Anamnese do cadastro. `modulo` restringe a pergunta aos planos que têm aquele módulo.
export const ANAMNESE = [
  // Sobre você
  { id: 'nascimento', secao: 'Sobre você', rotulo: 'Data de nascimento', tipo: 'data', obrigatoria: true },
  { id: 'sexo', secao: 'Sobre você', rotulo: 'Sexo', tipo: 'escolha', opcoes: ['Feminino', 'Masculino', 'Prefiro não dizer'], obrigatoria: true },
  { id: 'altura_cm', secao: 'Sobre você', rotulo: 'Altura (cm)', tipo: 'numero', min: 100, max: 230, obrigatoria: true },
  { id: 'peso_kg', secao: 'Sobre você', rotulo: 'Peso (kg)', tipo: 'numero', min: 30, max: 250, obrigatoria: true },
  { id: 'profissao', secao: 'Sobre você', rotulo: 'Profissão', tipo: 'texto', obrigatoria: false },
  { id: 'rotina_trabalho', secao: 'Sobre você', rotulo: 'Como é sua rotina de trabalho?', tipo: 'escolha', opcoes: ['Sentado a maior parte do tempo', 'Misto', 'Em pé ou andando a maior parte do tempo', 'Trabalho físico pesado'], obrigatoria: true },

  // Saúde
  { id: 'condicoes', secao: 'Saúde', rotulo: 'Tem alguma condição de saúde? (pressão alta, diabetes, problema cardíaco, asma...)', tipo: 'textoLongo', obrigatoria: false, ajuda: 'Deixe em branco se não tiver.' },
  { id: 'medicamentos', secao: 'Saúde', rotulo: 'Usa algum medicamento de uso contínuo?', tipo: 'textoLongo', obrigatoria: false, ajuda: 'Deixe em branco se não usar.' },
  { id: 'cirurgias', secao: 'Saúde', rotulo: 'Já fez alguma cirurgia? Qual e quando?', tipo: 'textoLongo', obrigatoria: false },
  { id: 'dor_peito', secao: 'Saúde', rotulo: 'Sente dor no peito quando faz esforço?', tipo: 'simNao', obrigatoria: true },
  { id: 'tontura', secao: 'Saúde', rotulo: 'Já teve tontura forte ou desmaio durante exercício?', tipo: 'simNao', obrigatoria: true },
  { id: 'liberacao_medica', secao: 'Saúde', rotulo: 'Tem liberação médica para praticar exercício?', tipo: 'escolha', opcoes: ['Sim', 'Não', 'Nunca fui ao médico para isso'], obrigatoria: true },

  // Lesões e dores
  { id: 'lesoes_atuais', secao: 'Lesões e dores', rotulo: 'Tem alguma lesão hoje? Onde?', tipo: 'textoLongo', obrigatoria: false, ajuda: 'Deixe em branco se não tiver.' },
  { id: 'lesoes_antigas', secao: 'Lesões e dores', rotulo: 'Já teve lesões antigas? Quais?', tipo: 'textoLongo', obrigatoria: false },
  { id: 'dores', secao: 'Lesões e dores', rotulo: 'Sente dores com frequência? Onde e quando?', tipo: 'textoLongo', obrigatoria: false, ajuda: 'Ex.: lombar ao acordar, joelho ao descer escada.' },

  // Objetivo
  { id: 'objetivo', secao: 'Objetivo', rotulo: 'Qual o seu objetivo principal?', tipo: 'escolha', opcoes: ['Emagrecer', 'Ganhar massa muscular', 'Melhorar o condicionamento', 'Saúde e qualidade de vida', 'Performance', 'Correr uma prova'], obrigatoria: true },
  { id: 'objetivo_detalhe', secao: 'Objetivo', rotulo: 'Conte com suas palavras o que você quer alcançar', tipo: 'textoLongo', obrigatoria: true },
  { id: 'prova', secao: 'Objetivo', rotulo: 'Tem alguma prova marcada? Qual e quando?', tipo: 'texto', obrigatoria: false },

  // Rotina
  { id: 'dias_semana', secao: 'Rotina', rotulo: 'Quantos dias por semana você pode treinar?', tipo: 'escolha', opcoes: ['2', '3', '4', '5', '6'], obrigatoria: true },
  { id: 'dias_disponiveis', secao: 'Rotina', rotulo: 'Quais dias costumam ser livres?', tipo: 'multipla', opcoes: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'], obrigatoria: true },
  { id: 'tempo_sessao', secao: 'Rotina', rotulo: 'Quanto tempo tem por sessão?', tipo: 'escolha', opcoes: ['Até 30 min', '30 a 45 min', '45 a 60 min', '60 a 90 min', 'Mais de 90 min'], obrigatoria: true },
  { id: 'horario', secao: 'Rotina', rotulo: 'Horário preferido', tipo: 'escolha', opcoes: ['Manhã cedo', 'Manhã', 'Almoço', 'Tarde', 'Noite'], obrigatoria: true },
  { id: 'sono_horas', secao: 'Rotina', rotulo: 'Quantas horas dorme por noite, em média?', tipo: 'escolha', opcoes: ['Menos de 5h', '5 a 6h', '6 a 7h', '7 a 8h', 'Mais de 8h'], obrigatoria: true },

  // Musculação
  { id: 'musc_experiencia', secao: 'Musculação', modulo: 'musculacao', rotulo: 'Qual a sua experiência com musculação?', tipo: 'escolha', opcoes: ['Nunca treinei', 'Iniciante (menos de 6 meses)', 'Intermediário (6 meses a 2 anos)', 'Avançado (mais de 2 anos)'], obrigatoria: true },
  { id: 'musc_parado', secao: 'Musculação', modulo: 'musculacao', rotulo: 'Está treinando hoje ou está parado? Há quanto tempo?', tipo: 'texto', obrigatoria: true },
  { id: 'musc_local', secao: 'Musculação', modulo: 'musculacao', rotulo: 'Onde vai treinar?', tipo: 'escolha', opcoes: ['Academia completa', 'Academia de condomínio', 'Em casa', 'Ao ar livre'], obrigatoria: true },
  { id: 'musc_equipamentos', secao: 'Musculação', modulo: 'musculacao', rotulo: 'Se treina em casa ou no condomínio, quais equipamentos tem?', tipo: 'textoLongo', obrigatoria: false },
  { id: 'musc_evitar', secao: 'Musculação', modulo: 'musculacao', rotulo: 'Tem exercícios que não gosta ou não pode fazer?', tipo: 'textoLongo', obrigatoria: false },

  // Corrida
  { id: 'corr_ja_corre', secao: 'Corrida', modulo: 'corrida', rotulo: 'Você já corre?', tipo: 'escolha', opcoes: ['Nunca corri', 'Corria e parei', 'Corro às vezes', 'Corro com regularidade'], obrigatoria: true },
  { id: 'corr_km_semana', secao: 'Corrida', modulo: 'corrida', rotulo: 'Quantos km corre por semana hoje?', tipo: 'numero', min: 0, max: 300, obrigatoria: true },
  { id: 'corr_maior', secao: 'Corrida', modulo: 'corrida', rotulo: 'Maior distância que correu nos últimos 3 meses (km)', tipo: 'numero', min: 0, max: 100, obrigatoria: false },
  { id: 'corr_pace', secao: 'Corrida', modulo: 'corrida', rotulo: 'Pace confortável (min/km), se souber', tipo: 'texto', obrigatoria: false, ajuda: 'Ex.: 6:30' },
  { id: 'corr_relogio', secao: 'Corrida', modulo: 'corrida', rotulo: 'Usa relógio para correr?', tipo: 'escolha', opcoes: ['Garmin', 'Outro relógio', 'Só o celular', 'Não uso'], obrigatoria: true },
];

export const SECOES = [...new Set(ANAMNESE.map((p) => p.secao))];

export function perguntasDoPlano(plano) {
  if (!plano) return ANAMNESE.filter((p) => !p.modulo);
  return ANAMNESE.filter((p) => !p.modulo || !!plano[p.modulo]);
}

function vazio(v) {
  if (v == null) return true;
  if (Array.isArray(v)) return v.length === 0;
  return String(v).trim() === '';
}

export function validarResposta(p, v) {
  if (vazio(v)) return p.obrigatoria ? 'Responda esta pergunta.' : null;
  if (p.tipo === 'numero') {
    const n = Number(String(v).replace(',', '.'));
    if (!Number.isFinite(n)) return 'Digite um número.';
    if (p.min != null && n < p.min) return `O mínimo é ${p.min}.`;
    if (p.max != null && n > p.max) return `O máximo é ${p.max}.`;
  }
  if (p.tipo === 'escolha' && !p.opcoes.includes(v)) return 'Escolha uma das opções.';
  if (p.tipo === 'multipla' && (!Array.isArray(v) || v.some((x) => !p.opcoes.includes(x)))) return 'Escolha uma ou mais opções.';
  if (p.tipo === 'simNao' && v !== 'sim' && v !== 'nao') return 'Responda sim ou não.';
  if (p.tipo === 'data' && !/^\d{4}-\d{2}-\d{2}$/.test(String(v))) return 'Data inválida.';
  return null;
}

export function validarCadastro(dados, planos) {
  const erros = {};
  const d = dados ?? {};
  if (vazio(d.nome)) erros.nome = 'Digite seu nome.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email ?? '').trim())) erros.email = 'E-mail inválido.';
  if (String(d.senha ?? '').length < 6) erros.senha = 'A senha precisa ter pelo menos 6 caracteres.';
  if (String(d.telefone ?? '').replace(/\D/g, '').length < 10) erros.telefone = 'Digite o WhatsApp com DDD.';
  const plano = (planos ?? []).find((p) => p.id === d.plano_id && p.ativo !== false);
  if (!plano) erros.plano_id = 'Escolha um plano.';
  for (const p of perguntasDoPlano(plano)) {
    const e = validarResposta(p, d.respostas?.[p.id]);
    if (e) erros[p.id] = e;
  }
  return { ok: Object.keys(erros).length === 0, erros };
}

const dia = (iso) => String(iso).slice(0, 10);

export function statusCobranca(c, hoje) {
  if (c?.pago_em) return 'paga';
  return dia(hoje) > dia(c.vencimento) ? 'atrasada' : 'aberta';
}

export function telaDoAluno(conta) {
  switch (conta?.status) {
    case 'ativo': return 'app';
    case 'recusado': return 'recusado';
    case 'pausado': return 'pausado';
    default: return 'aguardando';
  }
}

// Próxima data com o dia de vencimento, a partir de hoje (inclusive). Dias vão de 1 a 28.
export function proximoVencimento(diaVenc, hoje) {
  const [a, m, d] = dia(hoje).split('-').map(Number);
  const dv = Math.min(28, Math.max(1, Math.trunc(diaVenc)));
  let ano = a, mes = m;
  if (d > dv) { mes += 1; if (mes > 12) { mes = 1; ano += 1; } }
  return `${ano}-${String(mes).padStart(2, '0')}-${String(dv).padStart(2, '0')}`;
}

export const ROTULO_STATUS = { pendente: 'Aguardando aprovação', ativo: 'Ativo', pausado: 'Pausado', recusado: 'Recusado' };
export const ROTULO_COBRANCA = { paga: 'Paga', aberta: 'Em aberto', atrasada: 'Atrasada' };
