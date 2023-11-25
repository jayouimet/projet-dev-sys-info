'use client';

import { useMutation, useQuery } from "@apollo/client";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import { DELETE_GAS_PUMP, GET_GAS_PUMPS } from "@gql/gas_pumps";
import { DELETE_USER, GET_USERS } from "@gql/users";
import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import SGPUser from "@sgp_types/SGPUser/SGPUser";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<ISGPGasPump>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name"
  }),
  columnHelper.accessor("gas_tank.gas_type.name", {
    cell: (info) => info.getValue(),
    header: "Gas Type"
  }),
  columnHelper.accessor("gas_tank.gas_type.price", {
    cell: (info) => (info.getValue() / 100).toFixed(2),
    header: "Price",
    meta: {
      isNumeric: true
    }
  }),
  columnHelper.accessor("gas_tank.volume", {
    cell: (info) => info.getValue(),
    header: "Volume",
    meta: {
      isNumeric: true
    }
  }),
];

const GasPumpsPage = () => {
  const { data, loading, error, refetch } = useQuery(GET_GAS_PUMPS, {
    variables: {
      where: {}
    },
  })

  const [deleteGasPump, { data: delete_data, loading: delete_loading, error: delete_error }] = useMutation(DELETE_GAS_PUMP);

  const handleDelete = (gas_pump: ISGPGasPump) => {
    deleteGasPump({
      variables: {
        id: gas_pump.id
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
          Pompes à essence
        </Heading>
      </CardHeader>
      <CardBody>
        <DataTable 
          handleEdit={data => console.log(data)} 
          handleDelete={data => handleDelete(data)} 
          columns={columns} 
          data={loading ? [] : data.gas_pumps} 
        />
      </CardBody>
    </Card>
  );
}

export default GasPumpsPage;