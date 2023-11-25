'use client';

import { useMutation, useQuery } from "@apollo/client";
import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import { DELETE_GAS_TANK, GET_GAS_TANKS } from "@gql/gas_tanks";
import ISGPGasTank from "@sgp_types/SGPGasTank/ISGPGasTank";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<ISGPGasTank>();

const columns = [
  columnHelper.accessor("name", {
    cell: (info) => info.getValue(),
    header: "Name"
  }),
  columnHelper.accessor("volume", {
    cell: (info) => info.getValue(),
    header: "Volume",
    meta: {
      isNumeric: true
    }
  }),
  // TODO : Add max volume
  columnHelper.accessor("volume", {
    cell: (info) => info.getValue(),
    header: "Maximum Volume",
    meta: {
      isNumeric: true
    }
  }),
  columnHelper.accessor("gas_type.name", {
    cell: (info) => info.getValue(),
    header: "Gas type"
  }),
];

const GasTanksPage = () => {
  const { data, loading, error, refetch } = useQuery(GET_GAS_TANKS, {
    variables: {
      where: {}
    },
  })

  const [deleteGasTank, { data: delete_data, loading: delete_loading, error: delete_error }] = useMutation(DELETE_GAS_TANK);

  const handleDelete = (gas_tank: ISGPGasTank) => {
    deleteGasTank({
      variables: {
        id: gas_tank.id
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
          Réservoirs d'essence
        </Heading>
      </CardHeader>
      <CardBody>
        <DataTable 
          handleEdit={data => console.log(data)} 
          handleDelete={data => handleDelete(data)} 
          columns={columns} 
          data={loading ? [] : data.gas_tanks} 
        />
      </CardBody>
    </Card>
  );
}

export default GasTanksPage;