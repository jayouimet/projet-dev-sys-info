import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const GET_GAS_TYPES = gql`
  query getGasTypes ($where: gas_types_bool_exp!) {
    gas_types (where: $where) {
      id
      name
      price
    }
  }
`