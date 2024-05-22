'use client';

import {
  ChevronUpIcon,
  ChevronDownIcon,
  UpDownIcon,
  ExternalLinkIcon,
} from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Link,
  Code,
} from '@chakra-ui/react';
import type { SortingState } from '@tanstack/react-table';
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  createColumnHelper,
} from '@tanstack/react-table';
import * as React from 'react';

export type DataTableProps<Data extends object> = {
  data: Data[];
};

export function DataTable<Data extends object>({ data }: any) {
  type TableRowData = {
    walletAddress: string;
    feesPaid: number;
    estimatedDistribution: number;
  };

  const columnHelper = createColumnHelper<TableRowData>();

  const columns = [
    columnHelper.accessor('walletAddress', {
      cell: (info) => info.getValue(),
      header: 'Wallet Address',
    }),
    columnHelper.accessor('feesPaid', {
      cell: (info) => Number(info.getValue()).toFixed(2),
      header: 'Fees Paid',
    }),
    columnHelper.accessor('estimatedDistribution', {
      cell: (info) => Number(info.getValue()).toFixed(2),
      header: 'Estimated Distribution',
    }),
  ];

  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'estimatedDistribution', desc: true },
  ]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <Table size="sm">
      <Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <Th
                  key={header.id}
                  cursor="pointer"
                  onClick={header.column.getToggleSortingHandler()}
                  pt={3}
                  pb={2.5}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  <chakra.span pl="1">
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === 'desc' ? (
                        <ChevronDownIcon
                          transform="scale(1.5) translateY(1.5px)"
                          aria-label="sorted descending"
                        />
                      ) : (
                        <ChevronUpIcon
                          transform="scale(1.5) translateY(-2px)"
                          aria-label="sorted ascending"
                        />
                      )
                    ) : (
                      <UpDownIcon
                        transform="translateY(-1px)"
                        aria-label="unsorted"
                      />
                    )}
                  </chakra.span>
                </Th>
              );
            })}
          </Tr>
        ))}
      </Thead>

      <Tbody>
        {table.getRowModel().rows.map((row, ind) => (
          <Tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <Td
                  key={cell.id}
                  borderBottom={
                    ind === table.getRowModel().rows.length - 1
                      ? 'none'
                      : undefined
                  }
                >
                  {cell.column.id === 'walletAddress' ? (
                    <Code
                      _hover={{ textDecoration: 'none' }}
                      bg="none"
                      as={Link}
                      href={cell.getValue() as string}
                    >
                      {(cell.getValue() as string).substring(0, 6)}...
                      {(cell.getValue() as string).slice(-4)}
                      <ExternalLinkIcon
                        ml={1.5}
                        opacity={0.8}
                        transform="translateY(-1.5px)"
                      />
                    </Code>
                  ) : (
                    flexRender(cell.column.columnDef.cell, cell.getContext())
                  )}
                  {cell.column.id === 'feesPaid' && ' USDC'}
                  {cell.column.id === 'estimatedDistribution' && ' SNX'}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
