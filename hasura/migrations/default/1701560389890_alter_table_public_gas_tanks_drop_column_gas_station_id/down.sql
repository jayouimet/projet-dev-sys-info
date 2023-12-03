alter table "public"."gas_tanks" alter column "gas_station_id" drop not null;
alter table "public"."gas_tanks" add column "gas_station_id" uuid;
