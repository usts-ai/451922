import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import DocumentCard from '../components/DocumentCard';
import UploadModal from '../components/UploadModal';

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Données mockées pour les documents
  const mockDocuments = [
    {
      id: "doc1",
      title: "Attestation de domicile",
      type: "PDF",
      clientName: "Martin Dupont",
      status: "approved" as const,
      date: "15/04/2025",
      category: "identification"
    },
    {
      id: "doc2",
      title: "Pièce d'identité",
      type: "JPG",
      clientName: "Sophie Leroy",
      status: "pending" as const,
      date: "14/04/2025",
      category: "identification"
    },
    {
      id: "doc3",
      title: "Relevé bancaire",
      type: "PDF",
      clientName: "Jean Dujardin",
      status: "waiting" as const,
      date: "13/04/2025",
      category: "financial"
    },
    {
      id: "doc4",
      title: "Contrat d'assurance",
      type: "PDF",
      clientName: "Camille Blanc",
      status: "rejected" as const,
      date: "12/04/2025",
      category: "contract"
    },
    {
      id: "doc5",
      title: "Bulletin de salaire",
      type: "PDF",
      clientName: "Pierre Martin",
      status: "approved" as const,
      date: "11/04/2025",
      category: "financial"
    },
    {
      id: "doc6",
      title: "Contrat de prêt",
      type: "PDF",
      clientName: "Lucie Dubois",
      status: "pending" as const,
      date: "10/04/2025",
      category: "contract"
    },
    {
      id: "doc7",
      title: "Carte d'identité",
      type: "JPG",
      clientName: "Thomas Mercier",
      status: "approved" as const,
      date: "09/04/2025",
      category: "identification"
    },
    {
      id: "doc8",
      title: "Livret de famille",
      type: "PDF",
      clientName: "Marie Laurent",
      status: "waiting" as const,
      date: "08/04/2025",
      category: "identification"
    },
    {
      id: "doc9",
      title: "Certificat d'immatriculation",
      type: "PDF",
      clientName: "Robert Bernard",
      status: "pending" as const,
      date: "07/04/2025",
      category: "vehicle"
    },
    {
      id: "doc10",
      title: "Attestation d'assurance",
      type: "PDF",
      clientName: "Élise Moreau",
      status: "approved" as const,
      date: "06/04/2025",
      category: "insurance"
    },
    {
      id: "doc11",
      title: "Avis d'imposition",
      type: "PDF",
      clientName: "Philippe Lemoine",
      status: "rejected" as const,
      date: "05/04/2025",
      category: "financial"
    },
    {
      id: "doc12",
      title: "Contrat de travail",
      type: "PDF",
      clientName: "Caroline Petit",
      status: "waiting" as const,
      date: "04/04/2025",
      category: "contract"
    }
  ];

  // Filtrage des documents
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doc.clientName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    const matchesType = typeFilter === 'all' || doc.category === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'approved': return 'Approuvés';
      case 'pending': return 'En attente';
      case 'waiting': return 'En attente de dépôt';
      case 'rejected': return 'Rejetés';
      case 'all': return 'Tous les statuts';
      default: return status;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'identification': return 'Identification';
      case 'financial': return 'Financier';
      case 'contract': return 'Contrat';
      case 'vehicle': return 'Véhicule';
      case 'insurance': return 'Assurance';
      case 'all': return 'Tous les types';
      default: return category;
    }
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
            Gestion des Documents
          </motion.h1>
          
          <motion.button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Déposer un document
          </motion.button>
        </div>
        
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Rechercher un document ou un client..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="approved">Approuvés</option>
              <option value="pending">En attente</option>
              <option value="waiting">En attente de dépôt</option>
              <option value="rejected">Rejetés</option>
            </select>
            
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">Tous les types</option>
              <option value="identification">Identification</option>
              <option value="financial">Financier</option>
              <option value="contract">Contrat</option>
              <option value="vehicle">Véhicule</option>
              <option value="insurance">Assurance</option>
            </select>
          </div>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div>
              {filteredDocuments.length} document(s) trouvé(s)
            </div>
            <div className="flex items-center space-x-2">
              <span>Filtres: </span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">{getStatusLabel(statusFilter)}</span>
              <span className="px-2 py-1 bg-gray-100 rounded-full">{getCategoryLabel(typeFilter)}</span>
              {searchTerm && <span className="px-2 py-1 bg-gray-100 rounded-full">Recherche: "{searchTerm}"</span>}
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc) => (
              <DocumentCard
                key={doc.id}
                id={doc.id}
                title={doc.title}
                type={doc.type}
                clientName={doc.clientName}
                status={doc.status}
                date={doc.date}
              />
            ))
          ) : (
            <div className="col-span-3 py-12 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun document trouvé</h3>
              <p className="mt-1 text-gray-500">Essayez de modifier vos filtres ou de déposer un nouveau document.</p>
              <div className="mt-6">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  onClick={() => setShowUploadModal(true)}
                >
                  Déposer un document
                </button>
              </div>
            </div>
          )}
        </div>
        
        {filteredDocuments.length > 0 && (
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Précédent</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#"
                aria-current="page"
                className="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                1
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                2
              </a>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                ...
              </span>
              <a
                href="#"
                className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                <span className="sr-only">Suivant</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        )}
      </main>
      
      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
  );
};

export default Documents;
