import { Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './nav/Navbar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box width="100%"
    // maxW="sm" // Mobile view
    >
      <Navbar />

      {children}
    </Box>
  );
}

export default Layout;