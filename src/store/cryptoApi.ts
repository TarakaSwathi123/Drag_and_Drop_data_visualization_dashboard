import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  roi: null | any;
  last_updated: string;
}

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3/' }),
  endpoints: (builder) => ({
    getCryptoData: builder.query<CryptoData[], void>({
      query: () => 'coins/markets?vs_currency=usd',
      pollingInterval: 5000, 
    }),
  }),
});

export const { useGetCryptoDataQuery } = cryptoApi;

