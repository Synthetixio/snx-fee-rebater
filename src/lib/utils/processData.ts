import { ethers } from 'ethers';

// Define the ProcessedData type
export interface ProcessedData {
  processedData: {
    walletAddress: string;
    feesPaid: number;
    estimatedDistribution: number;
  };
  totalSnxDistribution: number;
}

const perpsMarketProxyABI = [
  {
    constant: true,
    inputs: [{ name: '_accountId', type: 'uint128' }],
    name: 'getAccountOwner',
    outputs: [{ name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];
const perpsMarketProxyAddress = '0x0A2AF931eFFd34b81ebcc57E3d3c9B1E1dE1C9Ce';

const provider = new ethers.JsonRpcProvider('https://base.llamarpc.com');
const perpsMarketProxy = new ethers.Contract(
  perpsMarketProxyAddress,
  perpsMarketProxyABI,
  provider
);

interface FetchedData {
  account_id: number;
  day: string; // Assuming it's an ISO 8601 timestamp string
  exchange_fees: number;
}

const FEE_PERCENTAGE = 0.9;

export const processData = async (
  fetchedData: FetchedData[]
): Promise<ProcessedData[]> => {
  const accountOwnerCache: { [accountId: string]: string } = {};

  const getWalletAddress = async (accountId: number): Promise<string> => {
    if (!accountOwnerCache[accountId]) {
      try {
        const owner = await perpsMarketProxy.getAccountOwner(accountId);
        accountOwnerCache[accountId] = owner;
      } catch (error) {
        console.error(`Error fetching owner for account ${accountId}:`, error);
        accountOwnerCache[accountId] = 'Unknown'; // Handle missing or invalid accounts
      }
    }
    return accountOwnerCache[accountId];
  };

  const walletAddresses = await Promise.all(
    fetchedData.map((data) => getWalletAddress(data.account_id))
  );

  const walletData: {
    [walletAddress: string]: {
      feesPaid: number;
      estimatedDistribution: number;
    };
  } = {};

  let totalSnxDistribution = 0;
  fetchedData.forEach((data, index) => {
    const walletAddress = walletAddresses[index];
    const exchangeFees = Number(data.exchange_fees);

    if (!walletData[walletAddress]) {
      walletData[walletAddress] = { feesPaid: 0, estimatedDistribution: 0 };
    }

    if (!isNaN(exchangeFees)) {
      walletData[walletAddress].feesPaid += exchangeFees;
      const estimatedFeeDistribution = exchangeFees * FEE_PERCENTAGE;
      const snxDistribution = estimatedFeeDistribution / 2.5;
      totalSnxDistribution += snxDistribution;
      walletData[walletAddress].estimatedDistribution += snxDistribution;
    } else {
      console.error(
        `Invalid exchange fee for account ${data.account_id}:`,
        data.exchange_fees
      );
    }
  });

  return {
    processedData: Object.keys(walletData).map((walletAddress) => ({
      walletAddress,
      feesPaid: walletData[walletAddress].feesPaid,
      estimatedDistribution: walletData[walletAddress].estimatedDistribution,
    })),
    totalSnxDistribution,
  };
};
