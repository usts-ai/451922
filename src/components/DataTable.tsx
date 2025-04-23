import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Column {
  key: string;
  label: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface DataTableProps {
  title: string;
  columns: Column[];
  data: any[];
  loading?: boolean;
  emptyMessage?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  title,
  columns,
  data,
  loading = false,
  emptyMessage = 'Aucune donnée disponible'
}) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const getSortedData = () => {
    if (!sortKey) return data;

    return [...data].sort((a, b) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortOrder === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return sortOrder === 'asc'
        ? (valueA > valueB ? 1 : -1)
        : (valueA < valueB ? 1 : -1);
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-md p-4 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Rechercher..."
            className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  onClick={() => handleSort(column.key)}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.label}</span>
                    {sortKey === column.key && (
                      <span>
                        {sortOrder === 'asc' ? ' ↑' : ' ↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <motion.tbody
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white divide-y divide-gray-200"
          >
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  Chargement...
                </td>
              </tr>
            ) : getSortedData().length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              getSortedData().map((item, index) => (
                <motion.tr
                  key={index}
                  variants={item}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {columns.map((column) => (
                    <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm">
                      {column.render ? column.render(item[column.key], item) : item[column.key]}
                    </td>
                  ))}
                </motion.tr>
              ))
            )}
          </motion.tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Affichage de {getSortedData().length} éléments
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50">
            Précédent
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DataTable;
