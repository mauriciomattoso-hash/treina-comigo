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
  await ctx.route('https://naoulsepwaeivertruva.supabase.co/**', async (r) => {
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

await browser.close(); srv.close();
console.log(falhas ? `\n${falhas} falha(s)` : '\nTodos os casos passaram');
process.exit(falhas ? 1 : 0);
