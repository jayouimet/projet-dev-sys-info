alter table "public"."gas_pumps" alter column "gas_station_id" drop not null;
alter table "public"."gas_pumps" add column "gas_station_id" uuid;
