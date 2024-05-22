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
  Text,
  Link,
  CircularProgress,
  CircularProgressLabel,
  Progress,
} from '@chakra-ui/react';
import { addWeeks, startOfWeek, endOfWeek, format, isBefore } from 'date-fns';
import { useEffect } from 'react';

import { DataTable } from '~/lib/components/DataTable';
import { useFetchPrice } from '~/lib/utils/fetchPrice';

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

    const fetchFees = async () => {
      try {
        const users = await fetchUsers(); // Use the fetchUsers function to get the data
        const feesData = users.map((user) => ({
          accountId: user.account_id,
          date: user.day,
          exchangeFees: parseFloat(user.exchange_fees).toFixed(2), // Ensure the fees are formatted as numbers with two decimal places
        }));

        console.log('Fees Data', feesData);
        return feesData;
      } catch (error) {
        console.error('Error fetching fees:', error.message);
        throw error; // Re-throw the error to handle it further up the call stack if necessary
      }
    };

  }, []);
  return (
    <Flex direction="column" minHeight="70vh" gap={6} mb={6} w="full">
      <Flex gap={6}>
        <Box
          color="gray.300"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.300"
          p={6}
          borderRadius="md"
        >
          <Heading size="md" fontWeight="semibold" mb={3}>
            Synthetix is rebating a share of fees on Base
          </Heading>
          <Text mb={2}>
            Synthetix is rebating trading fees from the perpetual futures
            markets deployed to Base with 500,000 SNX allocated by the Treasury
            Council. Read about the specifics in&nbsp;
            <Link
              _hover={{ textDecor: 'none', borderColor: 'gray.500' }}
              borderBottom="1px solid"
              borderColor="gray.600"
              href="https://blog.synthetix.io/snx-perps-trading-incentives-on-base/"
            >
              this blog post
            </Link>
            .
          </Text>
          <Text>Use this tool to see an estimate of the distributions.</Text>
        </Box>

        <Box
          color="gray.300"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.300"
          p={3}
          borderRadius="md"
          minWidth="200px"
        >
          <CircularProgress
            value={40}
            trackColor="#001C22"
            color="#00D1FF"
            size="100%"
            thickness="6px"
          >
            <CircularProgressLabel>
              <Text fontSize="md" fontWeight="medium" textTransform="uppercase">
                123,302 SNX
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="gray.300">
                Total Distributed
              </Text>
            </CircularProgressLabel>
          </CircularProgress>
        </Box>
      </Flex>
      <Flex w="100%" gap={6}>
        <InputGroup bg="black">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input type="tel" placeholder="Filter by wallet address" />
        </InputGroup>

        <Box ml="auto" minWidth="200px">
          <Select bg="black">
            <option selected value="option1">
              Week X (X/X - X/X)
            </option>
            <option value="option2">Week X (X/X - X/X)</option>
            <option value="option3">Week X (X/X - X/X)</option>
          </Select>
        </Box>
      </Flex>

      <Box
        color="gray.300"
        bg="black"
        border="1px solid"
        borderColor="whiteAlpha.300"
        p={6}
        borderRadius="md"
      >
        <Flex>
        <Heading size="md" fontWeight="semibold" mb={3}>
          Total Distribution for Week X (X/X - X/X)
        </Heading>
          <Text fontSize="xs" fontWeight="bold" color="gray.300"  ml="auto">23,245/50,000 SNX</Text>
        </Flex>
        <Progress color='#00D1FF' background="#001C22" size='lg' value={20} borderRadius="sm" />
      </Box>
      <DataTable data={[]} columns={[]} />
    </Flex>
  );
};

export default Home;
