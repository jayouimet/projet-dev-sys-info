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
/*---------------------------     DELETIONS    -------------------------------*/
////////////////////////////////////////////////////////////////////////////////

export const DELETE_TRANSACTION = gql`
  mutation deleteTransaction ($id: uuid!) {
    delete_transactions_by_pk (id: $id) {
      id
    }
  }
`