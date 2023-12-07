'use client';

import { useMutation, useQuery } from "@apollo/client";
import { Box, Button, Card, CardBody, CardHeader, Flex, Heading, Spacer } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import GasTanksUpsertModal from "@components/forms/gas_tanks/GasTanksUpsertModal";
import { DELETE_GAS_TANK, GET_GAS_TANKS } from "@gql/gas_tanks";
import ISGPGasTank from "@sgp_types/SGPGasTank/ISGPGasTank";
import { UpsertModalAction } from "@sgp_types/enums/UpsertModalAction";
import { createColumnHelper } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useState } from "react";

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
  columnHelper.accessor("max_volume", {
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
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [upsertAction, setUpsertAction] = useState<UpsertModalAction>(UpsertModalAction.INSERT);
  const [selectedGasTank, setSelectedGasTank] = useState<ISGPGasTank | undefined>(undefined);

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

  const onSubmitCallback = (gas_tank: ISGPGasTank) => {
    refetch();
    handleClose();
  }

  const handleEdit = (gas_tank: ISGPGasTank) => {
    setUpsertAction(UpsertModalAction.UPDATE);
    setSelectedGasTank(gas_tank);
    setIsModalOpen(true);
  }

  const handleAdd = () => {
    setUpsertAction(UpsertModalAction.INSERT);
    setSelectedGasTank(undefined);
    setIsModalOpen(true);
  }

  const handleClose = () => {
    setUpsertAction(UpsertModalAction.INSERT);
    setSelectedGasTank(undefined);
    setIsModalOpen(false);
  }

  return (
    <Card 
      w={'100%'}
      h={'100vh'}
    >
      <CardHeader>
        <Heading>
          Réservoirs d&apos;essence
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
          data={loading ? [] : data.gas_tanks} 
        />
      </CardBody>
      {isModalOpen && (
        <GasTanksUpsertModal
          action={upsertAction}
          isModalOpen={isModalOpen}
          gas_tank={selectedGasTank}
          onClose={handleClose}
          onSubmitCallback={onSubmitCallback}
        />
      )}
    </Card>
  );
}

export default GasTanksPage;