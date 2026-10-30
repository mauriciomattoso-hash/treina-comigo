// Cliente do Supabase e funções de conta. A página carrega antes o supabase-js (UMD) do jsDelivr.
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

export const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, storageKey: 'treina-comigo-auth' },
});

const MENSAGENS = {
  'Invalid login credentials': 'E-mail ou senha incorretos.',
  'User already registered': 'Já existe uma conta com este e-mail. Entre com sua senha.',
  'Email not confirmed': 'Seu e-mail ainda não foi confirmado.',
  'Password should be at least 6 characters.': 'A senha precisa ter pelo menos 6 caracteres.',
};
export function traduzirErro(e) {
  const m = String(e?.message ?? e ?? '');
  for (const [k, v] of Object.entries(MENSAGENS)) if (m.includes(k)) return v;
  if (m.includes('plano inválido') || m.includes('Database error saving new user')) return 'Não foi possível criar a conta com este plano. Escolha o plano de novo.';
  if (m.includes('Failed to fetch') || m.includes('NetworkError')) return 'Sem conexão. Confira a internet e tente de novo.';
  return 'Algo deu errado. Tente de novo em instantes.';
}

export async function entrar(email, senha) {
  const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password: senha });
  if (error) return { ok: false, erro: traduzirErro(error) };
  return { ok: true };
}

export async function sair() {
  await sb.auth.signOut();
  location.href = 'index.html';
}

// dados: { nome, email, senha, telefone, plano_id, respostas }
export async function cadastrar(dados) {
  const { data, error } = await sb.auth.signUp({
    email: dados.email.trim(),
    password: dados.senha,
    options: { data: { nome: dados.nome.trim(), telefone: dados.telefone, plano_id: dados.plano_id, anamnese: dados.respostas ?? {} } },
  });
  if (error) return { ok: false, erro: traduzirErro(error) };
  // Com a confirmação de e-mail desligada, o signUp já devolve a sessão; se vier sem, entra direto.
  if (!data.session) {
    const r = await entrar(dados.email, dados.senha);
    if (!r.ok) return { ok: true, semSessao: true };
  }
  return { ok: true };
}

export async function minhaConta() {
  const { data: s } = await sb.auth.getSession();
  if (!s.session) return null;
  const { data, error } = await sb.from('minha_conta').select('*').maybeSingle();
  if (error) throw error;
  return data;
}

export async function planosAtivos() {
  const { data, error } = await sb.from('planos').select('*').eq('ativo', true).order('ordem');
  if (error) throw error;
  return data;
}

// Leva para a tela certa de quem já está logado. Devolve a conta, ou null se não houver login.
export async function exigirLogin(destinoSemLogin = 'index.html') {
  const conta = await minhaConta();
  if (!conta) { location.replace(destinoSemLogin); return null; }
  return conta;
}

export function destinoDaConta(conta) {
  return conta?.is_admin ? 'painel.html' : 'aluno.html';
}

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
