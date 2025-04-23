import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DonutChart from '../components/DonutChart';
import LineChart from '../components/LineChart';
import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import { 
  documents, 
  donutChartData, 
  lineChartData 
} from '../data/mockData';
import { Document } from '../types';

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recentDocuments, setRecentDocuments] = useState<Document[]>([]);

  // Simuler un chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setRecentDocuments(documents.slice(0, 5));
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const documentColumns = [
    { key: 'nom', label: 'Document' },
    { key: 'clientNom', label: 'Client' },
    { 
      key: 'statut', 
      label: 'Statut',
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Validé' ? 'bg-green-100 text-green-800' :
            value === 'En attente' ? 'bg-yellow-100 text-yellow-800' :
            value === 'Rejeté' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: 'dateDepot', label: 'Date de dépôt' },
    { 
      key: 'priorite', 
      label: 'Priorité',
      render: (value: string) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'Haute' ? 'bg-red-100 text-red-800' :
            value === 'Moyenne' ? 'bg-yellow-100 text-yellow-800' :
            'bg-green-100 text-green-800'
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex space-x-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 text-blue-600 hover:text-blue-800 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 text-green-600 hover:text-green-800 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 text-red-600 hover:text-red-800 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.button>
        </div>
      ),
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center h-full"
        >
          <div className="flex flex-col items-center">
            <svg
              className="animate-spin h-12 w-12 text-blue-600 mb-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <h3 className="text-lg font-semibold text-gray-700">
              Chargement du tableau de bord...
            </h3>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          className="py-6 px-4 sm:px-6 md:px-8"
        >
          {/* Titre du tableau de bord */}
          <motion.div 
            variants={fadeInUp}
            className="mb-8"
          >
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
                <p className="text-gray-500 mt-1">
                  Bienvenue sur votre tableau de bord de gestion documentaire
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>Nouveau document</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Cartes de statistiques */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <StatCard 
              title="Documents totaux"
              value={90}
              icon="document"
              change={{ value: 12, isPositive: true }}
              delay={0}
            />
            <StatCard 
              title="Clients actifs"
              value={18}
              icon="client"
              change={{ value: 5, isPositive: true }}
              delay={1}
            />
            <StatCard 
              title="Documents en attente"
              value={23}
              icon="pending"
              change={{ value: 3, isPositive: false }}
              delay={2}
            />
            <StatCard 
              title="Documents validés"
              value={45}
              icon="validated"
              change={{ value: 18, isPositive: true }}
              delay={3}
            />
          </motion.div>

          {/* Graphiques */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
          >
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Documents traités par mois</h3>
                <div className="flex-grow">
                  <LineChart 
                    data={lineChartData.documentsTraites}
                    title=""
                    color="#007BFF"
                    yLabel="Nombre"
                  />
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <DonutChart 
                data={donutChartData.documentsParStatut}
                title="Répartition des documents par statut"
              />
            </div>
            <div className="lg:col-span-1">
              <DonutChart 
                data={donutChartData.clientsParStatut}
                title="Répartition des clients par statut"
              />
            </div>
          </motion.div>

          {/* Tableau des documents récents */}
          <motion.div 
            variants={fadeInUp}
            className="mb-8"
          >
            <DataTable 
              title="Documents récents"
              columns={documentColumns}
              data={recentDocuments}
              loading={false}
              emptyMessage="Aucun document récent"
            />
          </motion.div>
          
          {/* Section des tâches et rappels */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-white rounded-lg shadow-md p-4 lg:col-span-1">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Tâches à venir</h3>
              <ul className="space-y-3">
                {[
                  { titre: 'Relance Groupama Assurances', deadline: 'Aujourd\'hui', type: 'urgent' },
                  { titre: 'Vérification documents AXA', deadline: 'Demain', type: 'normal' },
                  { titre: 'Mise à jour contrat MAIF', deadline: '26/04/2023', type: 'normal' }
                ].map((tache, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div className={`h-3 w-3 rounded-full mr-3 ${
                      tache.type === 'urgent' ? 'bg-red-500' : 'bg-blue-500'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{tache.titre}</h4>
                      <p className="text-xs text-gray-500">Échéance: {tache.deadline}</p>
                    </div>
                    <button className="p-1 text-gray-400 hover:text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                      </svg>
                    </button>
                  </motion.li>
                ))}
              </ul>
              <button className="mt-4 w-full px-4 py-2 bg-white border border-gray-300 text-blue-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Voir toutes les tâches
              </button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-4 lg:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Activité récente</h3>
              <div className="relative">
                <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-gray-200"></div>
                <ul className="space-y-4 relative z-0">
                  {[
                    { action: 'Document validé', description: 'Contrat responsabilité civile - AXA Assurances', temps: 'Il y a 30 minutes', icone: 'check' },
                    { action: 'Nouveau document', description: 'Attestation de formation - AXA Assurances', temps: 'Il y a 2 heures', icone: 'document' },
                    { action: 'Relance automatique', description: 'Envoyée à Groupama Assurances', temps: 'Il y a 5 heures', icone: 'send' },
                    { action: 'Document rejeté', description: 'Attestation de sinistre - MAIF Assurances', temps: 'Il y a 1 jour', icone: 'reject' }
                  ].map((activite, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="pl-10 relative"
                    >
                      <div className={`absolute left-0 p-2 rounded-full ${
                        activite.icone === 'check' ? 'bg-green-100 text-green-600' :
                        activite.icone === 'document' ? 'bg-blue-100 text-blue-600' :
                        activite.icone === 'send' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {activite.icone === 'check' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                        {activite.icone === 'document' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        )}
                        {activite.icone === 'send' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        )}
                        {activite.icone === 'reject' && (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{activite.action}</h4>
                        <p className="text-xs text-gray-600">{activite.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{activite.temps}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <button className="mt-4 w-full px-4 py-2 bg-white border border-gray-300 text-blue-600 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                Voir toute l'activité
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dashboard;
