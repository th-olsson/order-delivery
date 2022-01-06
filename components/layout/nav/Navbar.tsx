import { Box } from '@chakra-ui/react';
import NavLink from './NavLink';

function Nav() {
  return (
    <Box bg="yellow.100">
      <NavLink href="/" text="Home" />
    </Box>
  );
}

export default Nav;
