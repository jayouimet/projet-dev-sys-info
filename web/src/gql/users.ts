import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

const getUsers = gql`
  query getUsers ($where: users_bool_exp!) {
    users (where: $where) {
      id
      email
      phone_number
      employee_number
      balance
      role {
        id
        name
      }
    }
  }
`