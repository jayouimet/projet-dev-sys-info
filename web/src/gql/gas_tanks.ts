import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const GET_GAS_TANKS = gql`
  query getGasTanks ($where: gas_tanks_bool_exp!) {
    gas_tanks (
      where: $where,
      order_by: {
        name: asc
      }
    ) {
      id
      name
      volume
      max_volume
      gas_type_id
      gas_type {
        id
        name
        price
      }
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*--------------------------     INSERTIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const INSERT_GAS_TANK = gql`
  mutation insertGasTank ($data: gas_tanks_insert_input!) {
    insert_gas_tanks_one(object: $data) {
      id
      name
      volume
      max_volume
      gas_type {
        id
        name
        price
      }
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     UPDATES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_GAS_TANK_BY_PK = gql`
  mutation updateGasTankByPk($data: gas_tanks_set_input!, $pk_columns: gas_tanks_pk_columns_input!) {
    update_gas_tanks_by_pk(pk_columns: $pk_columns, _set: $data) {
      id
      name
      volume
      max_volume
      gas_type {
        id
        name
        price
      }
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*---------------------------     DELETIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const DELETE_GAS_TANK = gql`
  mutation deleteGasTank ($id: uuid!) {
    delete_gas_tanks_by_pk (id: $id) {
      id
    }
  }
`