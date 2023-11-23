"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Button, Collapse, Flex, Icon, IconButton, Stack, useDisclosure } from "@chakra-ui/react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@chakra-ui/next-js";
import { signOut } from "next-auth/react";

interface SidebarMenuProps extends BoxProps {
  children: React.ReactNode;
}

interface LinkItemProps {
  text: string;
  href: string;
}

const links: Array<LinkItemProps> = [
  {
    text: "Utilisateurs",
    href: "/users"
  },
  {
    text: "Transactions",
    href: "/dashboard"
  },
  {
    text: "Pompes",
    href: "/dashboard"
  },
  {
    text: "Réservoirs",
    href: "/dashboard"
  }
]

const SidebarMenu = ({ children, ...rest }: SidebarMenuProps) => {
  const { getDisclosureProps, isOpen, onToggle } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);

  return (
    <Box minH="100vh" {...rest}>
      <Box pos="fixed" h="full" {...rest}>
        <Flex
          transition="3s ease"
          bg={'whiteAlpha.400'}
          borderRightRadius="2px"
          align="center"
          direction={'column'}
          justify="space-between"
          w={'fit-content'}
          h="full"
          p={2}
        >
          <Stack>
            <IconButton
              alignSelf={'end'}
              onClick={onToggle}
              aria-label="Hamburger Menu"
              icon={isOpen ? <CloseIcon/> : <HamburgerIcon/>}
              variant={"ghost"}
              width={18}
            />
            <motion.div
              {...getDisclosureProps()}
              hidden={hidden}
              initial={false}
              onAnimationStart={() => setHidden(false)}
              onAnimationComplete={() => setHidden(!isOpen)}
              animate={{ width: isOpen ? 150 : 0 }}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
            >
              <Stack mx={2}>
                {links.map((link, index) => {
                  return (
                    <Button
                      key={`menu-link-${index}`}
                      variant={'ghost'}
                      justifyContent={'left'}
                      as={Link}
                      href={link.href}
                    >
                      {link.text}
                    </Button>
                  );
                })}
              </Stack>
            </motion.div>
          </Stack>

          <Box alignSelf={'flex-end'}>
            <IconButton
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.stopPropagation();
                signOut();
              }}
              // onClick={onToggle}
              aria-label="Logout"
              icon={
                <Icon 
                  as={FiLogOut}
                  fontSize="32"
                  // mt={'1px'}
                  _groupHover={{
                    color: 'white',
                  }}
                />
              }
              variant={"ghost"}
              width={18}
            />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default SidebarMenu;