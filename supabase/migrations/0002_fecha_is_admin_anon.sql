-- Visitante sem login lê só os planos ativos, sem chamar is_admin().
drop policy planos_ler on public.planos;
create policy planos_ler_anon on public.planos for select to anon using (ativo);
create policy planos_ler on public.planos for select to authenticated using (ativo or public.is_admin());
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;
