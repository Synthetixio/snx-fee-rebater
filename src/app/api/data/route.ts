// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextResponse } from 'next/server';
import pool from '../../db';

export const GET = async (req: any, res: any) => {
  try {
    const client = await pool.connect();
    const query = `
      SELECT
        date_trunc('day', ts) AS day,
        account_id,
        sum(exchange_fees) AS exchange_fees
      FROM
        base_mainnet.fct_perp_trades
      WHERE
        ts >= '2024-05-01' AND
        ts <= '2024-05-08'
      GROUP BY 1, 2
      ORDER BY 1 DESC, 3 DESC
      LIMIT 1000
    `;
    const result = await client.query(query);
    client.release();

    const response = NextResponse.json(result.rows, { status: 200 });
    response.headers.set('Cache-Control', 'no-store');
    return response;
  } catch (err) {
    console.log('hailo');
    console.error(err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};