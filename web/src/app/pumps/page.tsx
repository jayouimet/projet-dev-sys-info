'use client';

import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Spacer } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import GasPumpsUpsertModal from "@components/forms/gas_pump/GasPumpsUpsertModal";
import { DELETE_GAS_PUMP, GET_GAS_PUMPS } from "@gql/gas_pumps";
import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import { UpsertModalAction } from "@sgp_types/enums/UpsertModalAction";
import { createColumnHelper } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useState } from "react";

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
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [upsertAction, setUpsertAction] = useState<UpsertModalAction>(UpsertModalAction.INSERT);
  const [selectedGasPump, setSelectedGasPump] = useState<ISGPGasPump | undefined>(undefined);

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

  const onSubmitCallback = (gas_pump: ISGPGasPump) => {
    refetch();
    handleClose();
  }

  const handleEdit = (gas_pump: ISGPGasPump) => {
    setUpsertAction(UpsertModalAction.UPDATE);
    setSelectedGasPump(gas_pump);
    setIsModalOpen(true);
  }

  const handleAdd = () => {
    setUpsertAction(UpsertModalAction.INSERT);
    setSelectedGasPump(undefined);
    setIsModalOpen(true);
  }

  const handleClose = () => {
    setUpsertAction(UpsertModalAction.INSERT);
    setSelectedGasPump(undefined);
    setIsModalOpen(false);
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
        <Flex>
          <Spacer flex={3}></Spacer>
          <Box flex={1}>
            <Button onClick={handleAdd}>Add</Button>
          </Box>
        </Flex>
        <DataTable 
          isDisabledEdit={() => { return session?.user.role !== 'admin' }}
          isDisabledDelete={() => { return session?.user.role !== 'admin' }}
          handleEdit={data => handleEdit(data)} 
          handleDelete={data => handleDelete(data)} 
          columns={columns} 
          data={loading ? [] : data.gas_pumps} 
        />
      </CardBody>
      {isModalOpen && (
        <GasPumpsUpsertModal
          action={upsertAction}
          isModalOpen={isModalOpen}
          gas_pump={selectedGasPump}
          onClose={handleClose}
          onSubmitCallback={onSubmitCallback}
        />
      )}
    </Card>
  );
}

export default GasPumpsPage;