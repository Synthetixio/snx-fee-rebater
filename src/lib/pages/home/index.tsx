'use client';

import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Heading,
  ListItem,
  Link,
  UnorderedList,
  CircularProgress,
  CircularProgressLabel,
} from '@chakra-ui/react';
import { addWeeks, startOfWeek, endOfWeek, format, isBefore } from 'date-fns';
import { useEffect } from 'react';

import { DataTable } from '~/lib/components/DataTable';

// Helper function to format dates
const formatDate = (date: Date): string =>
  format(date, "yyyy-MM-dd'T'HH:mm:ssXXX");

// Function to generate weeks array
const generateWeeks = (startDate: Date, numberOfWeeks: number) => {
  const weeksArray = [];
  for (let i = 0; i < numberOfWeeks; i++) {
    const startOfWeekDate = startOfWeek(addWeeks(startDate, i), {
      weekStartsOn: 3,
    }); // startOfWeek sets week start to Wednesday
    const endOfWeekDate = endOfWeek(addWeeks(startDate, i), {
      weekStartsOn: 3,
    }); // endOfWeek sets week end to Tuesday
    weeksArray.push({
      start: formatDate(startOfWeekDate),
      end: formatDate(endOfWeekDate),
    });
  }
  return weeksArray;
};

// Initial start date
const initialStartDate = new Date(Date.UTC(2024, 4, 22, 20, 0, 0));

// Generate 100 weeks
const weeks = generateWeeks(initialStartDate, 100);

// Filter out weeks that start later than the current time
const now = new Date();
const filteredWeeks = weeks.filter((week) => {
  const startOfWeekDate = new Date(week.start);
  return isBefore(startOfWeekDate, now);
});

const Home = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/data');
      const data = await response.json();
      console.log('DATA', data);
    };

    fetchUsers();
  }, []);
  return (
    <Flex direction="column" minHeight="70vh" gap={8} mb={8} w="full">
      <Flex gap={8}>
        <Box
          color="gray.300"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.300"
          p={6}
          borderRadius="md"
        >
          <Heading size="md" fontWeight="semibold" mb={4}>
            Synthetix is rebating trading fees on Base
          </Heading>
          <UnorderedList>
            <ListItem mb={2}>
              Synthetix is rebating 90% of accounts' trading fees spent using Synthetix’s
              perpetual futures markets on Base with 500,000 SNX allocated by
              the Treasury Council.
            </ListItem>
            <ListItem mb={2}>
              50,000 SNX will be rebated each week on a first-come, first-served
              basis, starting May 22nd. Read more in&nbsp;
              <Link
                _hover={{ textDecor: 'none', borderColor:"gray.500"}}
                borderBottom="1px solid"
                borderColor="gray.600"
                href="https://blog.synthetix.io/snx-perps-trading-incentives-on-base/"
              >
                this blog post
              </Link>.
            </ListItem>
            <ListItem>
              Use this tool to see an estimate of the SNX distribution.
            </ListItem>
          </UnorderedList>
        </Box>

        <Box
          color="gray.300"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.300"
          p={6}
          borderRadius="md"
          minWidth="240px"
        >
          <Heading size="md" fontWeight="semibold" mb={4}>Total Distributed</Heading>
          <CircularProgress value={40} trackColor="#001C22" color="#00D1FF" size='100%' thickness='6px'>
            <CircularProgressLabel fontSize="md" fontWeight="medium" letterSpacing="0.1rem" textTransform="uppercase">123,302 SNX</CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Flex>
      <Flex w="100%" gap={8}>
        <InputGroup bg="black">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input type="tel" placeholder="Filter by wallet address" />
        </InputGroup>

        <Box ml="auto" minWidth="240px">
          <Select bg="black">
            <option selected value="option1">
              Week X (X/X - X/X)
            </option>
            <option value="option2">Week X (X/X - X/X)</option>
            <option value="option3">Week X (X/X - X/X)</option>
          </Select>
        </Box>
      </Flex>
      <DataTable data={[]} columns={[]} />
    </Flex>
  );
};

export default Home;
