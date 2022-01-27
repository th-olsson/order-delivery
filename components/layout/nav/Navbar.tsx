import { Box, HStack } from '@chakra-ui/react';
import NavLink from './NavLink';
import Menu from './Menu';
import Cart from './Cart';

function Nav() {
  return (
    <Box
      bgColor='orange.100'
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
      {/* TODO: Replace with a logo */}
      <NavLink href="/" text="Blommis" />
      <Cart />
    </Box >
  );
}

export default Nav;
