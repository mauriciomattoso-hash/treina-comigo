import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { lerExLib, gerarSql, gerarLinhas } from '../scripts/gerar_biblioteca.mjs';

const EX_LIB = JSON.parse(fs.readFileSync(new URL('../scripts/ex_lib.json', import.meta.url)));
const TEXTOS = JSON.parse(fs.readFileSync(new URL('../scripts/biblioteca_textos.json', import.meta.url)));

test('ex_lib.json tem os 188 exercícios do protocolo, sem nome repetido', () => {
  assert.equal(EX_LIB.length, 188);
  assert.equal(new Set(EX_LIB.map((x) => x[0])).size, 188);
});

test('todo exercício tem instrução e de 2 a 5 pontos de atenção', () => {
  for (const [nome] of EX_LIB) {
    const t = TEXTOS[nome];
    assert.ok(t, `sem texto: ${nome}`);
    assert.ok(t.instrucao?.trim().length >= 30, `instrução curta: ${nome}`);
    const pontos = String(t.pontos_atencao ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
    assert.ok(pontos.length >= 2 && pontos.length <= 5, `${nome}: ${pontos.length} pontos`);
  }
});

test('não sobra texto de exercício que não existe na lista', () => {
  const nomes = new Set(EX_LIB.map((x) => x[0]));
  assert.deepEqual(Object.keys(TEXTOS).filter((k) => !nomes.has(k)), []);
});

test('gerarSql: 188 linhas, aspas escapadas, idempotente', () => {
  const sql = gerarSql(EX_LIB, TEXTOS);
  assert.equal((sql.match(/^\s*\('/gm) ?? []).length, 188);
  assert.match(sql, /on conflict \(nome\) do update/);
  const comAspa = gerarSql([["Rosca D'Ávila", 'Bíceps', 'rosca', 'Barra']], { "Rosca D'Ávila": { instrucao: "Ela é d'ali", pontos_atencao: 'a\nb' } });
  assert.match(comAspa, /'Rosca D''Ávila'/);
  assert.match(comAspa, /'Ela é d''ali'/);
});

test('lerExLib extrai a lista do index.html do protocolo', () => {
  const html = 'x\nconst EX_LIB = [["A", "Peito", "p", "Barra"], ["B", "Costas", "q", "Cabo"]];\ny';
  assert.deepEqual(lerExLib(html), [['A', 'Peito', 'p', 'Barra'], ['B', 'Costas', 'q', 'Cabo']]);
});

test('gerarLinhas: 188 linhas com os campos da tabela', () => {
  const l = gerarLinhas(EX_LIB, TEXTOS);
  assert.equal(l.length, 188);
  assert.deepEqual(Object.keys(l[0]).sort(), ['equipamento', 'grupo', 'instrucao', 'nome', 'padrao', 'pontos_atencao']);
  assert.ok(l.every((x) => x.instrucao && x.pontos_atencao));
});
