// Cadastro em passos: plano → conta → seções da anamnese → revisão.
// ?plano=<id> já deixa o plano marcado. ?equipe=1 cria só a conta (acesso da equipe, promovido depois no banco).
import { cadastrar, planosAtivos, minhaConta, destinoDaConta, esc } from './supabase.js';
import { perguntasDoPlano, validarResposta, validarCadastro } from './regras.js';

const qs = new URLSearchParams(location.search);
const EQUIPE = qs.get('equipe') === '1';
const form = document.getElementById('form');
const progresso = document.getElementById('progresso');
const erroGeral = document.getElementById('erro-geral');

const estado = {
  passo: 0,
  planos: [],
  dados: { nome: '', email: '', telefone: '', senha: '', plano_id: qs.get('plano') || '', respostas: {} },
  consentimento: false,
  erros: {},
};

const plano = () => estado.planos.find((p) => p.id === estado.dados.plano_id);

function passos() {
  if (EQUIPE) return [{ tipo: 'conta', titulo: 'Acesso da equipe' }];
  const secoes = [];
  for (const p of perguntasDoPlano(plano())) {
    let s = secoes.find((x) => x.titulo === p.secao);
    if (!s) secoes.push((s = { tipo: 'secao', titulo: p.secao, perguntas: [] }));
    s.perguntas.push(p);
  }
  return [{ tipo: 'plano', titulo: 'Seu plano' }, { tipo: 'conta', titulo: 'Sua conta' }, ...secoes, { tipo: 'revisao', titulo: 'Revisão' }];
}

const erroHtml = (id) => (estado.erros[id] ? `<span class="msg-erro" id="e-${id}">${esc(estado.erros[id])}</span>` : '');
const cls = (id) => `campo${estado.erros[id] ? ' com-erro' : ''}`;
const aria = (id) => (estado.erros[id] ? `aria-invalid="true" aria-describedby="e-${id}"` : '');

function campoTexto(id, rotulo, tipo, valor, extra = '') {
  return `<div class="${cls(id)}"><label for="f-${id}">${rotulo}</label>
    <input id="f-${id}" name="${id}" type="${tipo}" value="${esc(valor)}" ${extra} ${aria(id)}>${erroHtml(id)}</div>`;
}

function pergunta(p) {
  const v = estado.dados.respostas[p.id];
  const opc = p.obrigatoria ? '' : ' <span class="suave pequeno">(opcional)</span>';
  const ajuda = p.ajuda ? `<span class="ajuda">${esc(p.ajuda)}</span>` : '';
  const nome = `r:${p.id}`;
  if (p.tipo === 'escolha' || p.tipo === 'simNao' || p.tipo === 'multipla') {
    const opcoes = p.tipo === 'simNao' ? [['sim', 'Sim'], ['nao', 'Não']] : p.opcoes.map((o) => [o, o]);
    const input = p.tipo === 'multipla' ? 'checkbox' : 'radio';
    const marcado = (o) => (p.tipo === 'multipla' ? (v ?? []).includes(o) : v === o);
    const lado = p.tipo === 'simNao' || p.opcoes?.length > 4 && p.opcoes.every((o) => o.length < 10);
    return `<fieldset class="${cls(p.id)}" style="border:0;padding:0;margin:0 0 1.1rem" ${aria(p.id)}>
      <legend class="rotulo" style="font-weight:600;margin-bottom:.35rem">${esc(p.rotulo)}${opc}</legend>${ajuda}
      <div class="opcoes${lado ? ' lado' : ''}">${opcoes.map(([val, txt]) =>
        `<label class="opcao"><input type="${input}" name="${nome}" value="${esc(val)}" ${marcado(val) ? 'checked' : ''}><span>${esc(txt)}</span></label>`).join('')}
      </div>${erroHtml(p.id)}</fieldset>`;
  }
  const campo = p.tipo === 'textoLongo'
    ? `<textarea id="f-${p.id}" name="${nome}" ${aria(p.id)}>${esc(v ?? '')}</textarea>`
    : `<input id="f-${p.id}" name="${nome}" type="${p.tipo === 'numero' ? 'number' : p.tipo === 'data' ? 'date' : 'text'}"
        ${p.tipo === 'numero' ? `inputmode="decimal" step="any" min="${p.min ?? ''}" max="${p.max ?? ''}"` : ''} value="${esc(v ?? '')}" ${aria(p.id)}>`;
  return `<div class="${cls(p.id)}"><label for="f-${p.id}">${esc(p.rotulo)}${opc}</label>${ajuda}${campo}${erroHtml(p.id)}</div>`;
}

function render() {
  const ps = passos();
  const atual = ps[estado.passo];
  const total = ps.length;
  progresso.innerHTML = EQUIPE ? '' : `<span class="pequeno suave">Passo ${estado.passo + 1} de ${total}: ${esc(atual.titulo)}</span>
    <div class="barra"><i style="width:${((estado.passo + 1) / total) * 100}%"></i></div>`;

  let corpo = '';
  if (atual.tipo === 'plano') {
    corpo = `<h1 class="titulo">Como você quer treinar?</h1>
      <fieldset class="${cls('plano_id')} plano-escolha" style="border:0;padding:0;margin:0" ${aria('plano_id')}>
        <legend class="suave" style="margin-bottom:.6rem">Você pode mudar de plano depois, falando com a Renata.</legend>
        <div class="opcoes">${estado.planos.map((p) => `<label class="opcao"><input type="radio" name="plano_id" value="${esc(p.id)}" ${estado.dados.plano_id === p.id ? 'checked' : ''}>
          <span><strong>${esc(p.nome)}</strong><small>${[p.musculacao && 'Musculação', p.corrida && 'Corrida'].filter(Boolean).join(' e ')}</small></span></label>`).join('')}
        </div>${erroHtml('plano_id')}</fieldset>`;
  } else if (atual.tipo === 'conta') {
    corpo = `<h1 class="titulo">${EQUIPE ? 'Acesso da equipe' : 'Crie sua conta'}</h1>
      ${campoTexto('nome', 'Nome completo', 'text', estado.dados.nome, 'autocomplete="name"')}
      ${campoTexto('email', 'E-mail', 'email', estado.dados.email, 'autocomplete="email"')}
      ${campoTexto('telefone', 'WhatsApp com DDD', 'tel', estado.dados.telefone, 'autocomplete="tel" inputmode="tel"')}
      ${campoTexto('senha', 'Senha (mínimo 6 caracteres)', 'password', estado.dados.senha, 'autocomplete="new-password"')}`;
  } else if (atual.tipo === 'secao') {
    corpo = `<h1 class="titulo">${esc(atual.titulo)}</h1>
      ${estado.passo === 2 ? '<p class="suave">Estas respostas ajudam a Renata a montar um treino seguro para você. Só ela vê.</p>' : ''}
      ${atual.perguntas.map(pergunta).join('')}`;
  } else {
    const pl = plano();
    const linhas = perguntasDoPlano(pl).filter((p) => {
      const v = estado.dados.respostas[p.id]; return v != null && String(v).trim() !== '' && !(Array.isArray(v) && !v.length);
    }).map((p) => {
      const v = estado.dados.respostas[p.id];
      const txt = Array.isArray(v) ? v.join(', ') : p.tipo === 'simNao' ? (v === 'sim' ? 'Sim' : 'Não') : v;
      return `<dt>${esc(p.rotulo)}</dt><dd>${esc(txt)}</dd>`;
    }).join('');
    corpo = `<h1 class="titulo">Tudo certo?</h1>
      <div class="bloco"><h3>${esc(pl?.nome ?? '')}</h3><p class="suave" style="margin:0">${esc(estado.dados.nome)} · ${esc(estado.dados.email)}</p></div>
      <details class="bloco"><summary style="cursor:pointer;font-weight:600">Ver minhas respostas</summary><dl class="resumo">${linhas}</dl></details>
      <div class="${cls('consentimento')}"><label class="opcao"><input type="checkbox" name="consentimento" ${estado.consentimento ? 'checked' : ''}>
        <span>As informações são verdadeiras e autorizo a Renata a usá-las para montar e acompanhar meu treino.</span></label>${erroHtml('consentimento')}</div>`;
  }

  const ultimo = estado.passo === total - 1;
  form.innerHTML = `<section class="passo">${corpo}</section>
    <div class="acoes">
      ${estado.passo > 0 ? '<button type="button" class="botao secundario" id="voltar">Voltar</button>' : ''}
      <button type="submit" class="botao">${ultimo ? (EQUIPE ? 'Criar acesso' : 'Enviar cadastro') : 'Continuar'}</button>
    </div>`;
  document.getElementById('voltar')?.addEventListener('click', () => { coletar(); estado.erros = {}; estado.passo--; render(); scrollTo(0, 0); });
  const primeiroErro = form.querySelector('.com-erro input, .com-erro textarea, [aria-invalid="true"] input');
  primeiroErro?.focus();
}

function coletar() {
  const fd = new FormData(form);
  const atual = passos()[estado.passo];
  if (atual.tipo === 'plano') estado.dados.plano_id = fd.get('plano_id') || '';
  if (atual.tipo === 'conta') for (const k of ['nome', 'email', 'telefone', 'senha']) estado.dados[k] = String(fd.get(k) ?? '');
  if (atual.tipo === 'secao') {
    for (const p of atual.perguntas) {
      const k = `r:${p.id}`;
      estado.dados.respostas[p.id] = p.tipo === 'multipla' ? fd.getAll(k).map(String) : (fd.get(k) == null ? '' : String(fd.get(k)).trim());
      if (p.tipo === 'numero' && estado.dados.respostas[p.id] !== '') estado.dados.respostas[p.id] = Number(String(estado.dados.respostas[p.id]).replace(',', '.'));
    }
  }
  if (atual.tipo === 'revisao') estado.consentimento = fd.get('consentimento') === 'on';
}

function validarPasso() {
  const atual = passos()[estado.passo];
  const erros = {};
  if (atual.tipo === 'plano' && !plano()) erros.plano_id = 'Escolha um plano.';
  if (atual.tipo === 'conta') {
    const r = validarCadastro({ ...estado.dados, plano_id: EQUIPE ? estado.planos[0]?.id : estado.dados.plano_id, respostas: {} }, estado.planos);
    for (const k of ['nome', 'email', 'telefone', 'senha']) if (r.erros[k]) erros[k] = r.erros[k];
  }
  if (atual.tipo === 'secao') for (const p of atual.perguntas) { const e = validarResposta(p, estado.dados.respostas[p.id]); if (e) erros[p.id] = e; }
  if (atual.tipo === 'revisao' && !estado.consentimento) erros.consentimento = 'Marque para enviar o cadastro.';
  estado.erros = erros;
  return Object.keys(erros).length === 0;
}

async function enviar(btn) {
  erroGeral.hidden = true;
  const dados = EQUIPE ? { ...estado.dados, plano_id: 'treina', respostas: {} } : estado.dados;
  if (!EQUIPE) {
    const r = validarCadastro(dados, estado.planos);
    if (!r.ok) { erroGeral.textContent = 'Falta responder alguma pergunta. Volte e confira os passos.'; erroGeral.hidden = false; return; }
  }
  btn.disabled = true; btn.textContent = 'Enviando…';
  const r = await cadastrar(dados);
  if (!r.ok) { erroGeral.textContent = r.erro; erroGeral.hidden = false; btn.disabled = false; btn.textContent = 'Tentar de novo'; scrollTo(0, 0); return; }
  progresso.innerHTML = '';
  form.innerHTML = `<section class="concluido">
    <h1 class="titulo" style="font-size:clamp(2rem,9vw,3rem)">Cadastro enviado</h1>
    <p>${EQUIPE ? 'Seu acesso foi criado. Avise o Mauricio para liberar o painel.' : `A Renata vai analisar suas respostas e liberar seu acesso. Você recebe o treino aqui no app assim que ela aprovar.`}</p>
    <a class="botao" href="${EQUIPE ? 'index.html' : 'aluno.html'}">${EQUIPE ? 'Voltar ao início' : 'Abrir meu app'}</a></section>`;
}

form.addEventListener('submit', async (ev) => {
  ev.preventDefault();
  coletar();
  if (!validarPasso()) { render(); return; }
  if (estado.passo === passos().length - 1) return enviar(ev.submitter);
  estado.passo++; render(); scrollTo(0, 0);
});

(async () => {
  try {
    const conta = await minhaConta().catch(() => null);
    if (conta) { location.replace(destinoDaConta(conta)); return; }
    estado.planos = await planosAtivos();
    if (!estado.planos.some((p) => p.id === estado.dados.plano_id)) estado.dados.plano_id = '';
    render();
  } catch (e) {
    erroGeral.textContent = 'Não foi possível carregar o cadastro. Confira a internet e recarregue a página.';
    erroGeral.hidden = false;
  }
})();
