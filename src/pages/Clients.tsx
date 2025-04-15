import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import ClientCard from '../components/ClientCard';
import UploadModal from '../components/UploadModal';

const Clients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<{ id: string; name: string } | null>(null);

  // Données mockées pour les clients
  const mockClients = [
    {
      id: "cl1",
      name: "Martin Dupont",
      email: "martin.dupont@example.com",
      contractsCount: 3,
      documentsCount: 12,
      pendingDocumentsCount: 2
    },
    {
      id: "cl2",
      name: "Sophie Leroy",
      email: "sophie.leroy@example.com",
      contractsCount: 1,
      documentsCount: 5,
      pendingDocumentsCount: 3
    },
    {
      id: "cl3",
      name: "Jean Dujardin",
      email: "jean.dujardin@example.com",
      contractsCount: 2,
      documentsCount: 8,
      pendingDocumentsCount: 0
    },
    {
      id: "cl4",
      name: "Camille Blanc",
      email: "camille.blanc@example.com",
      contractsCount: 4,
      documentsCount: 16,
      pendingDocumentsCount: 5
    },
    {
      id: "cl5",
      name: "Pierre Martin",
      email: "pierre.martin@example.com",
      contractsCount: 1,
      documentsCount: 4,
      pendingDocumentsCount: 1
    },
    {
      id: "cl6",
      name: "Lucie Dubois",
      email: "lucie.dubois@example.com",
      contractsCount: 2,
      documentsCount: 7,
      pendingDocumentsCount: 0
    }
  ];

  // Filtrage des clients
  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           client.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'pending') return matchesSearch && client.pendingDocumentsCount > 0;
    return matchesSearch;
  });

  const handleClientView = (id: string) => {
    const client = mockClients.find(c => c.id === id);
    if (client) {
      // Simulation de navigation - dans une vraie app, on utiliserait un router
      console.log(`Affichage des détails du client: ${client.name}`);
    }
  };

  const handleUploadForClient = (client: { id: string; name: string }) => {
    setSelectedClient(client);
    setShowUploadModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <motion.h1 
            className="text-2xl font-bold text-gray-900 mb-4 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Gestion des Clients
          </motion.h1>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">Tous les clients</option>
              <option value="pending">Avec documents en attente</option>
            </select>
            
            <motion.button
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Ajouter un client
            </motion.button>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <ClientCard
                key={client.id}
                id={client.id}
                name={client.name}
                email={client.email}
                contractsCount={client.contractsCount}
                documentsCount={client.documentsCount}
                pendingDocumentsCount={client.pendingDocumentsCount}
                onView={handleClientView}
              />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun client trouvé</h3>
              <p className="mt-1 text-gray-500">Essayez d'utiliser d'autres critères de recherche ou ajoutez un nouveau client.</p>
            </div>
          )}
        </motion.div>
        
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {mockClients.slice(0, 4).map((client) => (
              <motion.div 
                key={client.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 cursor-pointer"
                whileHover={{ scale: 1.02, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                onClick={() => handleUploadForClient({ id: client.id, name: client.name })}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
                    {client.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-800">{client.name}</p>
                    <p className="text-xs text-gray-500">Déposer un document</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => {
          setShowUploadModal(false);
          setSelectedClient(null);
        }}
        clientId={selectedClient?.id}
        clientName={selectedClient?.name}
      />
    </div>
  );
};

export default Clients;
