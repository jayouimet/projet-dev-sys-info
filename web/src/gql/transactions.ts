import { gql } from "@apollo/client";

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     QUERIES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const GET_TRANSACTIONS = gql`
  query getTransactions ($where: transactions_bool_exp!) {
    transactions (where: $where) {
      id
      total
      type 
      data
      subtotal
      taxes 
      volume 
      unit_price
      created_at
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*--------------------------     INSERTIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const INSERT_TRANSACTION = gql`
  mutation ($data: transactions_insert_input!) {
    insert_transactions_one(object: $data) {
      id
      volume 
      unit_price 
      data 
      total 
      subtotal 
      taxes 
      type
      user_id
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*----------------------------     UPDATES    --------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const UPDATE_TRANSACTION_BY_PK = gql`
  mutation ($data: transactions_insert_input!, $pk_columns: gas_pumps_pk_columns_input!) {
    update_transactions_by_pk(pk_columns: $pk_columns, _set: $data) {
      id
      volume 
      unit_price 
      data 
      total 
      subtotal 
      taxes 
      type
      user_id
    }
  }
`

////////////////////////////////////////////////////////////////////////////////
/*---------------------------     DELETIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction ($id: uuid!) {
    delete_transactions_by_pk (id: $id) {
      id
    }
  }
`