// Painel da Renata: alunos (aprovação e ficha), cobranças, biblioteca de exercícios e planos.
import { sb, exigirLogin, sair, esc } from './supabase.js';
import { ANAMNESE, SECOES, statusCobranca, ROTULO_STATUS, ROTULO_COBRANCA } from './regras.js';

const $ = (id) => document.getElementById(id);
const el = $('conteudo');
const hoje = () => new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
const dataBR = (iso) => (iso ? String(iso).slice(0, 10).split('-').reverse().join('/') : '');
const brl = (v) => Number(v ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const pad = (n) => String(n).padStart(2, '0');
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const nomeMes = (ref) => `${MESES.at(Number(ref.slice(5, 7)) - 1)} de ${ref.slice(0, 4)}`;

const st = { aba: 'alunos', filtro: 'pendente', alunos: [], planos: [], aberto: null, mes: hoje().slice(0, 7) + '-01', busca: '', grupo: '', exercicios: null };

function toast(t) { const x = $('toast'); x.textContent = t; x.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => (x.hidden = true), 2600); }
function erro(e) {
  const m = String(e?.message ?? e);
  $('erro').textContent = m.includes('acesso negado') ? 'Sua conta não tem acesso ao painel.' : m.includes('Failed to fetch') ? 'Sem conexão. Confira a internet e tente de novo.' : `Não foi possível concluir: ${m}`;
  $('erro').hidden = false; scrollTo(0, 0);
}
async function rodar(fn, ok) {
  $('erro').hidden = true;
  try { const r = await fn(); if (r?.error) throw r.error; if (ok) toast(ok); return true; } catch (e) { erro(e); return false; }
}

async function carregarBase() {
  const [a, p] = await Promise.all([
    sb.from('perfis').select('*').eq('is_admin', false).order('criado_em', { ascending: false }),
    sb.from('planos').select('*').order('ordem'),
  ]);
  if (a.error) throw a.error; if (p.error) throw p.error;
  st.alunos = a.data; st.planos = p.data;
  const n = st.alunos.filter((x) => x.status === 'pendente').length;
  $('n-pendentes').textContent = n; $('n-pendentes').hidden = !n;
}
const planoDe = (id) => st.planos.find((p) => p.id === id);

// ---------- Alunos ----------
function renderAlunos() {
  if (st.aberto) return renderFicha();
  const grupos = ['pendente', 'ativo', 'pausado', 'recusado'];
  const lista = st.alunos.filter((a) => a.status === st.filtro);
  el.innerHTML = `
    <div class="filtros" role="group" aria-label="Situação">${grupos.map((g) => {
      const n = st.alunos.filter((a) => a.status === g).length;
      return `<button type="button" data-filtro="${g}" aria-pressed="${st.filtro === g}">${ROTULO_STATUS[g]} (${n})</button>`;
    }).join('')}</div>
    <ul class="lista">${lista.length ? lista.map((a) => `
      <li><button class="linha" data-aluno="${a.id}">
        <span class="info"><strong>${esc(a.nome)}</strong><span class="meta">${esc(planoDe(a.plano_id)?.nome ?? 'Sem plano')} · desde ${dataBR(a.criado_em)}</span></span>
        ${a.status === 'pendente' ? '<span class="selo ambar">Analisar</span>' : ''}
      </button></li>`).join('') : `<li class="vazio">${st.filtro === 'pendente' ? 'Nenhum cadastro esperando aprovação.' : 'Ninguém nesta situação.'}</li>`}
    </ul>`;
  el.querySelectorAll('[data-filtro]').forEach((b) => b.onclick = () => { st.filtro = b.dataset.filtro; renderAlunos(); });
  el.querySelectorAll('[data-aluno]').forEach((b) => b.onclick = () => { st.aberto = b.dataset.aluno; renderFicha(); });
}

function respostaTexto(p, v) {
  if (v == null || v === '' || (Array.isArray(v) && !v.length)) return null;
  if (Array.isArray(v)) return v.join(', ');
  if (p.tipo === 'simNao') return v === 'sim' ? 'Sim' : 'Não';
  if (p.tipo === 'data') return dataBR(v);
  return String(v);
}
const alerta = (p, v) => (p.tipo === 'simNao' && v === 'sim') || (p.id === 'liberacao_medica' && v && v !== 'Sim');

async function renderFicha() {
  const a = st.alunos.find((x) => x.id === st.aberto);
  if (!a) { st.aberto = null; return renderAlunos(); }
  el.innerHTML = '<p class="suave">Carregando a ficha…</p>';
  const [an, cb] = await Promise.all([
    sb.from('anamneses').select('respostas').eq('aluno_id', a.id).maybeSingle(),
    sb.from('cobrancas').select('*').eq('aluno_id', a.id).order('referencia', { ascending: false }).limit(6),
  ]);
  const resp = an.data?.respostas ?? {};
  const secoes = SECOES.map((s) => {
    const linhas = ANAMNESE.filter((p) => p.secao === s).map((p) => {
      const t = respostaTexto(p, resp[p.id]);
      return t ? `<div class="${alerta(p, resp[p.id]) ? 'alerta' : ''}"><dt>${esc(p.rotulo)}</dt><dd>${esc(t)}</dd></div>` : '';
    }).join('');
    return linhas ? `<div class="bloco"><h3>${esc(s)}</h3><dl>${linhas}</dl></div>` : '';
  }).join('');
  const temAlerta = ANAMNESE.some((p) => alerta(p, resp[p.id]));
  const pl = planoDe(a.plano_id);
  const whats = String(a.telefone ?? '').replace(/\D/g, '');

  el.innerHTML = `
    <button type="button" class="botao secundario" id="voltar" style="min-height:40px;margin-bottom:1rem">Voltar para a lista</button>
    <div class="ficha">
      <div class="bloco">
        <h2 style="margin-bottom:.2rem">${esc(a.nome)}</h2>
        <p class="suave" style="margin:0">${esc(a.email ?? '')}${whats ? ` · <a href="https://wa.me/55${whats}" target="_blank" rel="noopener">WhatsApp ${esc(a.telefone)}</a>` : ''}</p>
        <p style="margin:.6rem 0 0"><span class="selo ${a.status === 'pendente' ? 'ambar' : a.status === 'recusado' ? 'erro' : a.status === 'pausado' ? 'cinza' : ''}">${ROTULO_STATUS[a.status]}</span>
          ${a.dia_vencimento ? `<span class="suave pequeno"> · vence todo dia ${a.dia_vencimento}</span>` : ''}</p>
      </div>
      ${temAlerta ? '<div class="aviso atencao">Esta anamnese tem respostas que pedem atenção (marcadas em vermelho). Vale pedir liberação médica antes de começar.</div>' : ''}

      <div class="grade-2">
        <div class="bloco">
          <h3>${a.status === 'pendente' ? 'Aprovar cadastro' : 'Situação e plano'}</h3>
          ${a.status === 'pendente' || a.status === 'recusado' ? `
            <form id="f-aprovar" class="inline">
              <div class="campo"><label for="dia">Dia do vencimento</label><input id="dia" type="number" min="1" max="28" value="${a.dia_vencimento ?? 10}" required></div>
              <button class="botao" type="submit">Aprovar</button>
            </form>
            ${a.status === 'pendente' ? '<button type="button" class="botao perigo cheio" id="recusar" style="margin-top:.75rem">Recusar cadastro</button>' : ''}` : `
            <div class="acoes" style="margin-top:.25rem">
              ${a.status === 'ativo' ? '<button type="button" class="botao secundario" data-status="pausado">Pausar</button>' : '<button type="button" class="botao" data-status="ativo">Reativar</button>'}
            </div>`}
          <form id="f-plano" class="inline" style="margin-top:1rem">
            <div class="campo"><label for="plano">Plano</label><select id="plano">${st.planos.map((p) => `<option value="${p.id}" ${p.id === a.plano_id ? 'selected' : ''}>${esc(p.nome)}</option>`).join('')}</select></div>
            <button class="botao secundario" type="submit">Trocar plano</button>
          </form>
          <p class="suave pequeno" style="margin:.5rem 0 0">Libera: ${[pl?.musculacao && 'musculação', pl?.corrida && 'corrida'].filter(Boolean).join(' e ') || 'nada'}.</p>
        </div>
        <div class="bloco">
          <h3>Mensalidades</h3>
          ${(cb.data ?? []).length ? `<ul class="lista" style="border:0">${cb.data.map((c) => { const s = statusCobranca(c, hoje()); return `
            <li class="linha" style="cursor:default;padding:.6rem 0"><span class="info"><strong>${nomeMes(c.referencia)}</strong><span class="meta">${brl(c.valor)} · vence ${dataBR(c.vencimento)}${c.pago_em ? ` · pago ${dataBR(c.pago_em)}` : ''}</span></span>
            <span class="selo ${s === 'atrasada' ? 'erro' : s === 'aberta' ? 'ambar' : ''}">${ROTULO_COBRANCA[s]}</span></li>`; }).join('')}</ul>` : '<p class="suave">Nenhuma mensalidade gerada ainda. Gere na aba Cobranças.</p>'}
        </div>
      </div>
      <h2 style="margin-top:1.5rem">Anamnese</h2>
      ${secoes || '<p class="suave">Sem respostas.</p>'}
    </div>`;

  $('voltar').onclick = () => { st.aberto = null; renderAlunos(); };
  $('f-aprovar')?.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const dia = Number($('dia').value);
    if (!(dia >= 1 && dia <= 28)) return erro('Escolha um dia de vencimento entre 1 e 28.');
    if (await rodar(() => sb.rpc('aprovar_aluno', { p_aluno: a.id, p_dia_vencimento: dia }), `${a.nome.split(' ')[0]} aprovado(a)`)) { await carregarBase(); renderFicha(); }
  });
  $('recusar')?.addEventListener('click', async () => {
    if (!confirm(`Recusar o cadastro de ${a.nome}?`)) return;
    if (await rodar(() => sb.rpc('recusar_aluno', { p_aluno: a.id }), 'Cadastro recusado')) { await carregarBase(); renderFicha(); }
  });
  el.querySelectorAll('[data-status]').forEach((b) => b.onclick = async () => {
    if (await rodar(() => sb.rpc('definir_status', { p_aluno: a.id, p_status: b.dataset.status }), b.dataset.status === 'pausado' ? 'Aluno pausado' : 'Aluno reativado')) { await carregarBase(); renderFicha(); }
  });
  $('f-plano').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const novo = $('plano').value; if (novo === a.plano_id) return;
    if (await rodar(() => sb.rpc('trocar_plano', { p_aluno: a.id, p_plano: novo }), `Plano trocado para ${planoDe(novo)?.nome}`)) { await carregarBase(); renderFicha(); }
  });
}

// ---------- Cobranças ----------
function mesesOpcoes() {
  const [a, m] = hoje().split('-').map(Number);
  const out = [];
  for (let i = -6; i <= 2; i++) { const d = new Date(Date.UTC(a, m - 1 + i, 1)); out.push(d.toISOString().slice(0, 10)); }
  return out.reverse();
}

async function renderCobrancas() {
  el.innerHTML = '<p class="suave">Carregando…</p>';
  const { data, error } = await sb.from('cobrancas').select('*').eq('referencia', st.mes);
  if (error) return erro(error);
  const nomes = Object.fromEntries(st.alunos.map((a) => [a.id, a.nome]));
  const linhas = data.map((c) => ({ ...c, s: statusCobranca(c, hoje()), nome: nomes[c.aluno_id] ?? '—' }))
    .sort((x, y) => ['atrasada', 'aberta', 'paga'].indexOf(x.s) - ['atrasada', 'aberta', 'paga'].indexOf(y.s) || x.nome.localeCompare(y.nome));
  const soma = (s) => linhas.filter((c) => !s || c.s === s).reduce((t, c) => t + Number(c.valor), 0);
  const semCobranca = st.alunos.filter((a) => a.status === 'ativo' && !data.some((c) => c.aluno_id === a.id));
  const ativosSemDia = semCobranca.filter((a) => !a.dia_vencimento);

  el.innerHTML = `
    <div class="inline" style="margin-bottom:1rem">
      <div class="campo"><label for="mes">Mês</label><select id="mes">${mesesOpcoes().map((r) => `<option value="${r}" ${r === st.mes ? 'selected' : ''}>${nomeMes(r)}</option>`).join('')}</select></div>
      <button class="botao" id="gerar" type="button" ${semCobranca.length ? '' : 'disabled'}>Gerar mensalidades (${semCobranca.length})</button>
    </div>
    ${ativosSemDia.length ? `<div class="aviso atencao">${ativosSemDia.map((a) => esc(a.nome)).join(', ')} sem dia de vencimento: defina na ficha antes de gerar.</div>` : ''}
    <div class="resumo-mes"><div><strong>${brl(soma('paga'))}</strong>recebido</div><div><strong>${brl(soma('aberta'))}</strong>em aberto</div><div><strong>${brl(soma('atrasada'))}</strong>atrasado</div></div>
    <ul class="lista">${linhas.length ? linhas.map((c) => `
      <li class="linha" style="cursor:default"><span class="info"><strong>${esc(c.nome)}</strong>
        <span class="meta">${brl(c.valor)} · vence ${dataBR(c.vencimento)}${c.pago_em ? ` · pago ${dataBR(c.pago_em)}` : ''}</span></span>
        <span class="selo ${c.s === 'atrasada' ? 'erro' : c.s === 'aberta' ? 'ambar' : ''}">${ROTULO_COBRANCA[c.s]}</span>
        ${c.pago_em ? `<button class="botao secundario" style="min-height:40px" data-desfazer="${c.id}">Desfazer</button>`
                    : `<button class="botao" style="min-height:40px" data-pagar="${c.id}">Marcar pago</button>`}
      </li>`).join('') : `<li class="vazio">Nenhuma mensalidade de ${nomeMes(st.mes)}. Use "Gerar mensalidades".</li>`}</ul>`;

  $('mes').onchange = () => { st.mes = $('mes').value; renderCobrancas(); };
  $('gerar').onclick = async () => {
    const linhasNovas = semCobranca.filter((a) => a.dia_vencimento).map((a) => ({
      aluno_id: a.id, referencia: st.mes, valor: Number(planoDe(a.plano_id)?.valor_mensal ?? 0),
      vencimento: `${st.mes.slice(0, 7)}-${pad(a.dia_vencimento)}`,
    }));
    if (!linhasNovas.length) return;
    if (await rodar(() => sb.from('cobrancas').upsert(linhasNovas, { onConflict: 'aluno_id,referencia', ignoreDuplicates: true }), `${linhasNovas.length} mensalidade(s) gerada(s)`)) renderCobrancas();
  };
  el.querySelectorAll('[data-pagar]').forEach((b) => b.onclick = async () => {
    const d = prompt('Data do pagamento (dd/mm/aaaa)', dataBR(hoje()));
    if (d == null) return;
    const m = d.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (!m) return erro('Data inválida. Use o formato dd/mm/aaaa.');
    const iso = `${m[3]}-${pad(m[2])}-${pad(m[1])}`;
    if (await rodar(() => sb.from('cobrancas').update({ pago_em: iso }).eq('id', b.dataset.pagar), 'Pagamento registrado')) renderCobrancas();
  });
  el.querySelectorAll('[data-desfazer]').forEach((b) => b.onclick = async () => {
    if (await rodar(() => sb.from('cobrancas').update({ pago_em: null }).eq('id', b.dataset.desfazer), 'Pagamento desfeito')) renderCobrancas();
  });
}

// ---------- Biblioteca ----------
export function idYoutube(url) {
  const m = String(url ?? '').match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/))([\w-]{11})/);
  return m ? m[1] : null;
}

async function renderBiblioteca() {
  if (!st.exercicios) {
    el.innerHTML = '<p class="suave">Carregando a biblioteca…</p>';
    const { data, error } = await sb.from('exercicios').select('*').order('grupo').order('nome');
    if (error) return erro(error);
    st.exercicios = data;
  }
  const grupos = [...new Set(st.exercicios.map((x) => x.grupo))];
  const b = st.busca.toLowerCase();
  const lista = st.exercicios.filter((x) => (!st.grupo || x.grupo === st.grupo) && (!b || x.nome.toLowerCase().includes(b)));
  el.innerHTML = `
    <div class="inline" style="margin-bottom:1rem">
      <div class="campo"><label for="busca">Buscar</label><input id="busca" type="text" value="${esc(st.busca)}" placeholder="Nome do exercício"></div>
      <div class="campo" style="max-width:12rem"><label for="grupo">Grupo</label><select id="grupo"><option value="">Todos</option>${grupos.map((g) => `<option ${g === st.grupo ? 'selected' : ''}>${esc(g)}</option>`).join('')}</select></div>
      <button class="botao secundario" id="novo" type="button">Novo exercício</button>
    </div>
    <p class="suave pequeno">${lista.length} exercício(s) · ${st.exercicios.filter((x) => x.video_url).length} com vídeo</p>
    <ul class="lista">${lista.length ? lista.map((x) => `
      <li><button class="linha" data-ex="${x.id}"><span class="info"><strong>${esc(x.nome)}</strong><span class="meta">${esc(x.grupo)} · ${esc(x.equipamento ?? '')}</span></span>
        ${x.video_url ? '<span class="selo">Vídeo</span>' : ''}${x.ativo ? '' : '<span class="selo cinza">Oculto</span>'}</button></li>`).join('')
      : `<li class="vazio">${st.exercicios.length ? 'Nenhum exercício com esse nome.' : 'A biblioteca está vazia. Carregue os exercícios iniciais para começar.'}</li>`}</ul>
    ${st.exercicios.length ? '' : '<button class="botao cheio" id="carregar" type="button" style="margin-top:1rem">Carregar biblioteca inicial (188 exercícios)</button>'}`;
  $('busca').oninput = () => { st.busca = $('busca').value; const pos = $('busca').selectionStart; renderBiblioteca(); $('busca').focus(); $('busca').setSelectionRange(pos, pos); };
  $('grupo').onchange = () => { st.grupo = $('grupo').value; renderBiblioteca(); };
  $('novo').onclick = () => editarExercicio(null);
  $('carregar')?.addEventListener('click', async (ev) => {
    ev.target.disabled = true; ev.target.textContent = 'Carregando…';
    try {
      const r = await fetch('data/biblioteca-inicial.json', { cache: 'no-store' });
      if (!r.ok) throw new Error('arquivo da biblioteca não encontrado');
      const linhas = await r.json();
      const { error } = await sb.from('exercicios').upsert(linhas, { onConflict: 'nome', ignoreDuplicates: true });
      if (error) throw error;
      st.exercicios = null; toast(`${linhas.length} exercícios carregados`); renderBiblioteca();
    } catch (e) { erro(e); ev.target.disabled = false; ev.target.textContent = 'Tentar de novo'; }
  });
  el.querySelectorAll('[data-ex]').forEach((x) => x.onclick = () => editarExercicio(Number(x.dataset.ex)));
}

function editarExercicio(id) {
  const x = id ? st.exercicios.find((e) => e.id === id) : { nome: '', grupo: st.grupo || '', padrao: '', equipamento: '', instrucao: '', pontos_atencao: '', video_url: '', ativo: true };
  const prev = (u) => { const v = idYoutube(u); return v ? `<div style="position:relative;padding-top:56.25%;border-radius:8px;overflow:hidden;margin-top:.5rem"><iframe src="https://www.youtube-nocookie.com/embed/${v}" title="Vídeo do exercício" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0"></iframe></div>` : (u ? '<span class="msg-erro">Link do YouTube não reconhecido.</span>' : ''); };
  el.innerHTML = `
    <button type="button" class="botao secundario" id="voltar" style="min-height:40px;margin-bottom:1rem">Voltar para a biblioteca</button>
    <form class="bloco" id="f-ex" novalidate>
      <h2>${id ? 'Editar exercício' : 'Novo exercício'}</h2>
      <div class="campo"><label for="ex-nome">Nome</label><input id="ex-nome" type="text" value="${esc(x.nome)}" required></div>
      <div class="grade-2">
        <div class="campo"><label for="ex-grupo">Grupo muscular</label><input id="ex-grupo" type="text" value="${esc(x.grupo)}" list="lista-grupos" required>
          <datalist id="lista-grupos">${[...new Set(st.exercicios.map((e) => e.grupo))].map((g) => `<option value="${esc(g)}">`).join('')}</datalist></div>
        <div class="campo"><label for="ex-equip">Equipamento</label><input id="ex-equip" type="text" value="${esc(x.equipamento ?? '')}"></div>
      </div>
      <div class="campo"><label for="ex-instr">Como fazer</label><textarea id="ex-instr">${esc(x.instrucao ?? '')}</textarea></div>
      <div class="campo"><label for="ex-pontos">Pontos de atenção</label><span class="ajuda">Um por linha: postura, escápulas, amplitude, respiração, o que evitar.</span><textarea id="ex-pontos" style="min-height:140px">${esc(x.pontos_atencao ?? '')}</textarea></div>
      <div class="campo"><label for="ex-video">Link do vídeo no YouTube</label><input id="ex-video" type="url" value="${esc(x.video_url ?? '')}" placeholder="https://youtu.be/..."><div id="ex-prev">${prev(x.video_url)}</div></div>
      <label class="opcao" style="margin-bottom:1rem"><input type="checkbox" id="ex-ativo" ${x.ativo ? 'checked' : ''}><span>Visível para montar treinos</span></label>
      <button class="botao cheio" type="submit">Salvar exercício</button>
    </form>`;
  $('voltar').onclick = () => renderBiblioteca();
  $('ex-video').oninput = () => { $('ex-prev').innerHTML = prev($('ex-video').value.trim()); };
  $('f-ex').addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const dados = {
      nome: $('ex-nome').value.trim(), grupo: $('ex-grupo').value.trim(), equipamento: $('ex-equip').value.trim() || null,
      instrucao: $('ex-instr').value.trim() || null, pontos_atencao: $('ex-pontos').value.trim() || null,
      video_url: $('ex-video').value.trim() || null, ativo: $('ex-ativo').checked, atualizado_em: new Date().toISOString(),
    };
    if (!dados.nome || !dados.grupo) return erro('Preencha o nome e o grupo muscular.');
    if (dados.video_url && !idYoutube(dados.video_url)) return erro('O link do vídeo precisa ser do YouTube.');
    const q = id ? sb.from('exercicios').update(dados).eq('id', id).select().single() : sb.from('exercicios').insert(dados).select().single();
    const { data, error } = await q;
    if (error) return erro(error.code === '23505' ? 'Já existe um exercício com esse nome.' : error);
    if (id) st.exercicios = st.exercicios.map((e) => (e.id === id ? data : e)); else st.exercicios.push(data);
    toast('Exercício salvo'); renderBiblioteca();
  });
}

// ---------- Planos ----------
function renderPlanos() {
  el.innerHTML = st.planos.map((p) => `
    <form class="bloco" data-plano="${p.id}">
      <h2>${esc(p.nome)}</h2>
      <p class="suave pequeno">Libera ${[p.musculacao && 'musculação', p.corrida && 'corrida'].filter(Boolean).join(' e ')}.</p>
      <div class="grade-2">
        <div class="campo"><label for="pn-${p.id}">Nome</label><input id="pn-${p.id}" name="nome" type="text" value="${esc(p.nome)}" required></div>
        <div class="campo"><label for="pv-${p.id}">Mensalidade (R$)</label><input id="pv-${p.id}" name="valor" type="number" min="0" step="0.01" inputmode="decimal" value="${Number(p.valor_mensal)}"></div>
      </div>
      <div class="campo"><label for="pd-${p.id}">Descrição na página de entrada</label><input id="pd-${p.id}" name="descricao" type="text" value="${esc(p.descricao ?? '')}"></div>
      <label class="opcao" style="margin-bottom:1rem"><input type="checkbox" name="ativo" ${p.ativo ? 'checked' : ''}><span>Aberto para novos cadastros</span></label>
      <button class="botao" type="submit">Salvar plano</button>
    </form>`).join('');
  el.querySelectorAll('[data-plano]').forEach((f) => f.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const fd = new FormData(f);
    const valor = Number(String(fd.get('valor')).replace(',', '.'));
    if (!String(fd.get('nome')).trim() || !(valor >= 0)) return erro('Confira o nome e o valor do plano.');
    if (await rodar(() => sb.from('planos').update({ nome: String(fd.get('nome')).trim(), valor_mensal: valor, descricao: String(fd.get('descricao')).trim() || null, ativo: fd.get('ativo') === 'on' }).eq('id', f.dataset.plano), 'Plano salvo')) {
      await carregarBase(); renderPlanos();
    }
  }));
}

const TELAS = { alunos: renderAlunos, cobrancas: renderCobrancas, biblioteca: renderBiblioteca, planos: renderPlanos };
function abrirAba(aba) {
  st.aba = aba; st.aberto = null; $('erro').hidden = true;
  document.querySelectorAll('#abas [role=tab]').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.aba === aba)));
  TELAS[aba]();
}

(async () => {
  try {
    const conta = await exigirLogin();
    if (!conta) return;
    if (!conta.is_admin) { location.replace('aluno.html'); return; }
    $('sair').onclick = sair;
    document.querySelectorAll('#abas [role=tab]').forEach((b) => b.onclick = () => abrirAba(b.dataset.aba));
    await carregarBase();
    if (!st.alunos.some((a) => a.status === 'pendente')) st.filtro = 'ativo';
    abrirAba('alunos');
  } catch (e) { erro(e); } finally { $('app').removeAttribute('aria-busy'); }
})();
