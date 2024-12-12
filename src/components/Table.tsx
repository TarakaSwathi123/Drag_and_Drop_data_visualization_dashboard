import React, { useState } from 'react';
import { CryptoData } from '../store/cryptoApi';

interface TableProps {
  data: CryptoData[];
}

const Table: React.FC<TableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<keyof CryptoData>('market_cap_rank');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = [...data].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleSort = (column: keyof CryptoData) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>Name</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('current_price')}>Price</th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('market_cap')}>Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((coin) => (
            <tr key={coin.id} className="border-b dark:border-gray-700">
              <td className="px-4 py-2">{coin.name}</td>
              <td className="px-4 py-2">${coin.current_price.toLocaleString()}</td>
              <td className="px-4 py-2">${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={page * itemsPerPage >= data.length}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;