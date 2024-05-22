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
  Spinner,
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const data = await response.json();
        const processedData = await processData(data);
        setTableData(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    tableData.filter((row) => {
      return row.walletAddress.includes(filter);
    });
  }, [filter, tableData]);

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
          <Box my="auto">
            <Heading size="md" fontWeight="semibold" mb={3}>
              Synthetix is rebating a share of fees on Base
            </Heading>
            <Text mb={2}>
              Synthetix is rebating trading fees from the perpetual futures
              markets deployed to Base with 500,000 SNX allocated by the
              Treasury Council. Read about the criteria in&nbsp;
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
        </Flex>

        <Box
          color="gray.300"
          bg="black"
          border="1px solid"
          borderColor="whiteAlpha.300"
          p={3}
          borderRadius="md"
          minWidth="200px"
        >
          <Flex alignItems="center" justifyContent="center">
            <CircularProgress
              value={40}
              trackColor="#001C22"
              color="#00D1FF"
              size="100%"
              thickness="6px"
              isIndeterminate={loading}
            >
              <CircularProgressLabel>
                <Text
                  fontSize="md"
                  fontWeight="medium"
                  textTransform="uppercase"
                  opacity={loading ? 0 : 1}
                  transition="opacity 0.33s"
                >
                  123,302 SNX
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="gray.300"
                  opacity={loading ? 0 : 1}
                  transition="opacity 0.33s"
                >
                  Total Distributed
                </Text>
              </CircularProgressLabel>
            </CircularProgress>
          </Flex>
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
          alignItems={['left', 'left', 'center']}
          direction={['column', 'column', 'row']}
        >
          <Heading size="md" fontWeight="semibold" mb={[2, 2, 0]}>
            Distribution Estimate for Week X (X/X - X/X)
          </Heading>
          <Text
            fontSize="md"
            fontWeight="medium"
            textTransform="uppercase"
            color="gray.300"
            ml={[0, 0, 'auto']}
            opacity={loading ? 0 : 1}
            transition="opacity 0.33s"
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
          isIndeterminate={loading}
        />
      </Box>

      <Flex w="100%" gap={6} direction={['column', 'column', 'row']}>
        <InputGroup size="sm" bg="black">
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
          <Select size="sm" bg="black">
            {filteredWeeks.map((week, ind) => {
              return (
                <option value="ind">
                  Week {ind + 1} ({format(week.start, 'M/dd')} -{' '}
                  {format(week.end, 'M/dd')})
                </option>
              );
            })}
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
        {loading ? (
          <Flex py={12}>
            <Spinner m="auto" size="xl" color="#00D1FF" />
          </Flex>
        ) : (
          <DataTable data={tableData} />
        )}
      </Box>
    </Flex>
  );
};

export default Home;
