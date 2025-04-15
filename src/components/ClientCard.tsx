import React from 'react';
import { motion } from 'framer-motion';

interface ClientCardProps {
  id: string;
  name: string;
  email: string;
  contractsCount: number;
  documentsCount: number;
  pendingDocumentsCount: number;
  onView: (id: string) => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  id,
  name,
  email,
  contractsCount,
  documentsCount,
  pendingDocumentsCount,
  onView
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
    >
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
            {name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-500 text-sm">{email}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-4">
          <div className="text-center">
            <p className="text-gray-500 text-xs">Contrats</p>
            <p className="text-gray-800 font-semibold">{contractsCount}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">Documents</p>
            <p className="text-gray-800 font-semibold">{documentsCount}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500 text-xs">En attente</p>
            <p className="text-gray-800 font-semibold">{pendingDocumentsCount}</p>
          </div>
        </div>

        <div className="mt-4 flex justify-between">
          <motion.button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            onClick={() => onView(id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Voir les détails
          </motion.button>
          <div className="flex space-x-2">
            <motion.button
              className="inline-flex items-center p-2 border border-gray-200 rounded-md text-gray-400 hover:text-indigo-600 hover:border-indigo-600 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </motion.button>
            <motion.button
              className="inline-flex items-center p-2 border border-gray-200 rounded-md text-gray-400 hover:text-red-600 hover:border-red-600 focus:outline-none"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ClientCard;
