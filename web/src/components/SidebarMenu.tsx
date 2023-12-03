"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, BoxProps, Button, Collapse, Flex, Icon, IconButton, Spacer, Stack, useDisclosure } from "@chakra-ui/react";
import { FiLogOut, FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "@chakra-ui/next-js";
import { signOut, useSession } from "next-auth/react";

interface SidebarMenuProps extends BoxProps {
  children: React.ReactNode;
}

interface LinkItemProps {
  show?: () => boolean;
  text: string;
  href: string;
}

const SidebarMenu = ({ children, ...rest }: SidebarMenuProps) => {
  const { data: session } = useSession();

  const links: Array<LinkItemProps> = [
    {
      text: "Accueil",
      href: "/dashboard"
    },
    {
      show: () => { return (
        session?.user.role === 'admin' ||
        session?.user.role === 'clerk'
      )},
      text: "Utilisateurs",
      href: "/users"
    },
    {
      show: () => { return (
        session?.user.role === 'admin' ||
        session?.user.role === 'clerk'
      )},
      text: "Transactions",
      href: "/transactions"
    },
    {
      show: () => { return (
        session?.user.role === 'admin' ||
        session?.user.role === 'clerk'
      )},
      text: "Pompes",
      href: "/pumps"
    },
    {
      show: () => { return (
        session?.user.role === 'admin' ||
        session?.user.role === 'clerk'
      )},
      text: "Réservoirs",
      href: "/tanks"
    }
  ]
  
  const { getDisclosureProps, isOpen, onToggle } = useDisclosure();
  const [hidden, setHidden] = useState(!isOpen);

  return (
    <Flex minH="100vh" {...rest}>
      <Box 
        pos="fixed" 
        h="full" 
        display={'block'}
        zIndex="999"
      >
        <Flex
          transition="3s ease"
          bg={'gray.600'}
          borderRightRadius="2px"
          align="center"
          direction={'column'}
          justify="space-between"
          w={'fit-content'}
          h="full"
          p={2}
          zIndex="999"
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
              animate={{ width: isOpen ? 200 : 0 }}
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              }}
            >
              <Stack mx={2}>
                {links.map((link, index) => {
                  if (link.show === undefined || link.show()) {
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
                  }
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
      <Box w={14}/>
      {children}
    </Flex>
  );
}

export default SidebarMenu;