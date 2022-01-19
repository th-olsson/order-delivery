import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './nav/Navbar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box
      maxWidth="360px" mx="auto"
    >
      <Navbar />

      <Box minH="100vh">{children}</Box>
    </Box>
  );
}

export default Layout;