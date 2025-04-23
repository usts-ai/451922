import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: 'document' | 'client' | 'pending' | 'validated';
  change?: {
    value: number;
    isPositive: boolean;
  };
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, delay = 0 }) => {
  const getIcon = () => {
    switch (icon) {
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'client':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        );
      case 'pending':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'validated':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const iconColor = () => {
    switch (icon) {
      case 'document': return 'bg-blue-100 text-blue-600';
      case 'client': return 'bg-purple-100 text-purple-600';
      case 'pending': return 'bg-yellow-100 text-yellow-600';
      case 'validated': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
      className="bg-white rounded-lg shadow-md p-5 h-full"
    >
      <div className="flex justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          {change && (
            <div className="flex items-center mt-2">
              <span className={change.isPositive ? 'text-green-500' : 'text-red-500'}>
                {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
              <span className="text-gray-400 text-xs ml-1">vs mois préc.</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${iconColor()}`}>
          {getIcon()}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;
