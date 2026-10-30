-- Testes do banco base. Cada bloco roda numa transação e desfaz tudo no fim.
-- Um teste que falha levanta 'FALHA <nome>'. Rodar inteiro: sem erro = tudo passou.
-- Usuários de teste: A e B (alunos), ADM (admin, papel vem do app_metadata, que o aluno não controla).

begin;

insert into auth.users (id, email, raw_user_meta_data, raw_app_meta_data, aud, role)
values
  ('00000000-0000-0000-0000-00000000000a', 'a@teste.com',
   '{"nome":"Aluno A","plano_id":"forca","status":"ativo","is_admin":true,"anamnese":{"objetivo":"Emagrecer"}}', '{}', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-00000000000b', 'b@teste.com',
   '{"nome":"Aluno B","plano_id":"corre","anamnese":{"objetivo":"Correr uma prova"}}', '{}', 'authenticated', 'authenticated'),
  ('00000000-0000-0000-0000-0000000000ad', 'adm@teste.com',
   '{"nome":"Admin"}', '{"papel":"admin"}', 'authenticated', 'authenticated');

insert into public.cobrancas (aluno_id, referencia, valor, vencimento) values
  ('00000000-0000-0000-0000-00000000000a', '2026-11-01', 100, '2026-11-10'),
  ('00000000-0000-0000-0000-00000000000b', '2026-11-01', 120, '2026-11-10');

-- t_signup_forca_pendente: metadados forjados não viram ativo nem admin
do $$ begin
  if not exists (select 1 from public.perfis where id = '00000000-0000-0000-0000-00000000000a'
                 and status = 'pendente' and is_admin = false and plano_id = 'forca')
  then raise exception 'FALHA t_signup_forca_pendente'; end if;
end $$;

-- t_anamnese_salva_e_sai_do_token: anamnese vai para a tabela e sai dos metadados do login
do $$ begin
  if (select respostas->>'objetivo' from public.anamneses where aluno_id = '00000000-0000-0000-0000-00000000000a') is distinct from 'Emagrecer'
  then raise exception 'FALHA t_anamnese_salva (tabela)'; end if;
  if (select raw_user_meta_data ? 'anamnese' from auth.users where id = '00000000-0000-0000-0000-00000000000a')
  then raise exception 'FALHA t_anamnese_salva (ficou no token)'; end if;
end $$;

-- t_admin_por_app_metadata
do $$ begin
  if not exists (select 1 from public.perfis where id = '00000000-0000-0000-0000-0000000000ad' and is_admin and status = 'ativo')
  then raise exception 'FALHA t_admin_por_app_metadata'; end if;
end $$;

-- t_signup_plano_invalido
do $$ begin
  begin
    insert into auth.users (id, email, raw_user_meta_data, aud, role)
    values ('00000000-0000-0000-0000-0000000000cc', 'c@teste.com', '{"nome":"C","plano_id":"xyz"}', 'authenticated', 'authenticated');
    raise exception 'FALHA t_signup_plano_invalido (aceitou)';
  exception when others then
    if sqlerrm not like '%plano inválido%' then raise; end if;
  end;
  if exists (select 1 from public.perfis where id = '00000000-0000-0000-0000-0000000000cc')
  then raise exception 'FALHA t_signup_plano_invalido (perfil órfão)'; end if;
end $$;

-- t_signup_sem_plano
do $$ begin
  begin
    insert into auth.users (id, email, raw_user_meta_data, aud, role)
    values ('00000000-0000-0000-0000-0000000000cd', 'd@teste.com', '{"nome":"D"}', 'authenticated', 'authenticated');
    raise exception 'FALHA t_signup_sem_plano (aceitou)';
  exception when others then
    if sqlerrm not like '%plano inválido%' then raise; end if;
  end;
end $$;

-- ===== como aluno A =====
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-00000000000a","role":"authenticated"}', true);
set local role authenticated;

-- t_rls_isolamento
do $$ begin
  if exists (select 1 from public.anamneses where aluno_id <> '00000000-0000-0000-0000-00000000000a')
  then raise exception 'FALHA t_rls_isolamento (anamnese de outro)'; end if;
  if exists (select 1 from public.cobrancas where aluno_id = '00000000-0000-0000-0000-00000000000b')
  then raise exception 'FALHA t_rls_isolamento (cobrança de outro)'; end if;
  if (select count(*) from public.perfis) <> 1
  then raise exception 'FALHA t_rls_isolamento (vê outros perfis)'; end if;
  if (select count(*) from public.cobrancas) <> 1
  then raise exception 'FALHA t_rls_isolamento (não vê a própria cobrança)'; end if;
end $$;

-- t_minha_conta
do $$ begin
  if not exists (select 1 from public.minha_conta where status = 'pendente' and musculacao and not corrida)
  then raise exception 'FALHA t_minha_conta'; end if;
end $$;

-- t_aluno_nao_aprova
do $$ begin
  begin
    perform public.aprovar_aluno('00000000-0000-0000-0000-00000000000a', 10);
    raise exception 'FALHA t_aluno_nao_aprova (aprovou)';
  exception when others then
    if sqlerrm not like '%acesso negado%' then raise; end if;
  end;
end $$;

-- t_aluno_nao_edita_status
do $$ declare n int; begin
  update public.perfis set status = 'ativo', is_admin = true where id = '00000000-0000-0000-0000-00000000000a';
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FALHA t_aluno_nao_edita_status'; end if;
end $$;

-- t_aluno_nao_edita_biblioteca
do $$ declare n int; begin
  update public.exercicios set nome = nome;
  get diagnostics n = row_count;
  if n <> 0 then raise exception 'FALHA t_aluno_nao_edita_biblioteca'; end if;
end $$;

reset role;

-- ===== anônimo =====
select set_config('request.jwt.claims', '{"role":"anon"}', true);
set local role anon;

-- t_anonimo_ve_planos
do $$ begin
  if (select count(*) from public.planos) <> 3 then raise exception 'FALHA t_anonimo_ve_planos (planos)'; end if;
  if (select count(*) from public.perfis) <> 0 then raise exception 'FALHA t_anonimo_ve_planos (perfis)'; end if;
  if (select count(*) from public.exercicios) <> 0 then raise exception 'FALHA t_anonimo_ve_planos (biblioteca)'; end if;
end $$;

reset role;

-- ===== como admin =====
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-0000000000ad","role":"authenticated"}', true);
set local role authenticated;

-- t_admin_aprova
do $$ begin
  perform public.aprovar_aluno('00000000-0000-0000-0000-00000000000a', 10);
  if not exists (select 1 from public.perfis where id = '00000000-0000-0000-0000-00000000000a'
                 and status = 'ativo' and dia_vencimento = 10 and aprovado_em is not null)
  then raise exception 'FALHA t_admin_aprova'; end if;
end $$;

-- t_admin_troca_plano_e_ve_todos
do $$ begin
  perform public.trocar_plano('00000000-0000-0000-0000-00000000000a', 'corre');
  if (select plano_id from public.perfis where id = '00000000-0000-0000-0000-00000000000a') <> 'corre'
  then raise exception 'FALHA t_admin_troca_plano'; end if;
  if (select count(*) from public.anamneses) < 2 then raise exception 'FALHA t_admin_ve_todos'; end if;
end $$;

-- t_admin_status_invalido
do $$ begin
  begin
    perform public.definir_status('00000000-0000-0000-0000-00000000000a', 'xyz');
    raise exception 'FALHA t_admin_status_invalido (aceitou)';
  exception when others then
    if sqlerrm not like '%situação inválida%' then raise; end if;
  end;
end $$;

reset role;

select 'TODOS OS TESTES PASSARAM' as resultado;
rollback;
