import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const GET_USERS = gql`
  query getUsers ($where: users_bool_exp!) {
    users (where: $where) {
      id
      name
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

////////////////////////////////////////////////////////////////////////////////
/*---------------------------     DELETIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const DELETE_USER = gql`
  mutation deleteUser ($id: uuid!) {
    delete_users_by_pk (id: $id) {
      id
    }
  }
`