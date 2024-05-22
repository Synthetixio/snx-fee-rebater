import axios from 'axios';
import { useQuery } from 'react-query';
import { z } from 'zod';

// Define a schema for the API response
const ApiResponseSchema = z.object({
  prices: z.array(z.tuple([z.number(), z.number()])),
});

const fetchPriceData = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/synthetix-network-token/market_chart',
    {
      params: {
        vs_currency: 'usd',
        days: 7,
      },
    }
  );

  // Validate the response against the schema
  const validatedResponse = ApiResponseSchema.parse(response.data);
  const averagePrice =
    validatedResponse.prices.reduce(
      (sum, [_timestamp, price]) => sum + price,
      0
    ) / validatedResponse.prices.length;

  console.log(
    `The average price of SNX over the past week is $${averagePrice.toFixed(2)}`
  );
  return averagePrice;
};

export const useFetchPrice = () => {
  return useQuery('fetchSNXPrice', fetchPriceData, {
    onError: (error) => {
      if (error instanceof z.ZodError) {
        console.error(`Validation error: ${error.message}`);
      } else {
        console.error(`Error fetching price: ${error}`);
      }
    },
    select: (data) => ({
      averagePrice: data,
      message: `The average price of SNX over the past week is $${data.toFixed(2)}`,
    }),
  });
};
