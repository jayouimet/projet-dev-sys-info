'use client';

import { Box, Button, Link, Stack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const DashboardPage = () => {
  const { data: session } = useSession()

  const pages = [
    { show: () => { return (
      session?.user.role === 'admin' ||
      session?.user.role === 'clerk'
    )}, label: "Gestion d'utilisateur", url: "/users" },
    { show: () => { return (
      session?.user.role === 'admin' ||
      session?.user.role === 'clerk'
    )}, label: "Gestion des pompes", url: "/pumps" },
    { show: () => { return (
      session?.user.role === 'admin' ||
      session?.user.role === 'clerk'
    )}, label: "Gestion des réservoirs", url: "/tanks" },
    { show: () => { return (
      session?.user.role === 'admin' ||
      session?.user.role === 'clerk'
    )}, label: "Gestion des transactions", url: "/transactions" },
  ]
  return (
    <Box w={"100%"}>
      <Stack dir={"column"} gap={10} align={"center"}>
        <Box my={40} fontSize={50}>
          SGP
        </Box>
        <Stack dir={"column"} gap={5}>
          {
            pages.map(page => {
              if (page.show === undefined || page.show()) {
                return (
                  <Link href={page.url} key={page.label}>
                    <Button w={"15vw"}> {page.label}</Button>
                  </Link>
                )
              }
            })
          }
        </Stack>
      </Stack>
    </Box>
  );
}

export default DashboardPage;