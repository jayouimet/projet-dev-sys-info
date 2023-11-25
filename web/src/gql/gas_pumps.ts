import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const GET_GAS_PUMPS = gql`
  query getGasPumps ($where: gas_pumps_bool_exp!) {
    gas_pumps (where: $where) {
      id
      name
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