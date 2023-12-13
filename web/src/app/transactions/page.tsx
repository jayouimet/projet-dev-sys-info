'use client';

import { useMutation, useQuery } from "@apollo/client";
import { Button, Card, CardBody, CardHeader, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, Modal, ModalContent, ModalOverlay, SelectField } from "@chakra-ui/react";
import DataTable from "@components/DataTable";
import SelectOption from "@components/base/SelectOption";
import { DELETE_TRANSACTION, GET_TRANSACTIONS } from "@gql/transactions";
import ISGPTransaction from "@sgp_types/SGPTransaction/ISGPTransaction";
import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

const columnHelper = createColumnHelper<ISGPTransaction>();

const columns = [
  columnHelper.accessor("type", {
    cell: (info) => info.getValue(),
    header: "Type"
  }),
  columnHelper.accessor("volume", {
    cell: (info) => info.getValue(),
    header: "Volume",
    meta: {
      isNumeric: true
    }
  }),
  columnHelper.accessor("total", {
    cell: (info) => info.getValue() / 100,
    header: "Total",
    meta: {
      isNumeric: true
    }
  }),
];

const TransactionsPage = () => {
  const { data, loading, error, refetch } = useQuery(GET_TRANSACTIONS, {
    variables: {
      where: {}
    },
    fetchPolicy: 'no-cache'
  });
  const [selectedFilter, setSelectedFilter] = useState<{
    variable: string,
    value: string
  }>({ variable: "", value: "" });
  const [selectedSorter, setSelectedSorter] = useState<{
    variable: string,
    ascending: boolean
  }>({ variable: "", ascending: false });
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const [selectedTransaction, setSelectedTransaction] = useState<ISGPTransaction | undefined>();

  const [deleteTransaction, { data: delete_data, loading: delete_loading, error: delete_error }] = useMutation(DELETE_TRANSACTION);

  const handleDelete = (transaction: ISGPTransaction) => {
    deleteTransaction({
      variables: {
        id: transaction.id
      },
      onCompleted: refetch
    });
  }

  const handleOnSubmitRapport = () => {

  }

  console.log(data);

  return (
    <Flex
      w={'100%'}
      h={'95vh'}
      dir={'row'}
      my={5}
      gap={10}>
      <Card
        mx={4}
        w={'65%'}
        border={"2px solid white"}>
        <CardHeader>
          <Heading>
            Transactions
          </Heading>
        </CardHeader>
        <CardBody>
          <DataTable
            handleDisplay={data => setSelectedTransaction(data)}
            handleDelete={data => handleDelete(data)}
            columns={columns}
            data={loading ? [] : data.transactions}
          />
        </CardBody>
      </Card>
      <Card
        mx={4}
        w={'35%'}
        border={"2px solid white"}>
        <CardHeader textAlign={'center'}>
          <Heading>
            Creation d&apos;un rapport
          </Heading>
        </CardHeader>
        <CardBody my={20} w={'100%'}>
          <FormControl>
            <Flex dir='row'>
              <FormLabel>Filtre</FormLabel>
              <SelectField
                value={selectedFilter.variable}
                onChange={(e) => {
                  setSelectedFilter({
                    ...selectedFilter,
                    variable: e.target.value
                  })
                }}>
                <SelectOption value=""></SelectOption>
                {
                  ["Nom de la station", "Quantité pompé", "Type", "Date Payé"].map(item => {
                    return (
                      <SelectOption value={item} key={item}>{item}</SelectOption>
                    )
                  })
                }
              </SelectField>
              <Input
                w={'10vw'}
                h={'3vh'}
                placeholder={'Valeur du filtrage'}
                mx={6}
                value={selectedFilter.value}
                onChange={(e) => {
                  setSelectedFilter({
                    ...selectedFilter,
                    value: e.target.value
                  })
                }} />
            </Flex>
          </FormControl>
          <FormControl my={4}>
            <Flex dir='row'>
              <FormLabel>Triage</FormLabel>
              <SelectField
                value={selectedSorter.variable}
                onChange={(e) => {
                  setSelectedSorter({
                    ...selectedSorter,
                    variable: e.target.value
                  })
                }}>
                <SelectOption value=""></SelectOption>
                {
                  ["Nom de la station", "Quantité pompé", "Type", "Date Payé"].map(item => {
                    return (
                      <SelectOption value={item} key={item}>{item}</SelectOption>
                    )
                  })
                }
              </SelectField>
              <SelectField
                w={'10vw'}
                mx={6}
                value={selectedSorter.ascending ? 'asc' : 'desc'}
                onChange={(e) => {
                  setSelectedSorter({
                    ...selectedSorter,
                    ascending: e.target.value === "asc"
                  })
                }}>
                <SelectOption value={"asc"}>Remontant</SelectOption>
                <SelectOption value={"desc"}>Descendant</SelectOption>
              </SelectField>
            </Flex>
          </FormControl>
          <FormControl>
            <Flex dir='row'>
              <FormLabel>Groupage</FormLabel>
              <SelectField
                value={selectedGroup}
                onChange={(e) => {
                  setSelectedGroup(e.target.value)
                }}>
                <SelectOption value=""></SelectOption>
                {
                  ["Nom de la station", "Quantité pompé", "Type", "Date Payé"].map(item => {
                    return (
                      <SelectOption value={item} key={item}>{item}</SelectOption>
                    )
                  })
                }
              </SelectField>
            </Flex>
          </FormControl>
          <FormControl textAlign={'center'}>
            <Button
              my={20}
              w={'10vw'}
              mx={'auto'}
              onClick={handleOnSubmitRapport}>
              Soumettre
            </Button>
          </FormControl>
        </CardBody>
      </Card>
      <Modal
        isOpen={selectedTransaction !== undefined}
        onClose={() => setSelectedTransaction(undefined)}
        isCentered
        size={'4xl'}
      >
        {
          selectedTransaction &&
          <>
            <ModalOverlay />
            <ModalContent>
              <Card p={10} w={'100%'}>
                <CardHeader textAlign={'center'}>
                  <Heading>
                    Détails de transaction #1
                  </Heading>
                </CardHeader>
                <CardBody my={10}>
                  <Grid
                    mx={'auto'}
                    w={'25vw'}
                    templateColumns={'repeat(2, 1fr)'}
                    gap={4}
                    columnGap={16}
                  >
                    <GridItem>Utilisateur Superviseur</GridItem>
                    <GridItem>#2</GridItem>

                    <GridItem>Moment du pompage</GridItem>
                    <GridItem>{selectedTransaction?.created_at ? (new Date(selectedTransaction.created_at)).toLocaleString() : ''}</GridItem>

                    <GridItem>Payé</GridItem>
                    <GridItem>{selectedTransaction.data.status === 'approved' ? 'Oui':'Non'}</GridItem>

                    <GridItem>Volume</GridItem>
                    <GridItem>{selectedTransaction.volume} L</GridItem>

                    <GridItem>Sous-Total</GridItem>
                    <GridItem>{selectedTransaction.subtotal / 100} $</GridItem>

                    <GridItem>Taxes</GridItem>
                    <GridItem>{selectedTransaction.taxes / 100} $</GridItem>

                    <GridItem>Total</GridItem>
                    <GridItem>{selectedTransaction.total / 100} $</GridItem>
                  </Grid>
                </CardBody>
              </Card>
            </ModalContent>
          </>
        }
      </Modal>
    </Flex>
  );
}

export default TransactionsPage;