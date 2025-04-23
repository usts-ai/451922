import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { notifications } from '../data/mockData';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.lue).length;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="bg-white border-b border-gray-200 fixed w-full z-50 shadow-sm"
    >
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center space-x-2">
          <div 
            className="h-9 w-9 bg-[#007BFF] text-white flex items-center justify-center rounded-lg font-bold text-xl"
          >
            D
          </div>
          <span className="text-[#007BFF] font-bold text-xl">DocuAssure</span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </motion.button>

            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50"
              >
                <div className="p-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-700">Notifications</h3>
                </div>
                <motion.div
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="max-h-96 overflow-y-auto"
                >
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        variants={item}
                        className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!notification.lue ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-start">
                          <div className={`mt-1 mr-3 rounded-full p-1 ${
                            notification.type === 'info' ? 'bg-blue-100 text-blue-500' :
                            notification.type === 'warning' ? 'bg-yellow-100 text-yellow-500' :
                            notification.type === 'success' ? 'bg-green-100 text-green-500' : 
                            'bg-red-100 text-red-500'
                          }`}>
                            {notification.type === 'info' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {notification.type === 'warning' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            )}
                            {notification.type === 'success' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                            {notification.type === 'error' && (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            )}
                          </div>
                          <div className="flex-1 text-sm">
                            <p className="text-gray-700 font-medium">{notification.message}</p>
                            <p className="text-gray-500 text-xs">{notification.date}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      Aucune notification
                    </div>
                  )}
                </motion.div>
                <div className="p-2 text-center border-t border-gray-200">
                  <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                    Voir toutes les notifications
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          <div className="relative">
            <button className="flex items-center space-x-3 focus:outline-none">
              <div className="text-right mr-2">
                <p className="text-sm font-medium text-gray-700">Sophie Martin</p>
                <p className="text-xs text-gray-500">Administrateur</p>
              </div>
              <motion.img 
                whileHover={{ scale: 1.05 }}
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Profile" 
                className="h-10 w-10 rounded-full border-2 border-blue-400"
              />
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
