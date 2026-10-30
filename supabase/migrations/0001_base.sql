-- Treina Comigo — banco base: planos, alunos, anamnese, cobranças, biblioteca e regras de acesso.

-- ---------- Tabelas ----------
create table public.planos (
  id text primary key,
  nome text not null,
  descricao text,
  musculacao boolean not null,
  corrida boolean not null,
  valor_mensal numeric(10,2) not null default 0,
  ativo boolean not null default true,
  ordem int not null default 0
);

insert into public.planos (id, nome, descricao, musculacao, corrida, ordem) values
  ('treina', 'Treina Comigo', 'Musculação e corrida, tudo acompanhado de perto.', true, true, 1),
  ('forca',  'Força Comigo',  'Musculação com treino montado para você.', true, false, 2),
  ('corre',  'Corre Comigo',  'Corrida com plano semanal e acompanhamento.', false, true, 3);

create table public.perfis (
  id uuid primary key references auth.users (id) on delete cascade,
  nome text not null,
  email text,
  telefone text,
  plano_id text references public.planos (id),
  status text not null default 'pendente' check (status in ('pendente', 'ativo', 'recusado', 'pausado')),
  is_admin boolean not null default false,
  dia_vencimento int check (dia_vencimento between 1 and 28),
  criado_em timestamptz not null default now(),
  aprovado_em timestamptz
);
create index perfis_status on public.perfis (status);

create table public.anamneses (
  id bigint generated always as identity primary key,
  aluno_id uuid not null unique references public.perfis (id) on delete cascade,
  respostas jsonb not null default '{}'::jsonb,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

create table public.cobrancas (
  id bigint generated always as identity primary key,
  aluno_id uuid not null references public.perfis (id) on delete cascade,
  referencia date not null check (extract(day from referencia) = 1),
  valor numeric(10,2) not null check (valor >= 0),
  vencimento date not null,
  pago_em date,
  obs text,
  criado_em timestamptz not null default now(),
  unique (aluno_id, referencia)
);
create index cobrancas_referencia on public.cobrancas (referencia);

create table public.exercicios (
  id bigint generated always as identity primary key,
  nome text not null unique,
  grupo text not null,
  padrao text,
  equipamento text,
  instrucao text,
  pontos_atencao text,
  video_url text,
  ativo boolean not null default true,
  atualizado_em timestamptz not null default now()
);
create index exercicios_grupo on public.exercicios (grupo);

-- ---------- Quem é admin (SECURITY DEFINER evita recursão nas políticas de perfis) ----------
create function public.is_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select coalesce((select p.is_admin from public.perfis p where p.id = auth.uid()), false);
$$;

-- ---------- Cadastro: cria o perfil e a anamnese a partir do signUp ----------
-- O papel de admin só vem do app_metadata, que o navegador não consegue definir.
create function public.criar_perfil() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  v_meta jsonb := coalesce(new.raw_user_meta_data, '{}'::jsonb);
  v_plano text := nullif(trim(v_meta->>'plano_id'), '');
  v_nome text := left(coalesce(nullif(trim(v_meta->>'nome'), ''), split_part(new.email, '@', 1)), 120);
begin
  if coalesce(new.raw_app_meta_data->>'papel', '') = 'admin' then
    insert into public.perfis (id, nome, email, status, is_admin)
    values (new.id, v_nome, new.email, 'ativo', true);
    return new;
  end if;

  if v_plano is null or not exists (select 1 from public.planos where id = v_plano and ativo) then
    raise exception 'plano inválido';
  end if;

  insert into public.perfis (id, nome, email, telefone, plano_id)
  values (new.id, v_nome, new.email, left(nullif(trim(v_meta->>'telefone'), ''), 30), v_plano);

  insert into public.anamneses (aluno_id, respostas)
  values (new.id, case when jsonb_typeof(v_meta->'anamnese') = 'object' then v_meta->'anamnese' else '{}'::jsonb end);

  -- a anamnese não fica nos metadados do login (iria dentro de todo token)
  update auth.users set raw_user_meta_data = v_meta - 'anamnese' - 'status' - 'is_admin' where id = new.id;
  return new;
end;
$$;

create trigger ao_criar_usuario
  after insert on auth.users
  for each row execute function public.criar_perfil();

-- ---------- Ações do painel (só admin) ----------
create function public.exigir_admin() returns void
language plpgsql stable security definer set search_path = '' as $$
begin
  if not public.is_admin() then raise exception 'acesso negado'; end if;
end;
$$;

create function public.aprovar_aluno(p_aluno uuid, p_dia_vencimento int) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform public.exigir_admin();
  if p_dia_vencimento is null or p_dia_vencimento not between 1 and 28 then raise exception 'dia de vencimento inválido'; end if;
  update public.perfis set status = 'ativo', dia_vencimento = p_dia_vencimento, aprovado_em = now()
  where id = p_aluno and not is_admin;
  if not found then raise exception 'aluno não encontrado'; end if;
end;
$$;

create function public.recusar_aluno(p_aluno uuid) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform public.exigir_admin();
  update public.perfis set status = 'recusado' where id = p_aluno and not is_admin;
  if not found then raise exception 'aluno não encontrado'; end if;
end;
$$;

create function public.definir_status(p_aluno uuid, p_status text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform public.exigir_admin();
  if p_status not in ('pendente', 'ativo', 'recusado', 'pausado') then raise exception 'situação inválida'; end if;
  update public.perfis set status = p_status,
    aprovado_em = case when p_status = 'ativo' then coalesce(aprovado_em, now()) else aprovado_em end
  where id = p_aluno and not is_admin;
  if not found then raise exception 'aluno não encontrado'; end if;
end;
$$;

create function public.trocar_plano(p_aluno uuid, p_plano text) returns void
language plpgsql security definer set search_path = '' as $$
begin
  perform public.exigir_admin();
  if not exists (select 1 from public.planos where id = p_plano) then raise exception 'plano inválido'; end if;
  update public.perfis set plano_id = p_plano where id = p_aluno and not is_admin;
  if not found then raise exception 'aluno não encontrado'; end if;
end;
$$;

revoke execute on function public.criar_perfil(), public.exigir_admin() from public, anon, authenticated;
revoke execute on function public.aprovar_aluno(uuid, int), public.recusar_aluno(uuid),
  public.definir_status(uuid, text), public.trocar_plano(uuid, text) from public, anon;
grant execute on function public.aprovar_aluno(uuid, int), public.recusar_aluno(uuid),
  public.definir_status(uuid, text), public.trocar_plano(uuid, text) to authenticated;

-- ---------- Conta do usuário logado ----------
create view public.minha_conta with (security_invoker = true) as
  select p.id, p.nome, p.email, p.telefone, p.status, p.is_admin, p.plano_id, p.dia_vencimento,
         pl.nome as plano_nome, coalesce(pl.musculacao, false) as musculacao, coalesce(pl.corrida, false) as corrida
  from public.perfis p left join public.planos pl on pl.id = p.plano_id
  where p.id = auth.uid();

-- ---------- Regras de acesso ----------
alter table public.planos enable row level security;
alter table public.perfis enable row level security;
alter table public.anamneses enable row level security;
alter table public.cobrancas enable row level security;
alter table public.exercicios enable row level security;

create policy planos_ler on public.planos for select to anon, authenticated using (ativo or public.is_admin());
create policy planos_admin on public.planos for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy perfis_ler on public.perfis for select to authenticated using (id = auth.uid() or public.is_admin());
create policy perfis_admin on public.perfis for update to authenticated using (public.is_admin()) with check (public.is_admin());

create policy anamneses_ler on public.anamneses for select to authenticated using (aluno_id = auth.uid() or public.is_admin());
create policy anamneses_admin on public.anamneses for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy cobrancas_ler on public.cobrancas for select to authenticated using (aluno_id = auth.uid() or public.is_admin());
create policy cobrancas_admin on public.cobrancas for all to authenticated using (public.is_admin()) with check (public.is_admin());

create policy exercicios_ler on public.exercicios for select to authenticated using (ativo or public.is_admin());
create policy exercicios_admin on public.exercicios for all to authenticated using (public.is_admin()) with check (public.is_admin());

grant select on public.minha_conta to authenticated;
