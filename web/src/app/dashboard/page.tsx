'use client';

import { useQuery } from "@apollo/client";
import { Box, Button, Card, Center, Flex, Link, Stack } from "@chakra-ui/react";
import { GET_GAS_PUMPS } from "@gql/gas_pumps";
import { GET_GAS_TANKS } from "@gql/gas_tanks";
import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import ISGPGasTank from "@sgp_types/SGPGasTank/ISGPGasTank";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession()

  const VOLUME_BOX_HEIGHT = 400;

  const { 
    data: gas_pumps_data, 
    loading: gas_pumps_loading,
    error: gas_pumps_error,
    refetch: gas_pumps_refetch,
  } = useQuery(GET_GAS_PUMPS, {
    variables: {
      where: {}
    }
  });

  const { 
    data: gas_tanks_data, 
    loading: gas_tanks_loading,
    error: gas_tanks_error,
    refetch: gas_tanks_refetch,
  } = useQuery(GET_GAS_TANKS, {
    variables: {
      where: {}
    }
  });

  return (
    <Box w={"100%"}>
      <Stack dir={"column"} align={"center"}>
        <Box my={16} fontSize={50}>
          SGP
        </Box>
        { (session?.user.role === 'admin' || session?.user.role === 'clerk') && 
          <Flex direction={'row'}>
            <Box flex={7}>
              <Flex px={4} gap={4} direction={'row'} flexWrap={'wrap'}>
                { !gas_pumps_loading && 
                  gas_pumps_data.gas_pumps.map((gas_pump: ISGPGasPump) => {
                    return (
                      <Card p={4} w={'48%'}>
                        <Stack w={'100%'} textAlign={'center'}>
                          <Box>
                            {gas_pump.name}
                          </Box>
                          <Box>
                            {"Quantité pompée : 18.0L"}
                          </Box>
                          <Button>
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
                { !gas_tanks_loading && 
                  gas_tanks_data.gas_tanks.map((gas_tank: ISGPGasTank) => {
                    return (
                      <Stack justifyContent={'space-between'} w={'50%'}>
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
    </Box>
  );
}

export default DashboardPage;