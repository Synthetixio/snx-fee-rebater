// data transformation
// kwenta account id -> user EOA
// aggregate fees paid by user
// get snx price and calculate snx rebates

import { wei, Wei } from '@synthetixio/wei';

type AccountData = {
  day: string;
  accountId: string;
  exchangeFees: string;
}[];

export default function transformAccountData(accountData: AccountData) {
  const transformedData = accountData.reduce<{
    accountId: { totalFees: string };
  }>((acc, { day, accountId, exchangeFees }) => {
    return {
      user: account.accountId,
      fees: account.exchangeFees,
    };
  }, {});

  return transformedData;
}
