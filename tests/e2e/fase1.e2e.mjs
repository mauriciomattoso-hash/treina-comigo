// Teste de interface da fase 1 com o Supabase simulado. Uso: node fase1.e2e.mjs <pasta do site>
import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const raiz = path.resolve(process.argv[2]);
const UMD = path.resolve('node_modules/@supabase/supabase-js/dist/umd/supabase.js');
const tipos = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png' };
const srv = http.createServer((req, res) => {
  const f = path.join(raiz, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!f.startsWith(raiz) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': tipos[path.extname(f)] ?? 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
}).listen(0);
const base = `http://127.0.0.1:${srv.address().port}`;

const PLANOS = [
  { id: 'treina', nome: 'Treina Comigo', descricao: 'Musculação e corrida.', musculacao: true, corrida: true, valor_mensal: 0, ativo: true, ordem: 1 },
  { id: 'forca', nome: 'Força Comigo', descricao: 'Musculação.', musculacao: true, corrida: false, valor_mensal: 0, ativo: true, ordem: 2 },
  { id: 'corre', nome: 'Corre Comigo', descricao: 'Corrida.', musculacao: false, corrida: true, valor_mensal: 0, ativo: true, ordem: 3 },
];

function jwt(sub) {
  const b = (o) => Buffer.from(JSON.stringify(o)).toString('base64url');
  return `${b({ alg: 'HS256', typ: 'JWT' })}.${b({ sub, role: 'authenticated', exp: Math.floor(Date.now() / 1000) + 3600 })}.x`;
}

async function novoContexto(browser, mock) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await ctx.route('https://cdn.jsdelivr.net/**', (r) => r.fulfill({ path: UMD, contentType: 'text/javascript' }));
  await ctx.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ body: '', contentType: 'text/css' }));
  await ctx.route('https://fonts.gstatic.com/**', (r) => r.fulfill({ status: 404 }));
  await ctx.route('https://hptavtnwiljbkiupects.supabase.co/**', async (r) => {
    const u = new URL(r.request().url());
    const resp = await mock(u, r.request());
    if (!resp) return r.fulfill({ status: 404, body: '{}' });
    r.fulfill({ status: resp.status ?? 200, contentType: 'application/json', body: JSON.stringify(resp.body),
      headers: { 'access-control-allow-origin': '*', ...(resp.headers ?? {}) } });
  });
  return ctx;
}

function mockBase(estado) {
  return async (u, req) => {
    if (req.method() === 'OPTIONS') return { body: {} };
    if (u.pathname === '/rest/v1/planos') return { body: PLANOS };
    if (u.pathname === '/auth/v1/signup') {
      estado.signup = JSON.parse(req.postData());
      const user = { id: 'u1', email: estado.signup.email, aud: 'authenticated', role: 'authenticated', user_metadata: {} };
      return { body: { access_token: jwt('u1'), token_type: 'bearer', expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, refresh_token: 'r', user } };
    }
    if (u.pathname === '/auth/v1/token') {
      if (estado.loginFalha) return { status: 400, body: { error: 'invalid_grant', error_description: 'Invalid login credentials', msg: 'Invalid login credentials' } };
      const user = { id: 'u1', email: 'a@b.com', aud: 'authenticated', role: 'authenticated' };
      return { body: { access_token: jwt('u1'), token_type: 'bearer', expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) + 3600, refresh_token: 'r', user } };
    }
    if (u.pathname === '/rest/v1/minha_conta') return estado.conta ? { body: estado.conta } : { status: 406, body: { code: 'PGRST116', message: 'no rows' } };
    if (u.pathname === '/rest/v1/cobrancas') return { body: estado.cobrancas ?? [] };
    return null;
  };
}

async function preencherSecaoAtual(page) {
  // responde todas as obrigatórias visíveis com valores válidos
  for (const fs of await page.locator('fieldset.campo').all()) {
    const radio = fs.locator('input[type=radio]').first();
    if (await radio.count()) { await radio.check({ force: true }); continue; }
    const cb = fs.locator('input[type=checkbox]').first();
    if (await cb.count()) await cb.check({ force: true });
  }
  for (const inp of await page.locator('.passo input[type=number]').all()) {
    const min = Number(await inp.getAttribute('min') || 0), max = Number(await inp.getAttribute('max') || 100);
    await inp.fill(String(Math.round((min + max) / 2)));
  }
  for (const inp of await page.locator('.passo input[type=date]').all()) await inp.fill('1990-05-10');
  for (const inp of await page.locator('.passo input[type=text]').all()) if (!(await inp.inputValue())) await inp.fill('resposta');
  for (const t of await page.locator('.passo textarea').all()) if (!(await t.inputValue())) await t.fill('resposta');
}

const browser = await chromium.launch({ executablePath: '/opt/google/chrome/chrome', args: ['--no-sandbox'] });
const shots = process.env.SHOTS;
let falhas = 0;
async function caso(nome, fn) {
  try { await fn(); console.log('ok  ', nome); } catch (e) { falhas++; console.log('FALHA', nome, '\n     ', e.message.split('\n')[0]); }
}

await caso('index lista os 3 planos e leva ao cadastro com o plano marcado', async () => {
  const ctx = await novoContexto(browser, mockBase({}));
  const page = await ctx.newPage();
  const erros = []; page.on('pageerror', (e) => erros.push(e.message));
  await page.goto(`${base}/index.html`);
  await page.locator('.plano h2').first().waitFor();
  assert.deepEqual(await page.locator('.plano h2').allInnerTexts(), ['Treina Comigo', 'Força Comigo', 'Corre Comigo']);
  if (shots) await page.screenshot({ path: `${shots}/index.png`, fullPage: true });
  await page.locator('.plano', { hasText: 'Corre Comigo' }).getByRole('link', { name: 'Começar' }).click();
  await page.waitForURL(/cadastro\.html\?plano=corre/);
  await page.locator('input[name=plano_id][value=corre]').waitFor({ state: 'attached' });
  assert.equal(await page.locator('input[name=plano_id][value=corre]').isChecked(), true);
  assert.deepEqual(erros, []);
  await ctx.close();
});

await caso('login com senha errada mostra o erro em português', async () => {
  const ctx = await novoContexto(browser, mockBase({ loginFalha: true }));
  const page = await ctx.newPage();
  await page.goto(`${base}/index.html`);
  await page.fill('#email', 'a@b.com'); await page.fill('#senha', 'errada');
  await page.click('#form-login button');
  await page.locator('#erro-login').waitFor();
  assert.equal(await page.locator('#erro-login').innerText(), 'E-mail ou senha incorretos.');
  await ctx.close();
});

await caso('cadastro Corre Comigo: sem seção Musculação, com Corrida, e envia a anamnese', async () => {
  const estado = {};
  const ctx = await novoContexto(browser, mockBase(estado));
  const page = await ctx.newPage();
  const erros = []; page.on('pageerror', (e) => erros.push(e.message));
  await page.goto(`${base}/cadastro.html?plano=corre`);
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.fill('input[name=nome]', 'Ana Souza'); await page.fill('input[name=email]', 'ana@exemplo.com');
  await page.fill('input[name=telefone]', '21999990000'); await page.fill('input[name=senha]', '123456');
  await page.getByRole('button', { name: 'Continuar' }).click();
  const titulos = [];
  for (let i = 0; i < 12; i++) {
    const t = await page.locator('.passo h1').innerText();
    if (t === 'Tudo certo?') break;
    titulos.push(t);
    if (t === 'Saúde' && shots) await page.screenshot({ path: `${shots}/cadastro-saude.png`, fullPage: true });
    await preencherSecaoAtual(page);
    await page.getByRole('button', { name: 'Continuar' }).click();
  }
  assert.ok(!titulos.includes('Musculação'), 'mostrou Musculação: ' + titulos.join(', '));
  assert.ok(titulos.includes('Corrida'), 'faltou Corrida: ' + titulos.join(', '));
  await page.getByRole('button', { name: 'Enviar cadastro' }).click();
  await page.locator('.msg-erro').waitFor();
  assert.match(await page.locator('.msg-erro').innerText(), /Marque/);
  await page.locator('input[name=consentimento]').check({ force: true });
  if (shots) await page.screenshot({ path: `${shots}/cadastro-revisao.png`, fullPage: true });
  await page.getByRole('button', { name: 'Enviar cadastro' }).click();
  await page.getByText('Cadastro enviado').waitFor();
  assert.equal(estado.signup.data.plano_id, 'corre');
  assert.equal(estado.signup.data.nome, 'Ana Souza');
  assert.ok(estado.signup.data.anamnese.corr_relogio, 'anamnese sem corrida');
  assert.ok(!('musc_experiencia' in estado.signup.data.anamnese), 'anamnese com musculação');
  assert.equal(typeof estado.signup.data.anamnese.altura_cm, 'number');
  assert.deepEqual(erros, []);
  await ctx.close();
});

await caso('cadastro: obrigatória vazia mostra erro naquela pergunta e não avança', async () => {
  const ctx = await novoContexto(browser, mockBase({}));
  const page = await ctx.newPage();
  await page.goto(`${base}/cadastro.html?plano=treina`);
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.fill('input[name=nome]', 'Ana'); await page.fill('input[name=email]', 'ana@exemplo.com');
  await page.fill('input[name=telefone]', '21999990000'); await page.fill('input[name=senha]', '123456');
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.getByRole('button', { name: 'Continuar' }).click(); // Sobre você vazio
  assert.equal(await page.locator('.passo h1').innerText(), 'Sobre você');
  assert.ok(await page.locator('.com-erro').count() >= 4);
  await page.getByRole('button', { name: 'Voltar' }).click();
  assert.equal(await page.inputValue('input[name=nome]'), 'Ana');
  await ctx.close();
});

await caso('cadastro: senha curta e e-mail inválido barram a conta', async () => {
  const ctx = await novoContexto(browser, mockBase({}));
  const page = await ctx.newPage();
  await page.goto(`${base}/cadastro.html?plano=forca`);
  await page.getByRole('button', { name: 'Continuar' }).click();
  await page.fill('input[name=nome]', 'Ana'); await page.fill('input[name=email]', 'ana@');
  await page.fill('input[name=telefone]', '21999990000'); await page.fill('input[name=senha]', '123');
  await page.getByRole('button', { name: 'Continuar' }).click();
  assert.equal(await page.locator('.com-erro').count(), 2);
  await ctx.close();
});

for (const [status, texto] of [['pendente', 'Seu cadastro chegou para a Renata'], ['recusado', 'Cadastro não aprovado'], ['pausado', 'Acompanhamento pausado']]) {
  await caso(`aluno ${status} vê a tela certa`, async () => {
    const estado = { conta: { id: 'u1', nome: 'Ana Souza', status, is_admin: false, plano_nome: 'Treina Comigo', musculacao: true, corrida: true } };
    const ctx = await novoContexto(browser, mockBase(estado));
    const page = await ctx.newPage();
    await page.goto(`${base}/index.html`);
    await page.fill('#email', 'a@b.com'); await page.fill('#senha', '123456');
    await page.click('#form-login button');
    await page.waitForURL(/aluno\.html/);
    await page.getByText(texto).waitFor();
    assert.equal(await page.getByText('Musculação').count(), 0);
    await ctx.close();
  });
}

await caso('aluno ativo do Corre Comigo vê só Corrida e a mensalidade atrasada', async () => {
  const estado = {
    conta: { id: 'u1', nome: 'Ana Souza', status: 'ativo', is_admin: false, plano_nome: 'Corre Comigo', musculacao: false, corrida: true },
    cobrancas: [{ vencimento: '2026-10-05', pago_em: null, valor: 150 }],
  };
  const ctx = await novoContexto(browser, mockBase(estado));
  const page = await ctx.newPage();
  await page.goto(`${base}/index.html`);
  await page.fill('#email', 'a@b.com'); await page.fill('#senha', '123456');
  await page.click('#form-login button');
  await page.waitForURL(/aluno\.html/);
  await page.getByText('Oi, Ana').waitFor();
  assert.equal(await page.locator('h2', { hasText: 'Musculação' }).count(), 0);
  assert.equal(await page.locator('h2', { hasText: 'Corrida' }).count(), 1);
  assert.equal(await page.locator('.selo.erro').innerText(), 'Atrasada');
  if (shots) await page.screenshot({ path: `${shots}/aluno-ativo.png`, fullPage: true });
  await ctx.close();
});

await caso('admin que entra vai para o painel', async () => {
  const estado = { conta: { id: 'u1', nome: 'Renata', status: 'ativo', is_admin: true } };
  const ctx = await novoContexto(browser, mockBase(estado));
  const page = await ctx.newPage();
  await page.goto(`${base}/index.html`);
  await page.fill('#email', 'r@b.com'); await page.fill('#senha', '123456');
  await page.click('#form-login button');
  await page.waitForURL(/painel\.html/);
  await ctx.close();
});


function mockPainel(e) {
  const base = mockBase(e);
  return async (u, req) => {
    const m = req.method(), obj = (req.headers()['accept'] ?? '').includes('vnd.pgrst.object');
    const corpo = () => JSON.parse(req.postData() || '{}');
    if (m === 'OPTIONS') return { body: {} };
    if (u.pathname === '/rest/v1/perfis') return { body: e.alunos };
    if (u.pathname === '/rest/v1/anamneses') { const r = { respostas: e.anamnese }; return { body: obj ? r : [r] }; }
    if (u.pathname === '/rest/v1/rpc/aprovar_aluno') { const b = corpo(); const a = e.alunos.find((x) => x.id === b.p_aluno); a.status = 'ativo'; a.dia_vencimento = b.p_dia_vencimento; e.rpc = b; return { status: 204, body: null }; }
    if (u.pathname === '/rest/v1/cobrancas') {
      if (m === 'GET') { const ref = u.searchParams.get('referencia')?.replace('eq.', ''); const id = u.searchParams.get('aluno_id')?.replace('eq.', '');
        return { body: e.cobrancas.filter((c) => (!ref || c.referencia === ref) && (!id || c.aluno_id === id)) }; }
      if (m === 'POST') { e.upserts = (e.upserts ?? 0) + 1; for (const c of [].concat(corpo())) if (!e.cobrancas.some((x) => x.aluno_id === c.aluno_id && x.referencia === c.referencia)) e.cobrancas.push({ id: e.cobrancas.length + 1, pago_em: null, ...c }); return { status: 201, body: [] }; }
      if (m === 'PATCH') { const id = Number(u.searchParams.get('id').replace('eq.', '')); Object.assign(e.cobrancas.find((c) => c.id === id), corpo()); return { status: 204, body: null }; }
    }
    if (u.pathname === '/rest/v1/exercicios') {
      if (m === 'GET') return { body: e.exercicios };
      if (m === 'PATCH') { const id = Number(u.searchParams.get('id').replace('eq.', '')); const x = e.exercicios.find((c) => c.id === id); Object.assign(x, corpo()); return { body: obj ? x : [x] }; }
    }
    return base(u, req);
  };
}

async function entrarComoAdmin(browser, e) {
  e.conta = { id: 'adm', nome: 'Renata', status: 'ativo', is_admin: true };
  const ctx = await novoContexto(browser, mockPainel(e));
  const page = await ctx.newPage();
  const erros = []; page.on('pageerror', (x) => erros.push(x.message));
  await page.goto(`${base}/index.html`);
  await page.fill('#email', 'r@b.com'); await page.fill('#senha', '123456');
  await page.click('#form-login button');
  await page.waitForURL(/painel\.html/);
  return { ctx, page, erros };
}

const hojeSP = new Date(Date.now() - 3 * 3600e3).toISOString().slice(0, 10);
const refMes = hojeSP.slice(0, 7) + '-01';

await caso('painel: aprova pendente com dia de vencimento e mostra alerta da anamnese', async () => {
  const e = {
    alunos: [{ id: 'a1', nome: 'Ana Souza', email: 'ana@x.com', telefone: '21999990000', plano_id: 'treina', status: 'pendente', criado_em: '2026-10-30T10:00:00Z' }],
    anamnese: { objetivo: 'Emagrecer', dor_peito: 'sim', altura_cm: 165 }, cobrancas: [],
  };
  const { ctx, page, erros } = await entrarComoAdmin(browser, e);
  await page.getByText('Ana Souza').click();
  await page.getByText('Esta anamnese tem respostas que pedem atenção').waitFor();
  assert.equal(await page.locator('.alerta dt').innerText(), 'Sente dor no peito quando faz esforço?');
  if (shots) await page.screenshot({ path: `${shots}/painel-ficha.png`, fullPage: true });
  await page.fill('#dia', '15');
  await page.getByRole('button', { name: 'Aprovar' }).click();
  await page.getByText('Ativo', { exact: true }).waitFor();
  assert.deepEqual(e.rpc, { p_aluno: 'a1', p_dia_vencimento: 15 });
  assert.deepEqual(erros, []);
  await ctx.close();
});

await caso('painel: gera mensalidades do mês uma vez só e marca pago', async () => {
  const e = {
    alunos: [
      { id: 'a1', nome: 'Ana', plano_id: 'treina', status: 'ativo', dia_vencimento: 10, criado_em: '2026-10-01' },
      { id: 'a2', nome: 'Bia', plano_id: 'corre', status: 'ativo', dia_vencimento: 5, criado_em: '2026-10-01' },
      { id: 'a3', nome: 'Caio', plano_id: 'forca', status: 'pausado', dia_vencimento: 5, criado_em: '2026-10-01' },
    ], cobrancas: [],
  };
  const { ctx, page, erros } = await entrarComoAdmin(browser, e);
  await page.getByRole('tab', { name: 'Cobranças' }).click();
  await page.getByRole('button', { name: 'Gerar mensalidades (2)' }).click();
  await page.getByText('2 mensalidade(s) gerada(s)').waitFor();
  assert.equal(e.cobrancas.length, 2);
  assert.equal(e.cobrancas.find((c) => c.aluno_id === 'a2').vencimento, `${refMes.slice(0, 7)}-05`);
  assert.equal(await page.getByRole('button', { name: /Gerar mensalidades/ }).isDisabled(), true);
  page.once('dialog', (d) => d.accept('03/' + refMes.slice(5, 7) + '/' + refMes.slice(0, 4)));
  await page.getByRole('button', { name: 'Marcar pago' }).first().click();
  await page.getByText('Pagamento registrado').waitFor();
  assert.ok(e.cobrancas.some((c) => c.pago_em === `${refMes.slice(0, 7)}-03`));
  if (shots) await page.screenshot({ path: `${shots}/painel-cobrancas.png`, fullPage: true });
  assert.deepEqual(erros, []);
  await ctx.close();
});

await caso('painel: edita exercício, mostra prévia do YouTube e recusa link de fora', async () => {
  const e = { alunos: [], cobrancas: [], exercicios: [{ id: 1, nome: 'Agachamento Livre', grupo: 'Quadríceps', equipamento: 'Barra', instrucao: 'x', pontos_atencao: 'y', video_url: null, ativo: true }] };
  const { ctx, page, erros } = await entrarComoAdmin(browser, e);
  await page.getByRole('tab', { name: 'Biblioteca' }).click();
  await page.getByText('Agachamento Livre').click();
  await page.fill('#ex-video', 'https://vimeo.com/123');
  await page.getByRole('button', { name: 'Salvar exercício' }).click();
  await page.getByText('O link do vídeo precisa ser do YouTube.').waitFor();
  await page.fill('#ex-video', 'https://youtu.be/dQw4w9WgXcQ');
  await page.locator('#ex-prev iframe').waitFor({ state: 'attached' });
  await page.getByRole('button', { name: 'Salvar exercício' }).click();
  await page.getByText('Exercício salvo').waitFor();
  assert.equal(e.exercicios[0].video_url, 'https://youtu.be/dQw4w9WgXcQ');
  assert.equal(await page.locator('.selo', { hasText: 'Vídeo' }).count(), 1);
  assert.deepEqual(erros, []);
  await ctx.close();
});

await caso('aluno que abre o painel volta para o app dele', async () => {
  const e = { conta: { id: 'u1', nome: 'Ana', status: 'ativo', is_admin: false, plano_nome: 'Treina Comigo', musculacao: true, corrida: true } };
  const ctx = await novoContexto(browser, mockBase(e));
  const page = await ctx.newPage();
  await page.goto(`${base}/index.html`);
  await page.fill('#email', 'a@b.com'); await page.fill('#senha', '123456');
  await page.click('#form-login button');
  await page.waitForURL(/aluno\.html/);
  await page.goto(`${base}/painel.html`);
  await page.waitForURL(/aluno\.html/);
  await ctx.close();
});

await browser.close(); srv.close();
console.log(falhas ? `\n${falhas} falha(s)` : '\nTodos os casos passaram');
process.exit(falhas ? 1 : 0);
