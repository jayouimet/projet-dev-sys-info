'use client'

import { useQuery } from "@apollo/client";
import { Card } from "@chakra-ui/card";
import { Box, Button, Divider, Flex, Grid, GridItem } from "@chakra-ui/react";
import { GET_GAS_PUMPS_USERS } from "@gql/gas_pumps";
import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import { useEffect, useState } from "react";

function PumpPage() {
  const [wantedCost, setWantedCost] = useState<number>(0);
  const [wantedVolume, setWantedVolume] = useState<number>(0);
  const [selectedPump, setSelectedPump] = useState<ISGPGasPump | undefined>();

  const { data } = useQuery(GET_GAS_PUMPS_USERS, {
    variables: {
      where: {}
    },
    onCompleted: (data) => {
      console.log(data);
      setSelectedPump(data.gas_pumps[0]);
    },
    onError: (e) => {
      console.log(e);
    }
  })

  if (wantedCost > 1000) {
    setWantedCost(1000);
  }

  useEffect(() => {
    if (!selectedPump || !selectedPump?.gas_tank?.gas_type?.price) return;
    console.log(wantedCost, selectedPump?.gas_tank?.gas_type?.price)
    const v = wantedCost / selectedPump?.gas_tank?.gas_type?.price * 100;
    const volumeString = v.toFixed(2);
    setWantedVolume(Number(volumeString));
  }, [wantedCost, selectedPump])

  return (
    <Card w={'100%'} alignItems={'center'} h={'100vh'}>
      <Flex m={5} mt={10} gap={2}>
        {
          data?.gas_pumps && data?.gas_pumps.length > 0 && (
            data.gas_pumps.map((pump: ISGPGasPump) => {
              return (
                <Button
                  key={pump.id}
                  onClick={(e) => {
                    setSelectedPump(pump);
                  }}
                  borderColor={(pump.id === selectedPump?.id ? '' : 'rgba(0,0,0,0)')}
                >
                  {pump.name}<br />{pump.gas_tank?.gas_type?.name}
                </Button>
              )
            })
          )
        }
      </Flex>
      <Box border={'1px solid black'} mt={10} p={10} mx={20} w={'35vw'}>
        <Grid
          mx={'auto'}
          w={'25vw'}
          templateColumns={'repeat(2, 1fr)'}
          gap={4}
          fontSize={50}
        >
          <GridItem>Cout:</GridItem>
          <GridItem textAlign={'right'}> {wantedCost} $</GridItem>
          <GridItem>Volume:</GridItem>
          <GridItem textAlign={'right'}> {wantedVolume} L</GridItem>
        </Grid>
      </Box>
      {
        selectedPump?.is_smart &&
        <Box w={'35vw'} mt={5}>
          <Grid
            textAlign={'center'}
            mx={'auto'}
            w={'25vw'}
            templateColumns={'repeat(3, 1fr)'}
            fontSize={50}
            borderColor={'black'}
          >
            {
              [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
                return (
                  <GridItem>
                    <Box
                      userSelect={'none'}
                      cursor={'pointer'}
                      _hover={{
                        border: "1px solid green"
                      }}
                      onClick={(e) => {
                        setWantedCost(Number(`${wantedCost.toString()}${item}`))
                      }}
                    >
                      {item}
                    </Box>
                  </GridItem>
                )
              })
            }
            <GridItem>
              <Box
                userSelect={'none'}
                cursor={'pointer'}
                _hover={{
                  border: "1px solid green"
                }}
                onClick={(e) => {
                  setWantedCost(0)
                }}
              >
                DEL
              </Box>
            </GridItem>
            <GridItem>
              <Box
                userSelect={'none'}
                cursor={'pointer'}
                _hover={{
                  border: "1px solid green"
                }}
                onClick={(e) => {
                  setWantedCost(Number(`${wantedCost.toString()}0`))
                }}
              >
                0
              </Box>
            </GridItem>
            <GridItem>
              <Box
                userSelect={'none'}
                cursor={'pointer'}
                _hover={{
                  border: "1px solid green"
                }}
                onClick={(e) => {
                  setWantedCost(0)
                }}
              >
                &#8594;
              </Box>
            </GridItem>
          </Grid>
        </Box>
      }
    </Card>
  )
}

export default PumpPage;