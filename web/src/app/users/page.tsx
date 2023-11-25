'use client';

import { useMutation, useQuery } from "@apollo/client";
import { Box, Card, CardBody, CardHeader, Center, Heading } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import { DELETE_USER, GET_USERS } from "@gql/users";
import ISGPUser from "@sgp_types/SGPUser/ISGPUser";
import SGPUser from "@sgp_types/SGPUser/SGPUser";
import { createColumnHelper } from "@tanstack/react-table";
import { Fragment } from "react";

const columnHelper = createColumnHelper<ISGPUser>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name"
  }),
  columnHelper.accessor("role.name", {
    cell: (info) => info.getValue(),
    header: "Role"
  }),
  columnHelper.accessor("email", {
    cell: (info) => info.getValue(),
    header: "Email"
  }),
  columnHelper.accessor("phone_number", {
    cell: (info) => info.getValue(),
    header: "Phone number",
    /*meta: {
      isNumeric: true
    }*/
  })
];

const UsersPage = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS, {
    variables: {
      where: {}
    },
  })

  const [deleteUser, { data: delete_data, loading: delete_loading, error: delete_error }] = useMutation(DELETE_USER);

  const handleDelete = (user: SGPUser) => {
    deleteUser({
      variables: {
        id: user.id
      },
      onCompleted: refetch
    });
  }

  return (
    <Card 
      w={'100%'}
      h={'100vh'}
    >
      <CardHeader>
        <Heading>
          Utilisateurs
        </Heading>
      </CardHeader>
      <CardBody>
        <DataTable 
          handleEdit={data => console.log(data)} 
          handleDelete={data => handleDelete(data)} 
          columns={columns} 
          data={loading ? [] : data.users} 
        />
      </CardBody>
    </Card>
  );
}

export default UsersPage;