-- Esquema de KRAZE en Supabase. Se puede volver a ejecutar sin romper nada.
-- Pedidos: se crean desde el checkout con la función create_order (con o sin sesión).
-- Cada cliente con cuenta solo puede LEER sus propios pedidos; el estado lo cambia la marca
-- desde el panel de Supabase (Table editor → orders → status).

create table if not exists public.orders (
  id            bigint generated always as identity primary key,  -- número correlativo del pedido (#000001)
  user_id       uuid references auth.users (id) on delete set null,
  customer_name text not null,
  email         text not null,
  phone         text not null,
  address       text not null,
  reference     text,
  district      text not null,
  province      text not null,
  department    text not null,
  payment_method text not null,
  items         jsonb not null,          -- [{slug, name, color, size, qty, unit_price, subtotal, image}]
  subtotal      numeric(10,2) not null,
  discount      numeric(10,2) not null default 0,
  shipping      numeric(10,2) not null default 0,
  total         numeric(10,2) not null,
  status        text not null default 'pendiente'
                check (status in ('pendiente', 'confirmado', 'enviado', 'entregado', 'cancelado')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists orders_user_id_idx on public.orders (user_id, created_at desc);

alter table public.orders enable row level security;

drop policy if exists "Clientes ven sus pedidos" on public.orders;
create policy "Clientes ven sus pedidos" on public.orders
  for select to authenticated
  using ((select auth.uid()) = user_id);

-- Permisos explícitos (este proyecto no da permisos automáticos a tablas nuevas).
-- Los clientes solo leen (y la política de arriba los limita a sus pedidos); nadie escribe directo
-- desde el navegador: los pedidos entran por create_order. service_role es para el panel/servidor.
revoke all on public.orders from anon, authenticated;
grant select on public.orders to authenticated;
grant all on public.orders to service_role;

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- Crea un pedido y devuelve su número. Si hay sesión, lo asocia al usuario.
create or replace function public.create_order(
  p_customer_name text, p_email text, p_phone text, p_address text, p_reference text,
  p_district text, p_province text, p_department text, p_payment_method text,
  p_items jsonb, p_subtotal numeric, p_discount numeric, p_shipping numeric, p_total numeric
) returns bigint
language plpgsql security definer set search_path = '' as $$
declare
  new_id bigint;
begin
  if jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 or jsonb_array_length(p_items) > 50 then
    raise exception 'El pedido no tiene productos válidos';
  end if;
  if coalesce(trim(p_customer_name), '') = '' or coalesce(trim(p_phone), '') = '' or coalesce(trim(p_address), '') = '' then
    raise exception 'Faltan datos del cliente';
  end if;
  if p_total < 0 or p_subtotal < 0 or p_discount < 0 or p_shipping < 0 then
    raise exception 'Montos inválidos';
  end if;

  insert into public.orders (
    user_id, customer_name, email, phone, address, reference, district, province, department,
    payment_method, items, subtotal, discount, shipping, total
  ) values (
    auth.uid(), left(trim(p_customer_name), 120), left(trim(p_email), 200), left(trim(p_phone), 40),
    left(trim(p_address), 300), nullif(left(trim(coalesce(p_reference, '')), 300), ''),
    left(trim(p_district), 120), left(trim(p_province), 120), left(trim(p_department), 60),
    left(trim(p_payment_method), 60), p_items, p_subtotal, p_discount, p_shipping, p_total
  ) returning id into new_id;

  return new_id;
end $$;

revoke all on function public.create_order from public;
grant execute on function public.create_order to anon, authenticated;
