import { Box, HStack, IconButton } from '@chakra-ui/react';
import NavLink from './NavLink';
import { FaShoppingBasket } from 'react-icons/fa'
import Menu from './Menu';

function Nav() {
  return (
    <Box bg="yellow.100"
      display="flex"
      justifyContent="space-between"
      alighItems="center"
    >
      <HStack>
        <Menu />
        <NavLink href="/" text="Home" />
      </HStack>

      <IconButton aria-label="open cart" icon={<FaShoppingBasket />} />
    </Box>
  );
}

export default Nav;
