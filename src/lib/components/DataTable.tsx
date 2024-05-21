import { Box } from '@chakra-ui/react';
import sample from '~/lib/sample.csv'

const DataTable = () => {
  return (
    <Box textAlign="center">
      {JSON.stringify(sample)}
    </Box>
  );
};

export default DataTable;
