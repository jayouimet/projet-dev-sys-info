'use client';

import { Box, Button, Link, Stack } from "@chakra-ui/react";

const pages = [
  { label: "Gestion d'utilisateur", url: "/users" },
  { label: "Gestion des pompes", url: "/pumps" },
  { label: "Gestion des réservoirs", url: "/tanks" },
  { label: "Gestion des transactions", url: "/transactions" },
]

const DashboardPage = () => {
  return (
    <Box w={"100%"}>
      <Stack dir={"column"} gap={10} align={"center"}>
        <Box my={40} fontSize={50}>
          SGP
        </Box>
        <Stack dir={"column"} gap={5}>
          {
            pages.map(page => {
              return (
                <Link href={page.url} key={page.label}>
                  <Button w={"15vw"}> {page.label}</Button>
                </Link>
              )
            })
          }
        </Stack>
      </Stack>
    </Box>
  );
}

export default DashboardPage;