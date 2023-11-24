'use client';

import { useQuery } from "@apollo/client";
import { Box, Card, CardBody, CardHeader, Center, Heading } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import { GET_USERS } from "@gql/users";
import ISGPUser from "@sgp_types/SGPUser/ISGPUser";
import { createColumnHelper } from "@tanstack/react-table";
import { Fragment } from "react";

const columnHelper = createColumnHelper<ISGPUser>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name"
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

  return (
    <Fragment>
      <Center m={'auto'}>
        <Card>
          <CardHeader>
            <Heading>
              Utilisateurs
            </Heading>
          </CardHeader>
          <CardBody>
            <DataTable 
              handleEdit={data => console.log(data)} 
              handleDelete={data => console.log(data)} 
              columns={columns} 
              data={loading ? [] : data.users} 
            />
          </CardBody>
        </Card>
      </Center>
    </Fragment>
  );
}

export default UsersPage;