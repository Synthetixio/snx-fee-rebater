'use client';

import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Box
        zIndex={-1}
        pointerEvents="none"
        position="fixed"
        width="100%"
        height="100%"
        top={0}
        left={0}
        sx={{
          'background-image': "url('/bg.svg') !important;",
          'background-size': 'cover',
        }}
        opacity="0.066"
      />
      <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
        <Box my={24} px={4}>
          <Box mb={12}>
            <Header />
          </Box>
          <Box as="main">{children}</Box>
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default Layout;
