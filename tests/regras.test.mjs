import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ANAMNESE, validarCadastro, perguntasDoPlano, statusCobranca, telaDoAluno, proximoVencimento,
} from '../js/regras.js';

const PLANOS = [
  { id: 'treina', nome: 'Treina Comigo', musculacao: true, corrida: true, ativo: true },
  { id: 'forca', nome: 'Força Comigo', musculacao: true, corrida: false, ativo: true },
  { id: 'corre', nome: 'Corre Comigo', musculacao: false, corrida: true, ativo: true },
];

function respostasCompletas(plano) {
  const r = {};
  for (const p of perguntasDoPlano(plano)) {
    if (!p.obrigatoria) continue;
    if (p.tipo === 'numero') r[p.id] = Math.round(((p.min ?? 0) + (p.max ?? 100)) / 2);
    else if (p.tipo === 'escolha') r[p.id] = p.opcoes[0];
    else if (p.tipo === 'multipla') r[p.id] = [p.opcoes[0]];
    else if (p.tipo === 'simNao') r[p.id] = 'nao';
    else if (p.tipo === 'data') r[p.id] = '1990-05-10';
    else r[p.id] = 'resposta';
  }
  return r;
}

function cadastroValido(plano_id = 'treina') {
  const plano = PLANOS.find((p) => p.id === plano_id);
  return {
    nome: 'Ana Souza', email: 'ana@exemplo.com', senha: '123456', telefone: '21999990000',
    plano_id, respostas: respostasCompletas(plano),
  };
}

test('statusCobranca: vence hoje é aberta, dia seguinte é atrasada', () => {
  assert.equal(statusCobranca({ vencimento: '2026-11-10', pago_em: null }, '2026-11-10'), 'aberta');
  assert.equal(statusCobranca({ vencimento: '2026-11-10', pago_em: null }, '2026-11-11'), 'atrasada');
  assert.equal(statusCobranca({ vencimento: '2026-11-10', pago_em: null }, '2026-11-01'), 'aberta');
});

test('statusCobranca: paga depois do vencimento continua paga', () => {
  assert.equal(statusCobranca({ vencimento: '2026-11-10', pago_em: '2026-11-15' }, '2026-11-20'), 'paga');
});

test('telaDoAluno por situação', () => {
  assert.equal(telaDoAluno({ status: 'pendente' }), 'aguardando');
  assert.equal(telaDoAluno({ status: 'recusado' }), 'recusado');
  assert.equal(telaDoAluno({ status: 'pausado' }), 'pausado');
  assert.equal(telaDoAluno({ status: 'ativo', musculacao: true, corrida: false }), 'app');
  assert.equal(telaDoAluno(null), 'aguardando');
});

test('perguntasDoPlano: Corre Comigo não tem musculação e tem corrida', () => {
  const ps = perguntasDoPlano({ musculacao: false, corrida: true });
  assert.ok(!ps.some((p) => p.modulo === 'musculacao'));
  assert.ok(ps.some((p) => p.modulo === 'corrida'));
});

test('perguntasDoPlano: Força Comigo não tem corrida; Treina Comigo tem as duas', () => {
  const forca = perguntasDoPlano({ musculacao: true, corrida: false });
  assert.ok(!forca.some((p) => p.modulo === 'corrida'));
  const treina = perguntasDoPlano({ musculacao: true, corrida: true });
  assert.ok(treina.some((p) => p.modulo === 'corrida') && treina.some((p) => p.modulo === 'musculacao'));
});

test('ANAMNESE: ids únicos e toda escolha tem opções', () => {
  const ids = ANAMNESE.map((p) => p.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const p of ANAMNESE) if (p.tipo === 'escolha' || p.tipo === 'multipla') assert.ok(p.opcoes?.length >= 2, p.id);
});

test('validarCadastro: completo passa', () => {
  for (const id of ['treina', 'forca', 'corre']) {
    const r = validarCadastro(cadastroValido(id), PLANOS);
    assert.equal(r.ok, true, `${id}: ${JSON.stringify(r.erros)}`);
  }
});

test('validarCadastro: sem plano, plano inexistente ou inativo', () => {
  const c = cadastroValido(); delete c.plano_id;
  assert.ok(validarCadastro(c, PLANOS).erros.plano_id);
  assert.ok(validarCadastro({ ...cadastroValido(), plano_id: 'xyz' }, PLANOS).erros.plano_id);
  const inativos = PLANOS.map((p) => (p.id === 'treina' ? { ...p, ativo: false } : p));
  assert.ok(validarCadastro(cadastroValido('treina'), inativos).erros.plano_id);
});

test('validarCadastro: senha curta, e-mail inválido, nome vazio', () => {
  const r = validarCadastro({ ...cadastroValido(), senha: '12345', email: 'ana@', nome: '  ' }, PLANOS);
  assert.equal(r.ok, false);
  assert.ok(r.erros.senha && r.erros.email && r.erros.nome);
});

test('validarCadastro: pergunta obrigatória vazia aponta o id dela', () => {
  const c = cadastroValido();
  const obrig = perguntasDoPlano(PLANOS[0]).find((p) => p.obrigatoria && p.tipo === 'textoLongo');
  c.respostas[obrig.id] = '   ';
  const r = validarCadastro(c, PLANOS);
  assert.equal(r.ok, false);
  assert.ok(r.erros[obrig.id]);
});

test('validarCadastro: número fora da faixa', () => {
  const c = cadastroValido();
  c.respostas.altura_cm = 20;
  assert.ok(validarCadastro(c, PLANOS).erros.altura_cm);
});

test('validarCadastro: perguntas de módulo fora do plano não são exigidas', () => {
  const c = cadastroValido('corre');
  const r = validarCadastro(c, PLANOS);
  assert.equal(r.ok, true);
});

test('proximoVencimento', () => {
  assert.equal(proximoVencimento(10, '2026-11-10'), '2026-11-10');
  assert.equal(proximoVencimento(10, '2026-11-11'), '2026-12-10');
  assert.equal(proximoVencimento(5, '2026-12-20'), '2027-01-05');
  assert.equal(proximoVencimento(28, '2027-02-01'), '2027-02-28');
});
