import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import { motion } from 'framer-motion';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="App min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      
      <main className={`flex-grow pt-20 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 py-8"
        >
          <Dashboard />
        </motion.div>
      </main>
      
      <div className={`${sidebarCollapsed ? 'ml-16' : 'ml-64'} transition-all duration-300`}>
        <Footer />
      </div>
    </div>
  );
}

export default App;
