'use client';

import { useQuery } from "@apollo/client";
import { Box, Button, Card, Center, Flex, Link, Stack } from "@chakra-ui/react";
import TransactionsUpsertModal from "@components/forms/transactions/TransactionsUpsertModal";
import { GET_GAS_PUMPS } from "@gql/gas_pumps";
import { GET_GAS_TANKS } from "@gql/gas_tanks";
import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import ISGPGasTank from "@sgp_types/SGPGasTank/ISGPGasTank";
import ISGPTransaction from "@sgp_types/SGPTransaction/ISGPTransaction";
import { UpsertModalAction } from "@sgp_types/enums/UpsertModalAction";
import { useSession } from "next-auth/react";
import { useState } from "react";

const DashboardPage = () => {
  const { data: session } = useSession()
  const [transaction, setTransaction] = useState<ISGPTransaction | undefined>();

  const VOLUME_BOX_HEIGHT = 400;

  const {
    data: gas_pumps_data,
    loading: gas_pumps_loading,
    error: gas_pumps_error,
    refetch: gas_pumps_refetch,
  } = useQuery(GET_GAS_PUMPS, {
    variables: {
      where: {}
    },
    onError: (e) => console.log(e)
  });

  const {
    data: gas_tanks_data,
    loading: gas_tanks_loading,
    error: gas_tanks_error,
    refetch: gas_tanks_refetch,
  } = useQuery(GET_GAS_TANKS, {
    variables: {
      where: {}
    },
    onError: (e) => console.log(e)
  });
  console.log(gas_tanks_data);
  return (
    <Box w={"100%"}>
      <Stack dir={"column"} align={"center"}>
        <Box my={16} fontSize={50}>
          SGP
        </Box>
        {(session?.user.role === 'admin' || session?.user.role === 'clerk') &&
          <Flex direction={'row'}>
            <Box flex={7}>
              <Flex px={4} gap={4} direction={'row'} flexWrap={'wrap'}>
                {!gas_pumps_loading &&
                  gas_pumps_data.gas_pumps.map((gas_pump: ISGPGasPump) => {
                    return (
                      <Card key={gas_pump.id} p={4} w={'48%'}>
                        <Stack w={'100%'} textAlign={'center'}>
                          <Box>
                            {gas_pump.name}
                          </Box>
                          <Box>
                            {"Quantité pompée : 18.0L"}
                          </Box>
                          <Button onClick={() => {
                            setTransaction({
                              volume: 1800,
                              unit_price: gas_pump.gas_tank?.gas_type?.price || 100,
                              total: 0,
                              subtotal: 0,
                              taxes: 0,
                              type: '',
                              data: {}
                            });
                          }}>
                            Créer la transaction
                          </Button>
                        </Stack>
                      </Card>
                    )
                  })
                }
              </Flex>
            </Box>
            <Box flex={3}>
              <Stack direction={'row'} pr={4}>
                {!gas_tanks_loading && gas_tanks_data?.gas_tanks &&
                  gas_tanks_data.gas_tanks.map((gas_tank: ISGPGasTank) => {
                    return (
                      <Stack key={gas_tank.id} justifyContent={'space-between'} w={'50%'}>
                        <Center>
                          <Box textAlign={'center'}>
                            {gas_tank.name}
                          </Box>
                        </Center>
                        <Box h={`${VOLUME_BOX_HEIGHT}px`} border={'2px solid white'}>
                          <Flex h={'100%'} direction={'column-reverse'}>
                            <Box h={`${VOLUME_BOX_HEIGHT / gas_tank.max_volume * gas_tank.volume}px`} backgroundColor={'orange'}></Box>
                          </Flex>
                        </Box>
                      </Stack>
                    )
                  })
                }
              </Stack>
            </Box>
          </Flex>
        }
      </Stack>
      <TransactionsUpsertModal 
        isModalOpen={transaction !== undefined}
        onSubmitCallback={() => setTransaction(undefined)}
        transaction={transaction}
        action={UpsertModalAction.INSERT}
        onClose={() => setTransaction(undefined)}
        />
    </Box>
  );
}

export default DashboardPage;