alter table "public"."transactions" alter column "gas_station_id" drop not null;
alter table "public"."transactions" add column "gas_station_id" uuid;
