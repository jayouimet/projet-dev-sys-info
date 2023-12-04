import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const GET_GAS_PUMPS = gql`
  query getGasPumps ($where: gas_pumps_bool_exp!) {
    gas_pumps (
      where: $where,
      order_by: {
        name: asc
      }
    ) {
      id
      name
      gas_tank_id
      is_smart
      gas_tank {
        id
        name
        volume
        gas_type {
          id
          name
          price
        }
      }
    }
  }
`
export const GET_GAS_PUMPS_USERS = gql`
  query ($where: gas_pumps_bool_exp!) {
    gas_pumps (
      where: $where,
      order_by: {
        name: asc
      }
    ) {
      id
      name
      is_smart
      gas_tank {
        gas_type {
          name
          price
        }
      }
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*--------------------------     INSERTIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const INSERT_GAS_PUMP = gql`
  mutation insertGasPump ($data: gas_pumps_insert_input!) {
    insert_gas_pumps_one(object: $data) {
      id
      name
      gas_tank_id
      gas_tank {
        id
        name
        volume
        gas_type {
          id
          name
          price
        }
      }
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     UPDATES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_GAS_PUMP_BY_PK = gql`
  mutation updateGasPumpByPk($data: gas_pumps_set_input!, $pk_columns: gas_pumps_pk_columns_input!) {
    update_gas_pumps_by_pk(pk_columns: $pk_columns, _set: $data) {
      id
      name
      gas_tank_id
      gas_tank {
        id
        name
        volume
        gas_type {
          id
          name
          price
        }
      }
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*---------------------------     DELETIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const DELETE_GAS_PUMP = gql`
  mutation deleteGasPump ($id: uuid!) {
    delete_gas_pumps_by_pk (id: $id) {
      id
    }
  }
`