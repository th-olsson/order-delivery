import { Box, HStack, IconButton } from '@chakra-ui/react';
import NavLink from './NavLink';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaShoppingBasket } from 'react-icons/fa'

function Nav() {
  return (
    <Box bg="yellow.100"
      display="flex"
      justifyContent="space-between"
      alighItems="center"
    >
      <HStack>
        <IconButton aria-label="open menu" icon={<AiOutlineMenu />} />
        <NavLink href="/" text="Home" />
      </HStack>

      <IconButton aria-label="open cart" icon={<FaShoppingBasket />} />
    </Box>
  );
}

export default Nav;
