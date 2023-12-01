'use client'

import { Card } from "@chakra-ui/card";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";

function PumpPage() {
  const [wantedVolume, setWantedVolume] = useState<number>(0);

  if (wantedVolume > 1000) {
    setWantedVolume(1000);
  }

  return (
    <Card w={'100%'} alignItems={'center'} h={'100vh'}>
      <Box border={'1px solid black'} p={10} mx={20} mt={20} w={'35vw'}>
        <Grid
          mx={'auto'}
          w={'25vw'}
          templateColumns={'repeat(2, 1fr)'}
          gap={4}
          fontSize={50}
        >
          <GridItem>Volume:</GridItem>
          <GridItem textAlign={'right'}>{wantedVolume} L</GridItem>
          <GridItem>Cout:</GridItem>
          <GridItem textAlign={'right'}>0.00 $</GridItem>
        </Grid>
      </Box>
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
                      setWantedVolume(Number(`${wantedVolume.toString()}${item}`))
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
                setWantedVolume(0)
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
                setWantedVolume(Number(`${wantedVolume.toString()}0`))
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
                setWantedVolume(0)
              }}
            >
              &#8594;
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Card>
  )
}

export default PumpPage;