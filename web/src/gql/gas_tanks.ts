import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const GET_GAS_TANKS = gql`
  query getGasTanks ($where: gas_tanks_bool_exp!) {
    gas_tanks (where: $where) {
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