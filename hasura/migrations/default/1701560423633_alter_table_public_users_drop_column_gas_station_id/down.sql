alter table "public"."users" alter column "gas_station_id" drop not null;
alter table "public"."users" add column "gas_station_id" uuid;
