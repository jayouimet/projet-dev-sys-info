import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const GET_USERS = gql`
  query getUsers ($where: users_bool_exp!) {
    users (
      where: $where,
      order_by: {
        name: asc
      }
    ) {
      id
      name
      email
      phone_number
      employee_number
      balance
      role_id
      role {
        id
        name
      }
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*--------------------------     INSERTIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const INSERT_USER = gql`
  mutation insertUser ($data: users_insert_input!) {
    insert_users_one(object: $data) {
      id
      name
      email
      balance
      phone_number
      employee_number
      role_id
      role {
        id
        name
      }
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     UPDATES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_USER_BY_PK = gql`
  mutation updateUserByPk($data: users_set_input!, $pk_columns: users_pk_columns_input!) {
    update_users_by_pk(pk_columns: $pk_columns, _set: $data) {
      id
      name
      email
      balance
      phone_number
      employee_number
      role_id
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
      returning {
        id
      }
    }
  }
`