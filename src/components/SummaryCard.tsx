import React from 'react';
import { CryptoData } from '../store/cryptoApi';

interface SummaryCardProps {
  data: CryptoData[];
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
  const highestPrice = Math.max(...data.map(coin => coin.current_price));
  const lowestPrice = Math.min(...data.map(coin => coin.current_price));
  const averageMarketCap = data.reduce((sum, coin) => sum + coin.market_cap, 0) / data.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-2">Highest Price</h4>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400">${highestPrice.toLocaleString()}</p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-2">Lowest Price</h4>
        <p className="text-2xl font-bold text-red-600 dark:text-red-400">${lowestPrice.toLocaleString()}</p>
      </div>
      <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
        <h4 className="text-lg font-semibold mb-2">Average Market Cap</h4>
        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">${averageMarketCap.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default SummaryCard;

