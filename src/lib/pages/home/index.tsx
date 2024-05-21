'use client';

import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';

import { DataTable } from '~/lib/components/DataTable';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <Flex w="100%" gap={8}>
        <InputGroup bg="black">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input type="tel" placeholder="Filter by wallet address" />
        </InputGroup>

        <Box ml="auto" minWidth="240px">
          <Select bg="black">
            <option selected value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Box>
      </Flex>
      <DataTable data={[]} columns={[]} />
    </Flex>
  );
};

export default Home;
