import { Box } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './nav/Navbar';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <Box width="100%" bgColor='whitesmoke'>
      <Navbar />
      {children}
    </Box>
  );
}

export default Layout;