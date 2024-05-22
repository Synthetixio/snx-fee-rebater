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
import { useEffect, useState } from 'react';

import { DataTable } from '~/lib/components/DataTable';
import type { ProcessedData } from '~/lib/utils/processData';
import { processData } from '~/lib/utils/processData';

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
  const [tableData, setTableData] = useState<ProcessedData[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        const processedData = await processData(data);
        setTableData(processedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  let data = [
    {
      address: '0x123',
      paid: 25.4,
      distribution: 25.4,
    },
    {
      address: '0x123',
      paid: 25.4,
      distribution: 30.48,
    },
    {
      address: '0x123',
      paid: 25.4,
      distribution: 0.91444,
    },
  ];

  data = data.filter((row) => {
    return row.address.includes(filter);
  });

  return (
    <Flex direction="column" minHeight="70vh" gap={6} mb={6} w="full">
      <Flex gap={6} direction={['column', 'column', 'row']}>
        <Flex
          color="gray.300"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.300"
          p={6}
          borderRadius="md"
        >
<<<<<<< Updated upstream
          <Box my="auto">
            <Heading size="md" fontWeight="semibold" mb={3}>
              Synthetix is rebating a share of fees on Base
            </Heading>
            <Text mb={2}>
              Synthetix is rebating trading fees from the perpetual futures
              markets deployed to Base with 500,000 SNX allocated by the
              Treasury Council. Read about the criteria in&nbsp;
=======
          <Heading size="md" fontWeight="semibold" mb={4}>
            Synthetix is rebating trading fees on Base
          </Heading>
          <UnorderedList>
            <ListItem mb={2}>
              Synthetix is rebating 90% of accounts' trading fees spent using
              Synthetix’s perpetual futures markets on Base with 500,000 SNX
              allocated by the Treasury Council.
            </ListItem>
            <ListItem mb={2}>
              50,000 SNX will be rebated each week on a first-come, first-served
              basis, starting May 22nd. Read more in&nbsp;
>>>>>>> Stashed changes
              <Link
                _hover={{ textDecor: 'none', borderColor: 'gray.500' }}
                borderBottom="1px solid"
                borderColor="gray.600"
                href="https://blog.synthetix.io/snx-perps-trading-incentives-on-base/"
              >
                this blog post
              </Link>
              .
<<<<<<< Updated upstream
            </Text>
            <Text>Use this tool to see an estimate of the distributions.</Text>
          </Box>
        </Flex>
=======
            </ListItem>
            <ListItem>
              Use this tool to see an estimate of the SNX distribution.
            </ListItem>
          </UnorderedList>
        </Box>
>>>>>>> Stashed changes

        <Box
          color="gray.300"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.300"
          p={3}
          borderRadius="md"
          minWidth="200px"
        >
<<<<<<< Updated upstream
=======
          <Heading size="md" fontWeight="semibold" mb={4}>
            Total Distributed
          </Heading>
>>>>>>> Stashed changes
          <CircularProgress
            value={40}
            trackColor="#001C22"
            color="#00D1FF"
            size="100%"
            thickness="6px"
          >
<<<<<<< Updated upstream
            <CircularProgressLabel>
              <Text fontSize="md" fontWeight="medium" textTransform="uppercase">
                123,302 SNX
              </Text>
              <Text fontSize="xs" fontWeight="bold" color="gray.300">
                Total Distributed
              </Text>
=======
            <CircularProgressLabel
              fontSize="md"
              fontWeight="medium"
              letterSpacing="0.1rem"
              textTransform="uppercase"
            >
              123,302 SNX
>>>>>>> Stashed changes
            </CircularProgressLabel>
          </CircularProgress>
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
        <Flex
          mb={3.5}
          alignItems="center"
          direction={['column', 'column', 'row']}
        >
          <Heading size="md" fontWeight="semibold">
            Distribution Estimate for Week X (X/X - X/X)
          </Heading>
          <Text
            fontSize="md"
            fontWeight="medium"
            textTransform="uppercase"
            color="gray.300"
            ml={[0, 0, 'auto']}
          >
            23,245/50,000 SNX
          </Text>
        </Flex>
        <Progress
          color="#00D1FF"
          background="#001C22"
          size="lg"
          value={20}
          borderRadius="sm"
        />
      </Box>

      <Flex w="100%" gap={6} direction={['column', 'column', 'row']}>
        <InputGroup bg="black">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.500" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Filter by wallet address"
            value={filter}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFilter(event.target.value)
            }
          />
        </InputGroup>

        <Box ml={[0, 0, 'auto']} minWidth={['none', 'none', '200px']}>
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
        borderRadius="md"
        overflow="auto"
      >
        <DataTable data={data} />
      </Box>
    </Flex>
  );
};

export default Home;
