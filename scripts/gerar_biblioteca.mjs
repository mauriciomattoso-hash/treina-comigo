// Gera supabase/migrations/0003_biblioteca.sql a partir da lista do protocolo e dos textos.
// Uso: node scripts/gerar_biblioteca.mjs [caminho do index.html do protocolo]
//   Com o caminho, atualiza scripts/ex_lib.json a partir do EX_LIB do protocolo antes de gerar.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

export function lerExLib(html) {
  const m = html.match(/const EX_LIB = (\[\[[\s\S]*?\]\]);/);
  if (!m) throw new Error('EX_LIB não encontrado');
  return JSON.parse(m[1]);
}

const q = (s) => (s == null || s === '' ? 'null' : `'${String(s).replace(/'/g, "''")}'`);

// Linhas prontas para gravar na tabela exercicios (usado pelo botão do painel).
export function gerarLinhas(exLib, textos) {
  return exLib.map(([nome, grupo, padrao, equipamento]) => ({
    nome, grupo, padrao, equipamento, instrucao: textos[nome]?.instrucao ?? null, pontos_atencao: textos[nome]?.pontos_atencao ?? null,
  }));
}

export function gerarSql(exLib, textos) {
  const linhas = exLib.map(([nome, grupo, padrao, equipamento]) => {
    const t = textos[nome] ?? {};
    return `  (${q(nome)}, ${q(grupo)}, ${q(padrao)}, ${q(equipamento)}, ${q(t.instrucao)}, ${q(t.pontos_atencao)})`;
  });
  return `-- Biblioteca inicial: ${exLib.length} exercícios do protocolo, com instrução e pontos de atenção.
-- Gerado por scripts/gerar_biblioteca.mjs. Rodar de novo não apaga vídeo nem texto que a Renata já editou.
insert into public.exercicios (nome, grupo, padrao, equipamento, instrucao, pontos_atencao) values
${linhas.join(',\n')}
on conflict (nome) do update set
  grupo = excluded.grupo, padrao = excluded.padrao, equipamento = excluded.equipamento,
  instrucao = coalesce(public.exercicios.instrucao, excluded.instrucao),
  pontos_atencao = coalesce(public.exercicios.pontos_atencao, excluded.pontos_atencao);
`;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const dir = new URL('./', import.meta.url);
  if (process.argv[2]) fs.writeFileSync(new URL('ex_lib.json', dir), JSON.stringify(lerExLib(fs.readFileSync(process.argv[2], 'utf8'))) + '\n');
  const exLib = JSON.parse(fs.readFileSync(new URL('ex_lib.json', dir)));
  const textos = JSON.parse(fs.readFileSync(new URL('biblioteca_textos.json', dir)));
  const faltando = exLib.filter(([n]) => !textos[n]).map(([n]) => n);
  if (faltando.length) { console.error('Sem texto:', faltando.join(', ')); process.exit(1); }
  fs.writeFileSync(new URL('../supabase/migrations/0003_biblioteca.sql', dir), gerarSql(exLib, textos));
  fs.mkdirSync(new URL('../data/', dir), { recursive: true });
  fs.writeFileSync(new URL('../data/biblioteca-inicial.json', dir), JSON.stringify(gerarLinhas(exLib, textos)) + '\n');
  console.log(`0003_biblioteca.sql e data/biblioteca-inicial.json com ${exLib.length} exercícios`);
}
