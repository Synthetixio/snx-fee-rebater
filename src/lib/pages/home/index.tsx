import { Flex } from '@chakra-ui/react';

import DataTable from '~/lib/components/DataTable';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <DataTable />
    </Flex>
  );
};

export default Home;
