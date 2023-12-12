'use client'

import { useQuery } from "@apollo/client";
import { Card } from "@chakra-ui/card";
import { Box, Button, Center, Flex, Grid, GridItem, Stack, useInterval } from "@chakra-ui/react";
import { GET_GAS_PUMPS_USERS } from "@gql/gas_pumps";
import ISGPGasPump from "@sgp_types/SGPGasPump/ISGPGasPump";
import { useEffect, useState } from "react";

function PumpPage() {
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPumping, setIsPumping] = useState<boolean>(false);
  const [wantedCost, setWantedCost] = useState<number>(0);
  const [cost, setCost] = useState<number>(0);
  const [wantedVolume, setWantedVolume] = useState<number>(0);
  const [selectedPump, setSelectedPump] = useState<ISGPGasPump | undefined>();
  const [volumePumped, setVolumePumped] = useState<number>(0);
  const [uiLocked, setUiLocked] = useState<boolean>(false);

  const resetPump = () => {
    setWantedCost(0);
    setVolumePumped(0);
    setWantedVolume(0);
    setIsPumping(false);
    setIsStarted(false);
    setUiLocked(false);
    setCost(0);
  }

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
    const v = wantedCost / selectedPump?.gas_tank?.gas_type?.price * 100;
    const volumeString = v.toFixed(2);
    setWantedVolume(Number(volumeString));
  }, [wantedCost, selectedPump])

  const updateVolume = () => {
    const _ = volumePumped + (Math.random() * (1.8 - 1.2) + 1.2);
    setVolumePumped(selectedPump?.is_smart && wantedVolume > 0 ? Math.min(_, wantedVolume) : _);
    if (!selectedPump?.is_smart || wantedCost === 0) {
      if (selectedPump?.gas_tank?.gas_type?.price) {
        setCost(_ * selectedPump?.gas_tank?.gas_type?.price / 100);
      }
    }
  }

  useInterval(updateVolume, isPumping && isStarted ? 500 : null);

  return (
    <Card w={'100vw'} alignItems={'center'} h={'100vh'}>
      <Flex w={'100%'} h={'100%'} direction={'row'} pt={10}>
        <Box flex={1}></Box>
        <Stack alignItems={'center'} flex={1}>
          <Flex m={5} mt={10} gap={2}>
            {
              data?.gas_pumps && data?.gas_pumps.length > 0 && (
                data.gas_pumps.map((pump: ISGPGasPump) => {
                  return (
                    <Button
                      key={pump.id}
                      onClick={(e) => {
                        resetPump();
                        setUiLocked(false);
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
          <Box 
            border={'1px solid #01E87F'} 
            borderRadius={'4px'}
            w={'25vw'} 
            minWidth={'470px'}
            px={12}
            py={6}
          >
            <Grid
              w={'100%'}
              templateColumns={'repeat(2, 1fr)'}
              gap={4}
              fontSize={'2.5em'}
            >
              <GridItem>Cout:</GridItem>
              <GridItem textAlign={'right'}> {wantedCost > 0 ? wantedCost.toFixed(2) : cost.toFixed(2)} $</GridItem>
              <GridItem>Volume:</GridItem>
              <GridItem textAlign={'right'}> {volumePumped.toFixed(2)} L</GridItem>
            </Grid>
          </Box>
          {
            selectedPump?.is_smart &&
            <Grid
              textAlign={'center'}
              w={'25vw'}
              minWidth={'470px'}
              templateColumns={'repeat(3, 1fr)'}
              fontSize={'3em'}
              borderColor={'black'}
            >
              {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
                  return (
                    <GridItem key={item}>
                      <Button
                        w={'95%'}
                        h={'90%'}
                        userSelect={'none'}
                        isDisabled={uiLocked}
                        cursor={'pointer'}
                        onClick={(e) => {
                          setWantedCost(Number(`${wantedCost.toString()}${item}`))
                        }}
                      >
                        {item}
                      </Button>
                    </GridItem>
                  )
                })
              }
              <GridItem>
                <Button
                  w={'95%'}
                  h={'90%'}
                  userSelect={'none'}
                  isDisabled={uiLocked}
                  cursor={'pointer'}
                  onClick={(e) => {
                    resetPump();
                  }}
                >
                  DEL
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  w={'95%'}
                  h={'90%'}
                  userSelect={'none'}
                  isDisabled={uiLocked}
                  cursor={'pointer'}
                  onClick={(e) => {
                    setWantedCost(Number(`${wantedCost.toString()}0`))
                  }}
                >
                  0
                </Button>
              </GridItem>
              <GridItem>
                <Button
                  w={'95%'}
                  h={'90%'}
                  userSelect={'none'}
                  isDisabled={uiLocked}
                  cursor={'pointer'}
                  onClick={(e) => {
                    if (wantedCost > 0) {
                      setUiLocked(true);
                    }
                  }}
                >
                  &#8594;
                </Button>
              </GridItem>
            </Grid>
          }
        </Stack>
        <Box w={'100%'} h={'100%'} flex={1}>
          <Center h={'100%'}>
            <Stack gap={8} h={'100%'} justifyContent={'center'}>
              <Button 
                variant={'green'} 
                fontSize={'1.5em'} 
                w={'150px'} 
                h={'150px'} 
                borderRadius={'90'}
                isDisabled={ isStarted }
                onClick={() => { 
                  setIsStarted(true); 
                  setUiLocked(true);
                }}
              >START</Button>
              <Button 
                variant={'blue'} 
                fontSize={'1.5em'} 
                w={'150px'} 
                h={'150px'} 
                borderRadius={'90'}
                isDisabled={ !isStarted }
                onMouseUp={() => { setIsPumping(false); }}
                onMouseLeave={() => { setIsPumping(false); }}
                onMouseDown={() => { 
                  updateVolume();
                  setIsPumping(true); 
                }}
              >PUMP</Button>
              <Button 
                variant={'red'} 
                fontSize={'1.5em'} 
                w={'150px'} 
                h={'150px'} 
                borderRadius={'90'}
                isDisabled={ !isStarted }
                onClick={() => { 
                  resetPump();
                  setIsStarted(false); 
                }}
              >STOP</Button>
            </Stack>
          </Center>
        </Box>
      </Flex>
    </Card>
  )
}

export default PumpPage;