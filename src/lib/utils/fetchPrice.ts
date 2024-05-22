import axios from 'axios';

export const fetchPriceData = async () => {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/coins/synthetix-network-token'
  );

  // Validate the response against the schema
  // const validatedResponse = ApiResponseSchema.parse(response.data);
  // const averagePrice =
  //   validatedResponse.prices.reduce(
  //     (sum, [_timestamp, price]) => sum + price,
  //     0
  //   ) / validatedResponse.prices.length;

  // console.log(
  //   `The average price of SNX over the past week is $${averagePrice.toFixed(2)}`
  // );
  console.log('YAOOO', response.data);
  return 1;
};
