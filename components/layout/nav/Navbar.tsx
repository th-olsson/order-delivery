import { Box, HStack } from '@chakra-ui/react';
import NavLink from './NavLink';
import Menu from './Menu';
import Cart from './Cart';

function Nav() {
  return (
    <Box bg="yellow.100"
      display="flex"
      justifyContent="space-between"
    >
      <HStack>
        <Menu />
        <NavLink href="/" text="Home" />
      </HStack>
      <Cart />
    </Box>
  );
}

export default Nav;
