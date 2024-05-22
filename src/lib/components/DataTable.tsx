'use client';

import { ChevronUpIcon, ChevronDownIcon, UpDownIcon } from '@chakra-ui/icons';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Flex,
} from '@chakra-ui/react';
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
      meta: {
        isNumeric: true,
      },
    }),
    columnHelper.accessor('estimatedDistribution', {
      cell: (info) => Number(info.getValue()).toFixed(2),
      header: 'Estimated Distribution',
      meta: {
        isNumeric: true,
      },
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
              const { meta } = header.column.columnDef;
              return (
                <Th
                  key={header.id}
                  cursor="pointer"
                  onClick={header.column.getToggleSortingHandler()}
                  isNumeric={meta?.isNumeric}
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
              const { meta } = cell.column.columnDef;
              return (
                <Td
                  key={cell.id}
                  isNumeric={meta?.isNumeric}
                  borderBottom={
                    ind == table.getRowModel().rows.length - 1
                      ? 'none'
                      : undefined
                  }
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  {cell.column.id == 'feesPaid' && ' USDC'}
                  {cell.column.id == 'estimatedDistribution' && ' SNX'}
                </Td>
              );
            })}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
