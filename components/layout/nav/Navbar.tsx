import { Box, Center, HStack, Image, Link as ChakraLink, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import NavLink from './NavLink';
import Menu from './Menu';
import Cart from './Cart';

function Nav() {
  return (
    <Box
      bgColor='gray.100'
      shadow='sm'
      display="flex"
      justifyContent="space-between"
      position='fixed'
      height="4rem"
      alignItems="center"
      w='100%'
      zIndex='100'
    >
      <HStack>
        <Menu />
      </HStack>
      <NavLink href="/" text="Blommis" />
      <Cart />
    </Box >
  );
}

export default Nav;
