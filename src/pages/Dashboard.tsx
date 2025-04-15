import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import DashboardCard from '../components/DashboardCard';
import ActivityChart from '../components/ActivityChart';
import NotificationPanel from '../components/NotificationPanel';
import DocumentCard from '../components/DocumentCard';
import UploadModal from '../components/UploadModal';

const Dashboard: React.FC = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Données mockées pour les statistiques
  const stats = [
    {
      title: "Documents en attente",
      value: 24,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      ),
      color: "border-yellow-500"
    },
    {
      title: "Clients actifs",
      value: 156,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
      ),
      color: "border-blue-500"
    },
    {
      title: "Documents traités",
      value: 732,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
        </svg>
      ),
      color: "border-green-500"
    },
    {
      title: "Relances envoyées",
      value: 48,
      icon: (
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      ),
      color: "border-purple-500"
    }
  ];

  // Données mockées pour le graphique d'activité
  const activityData = [
    { label: "Documents reçus", value: 84, color: "bg-blue-500" },
    { label: "Documents validés", value: 67, color: "bg-green-500" },
    { label: "Documents en attente", value: 23, color: "bg-yellow-500" },
    { label: "Documents rejetés", value: 12, color: "bg-red-500" }
  ];

  // Données mockées pour les documents récents
  const recentDocuments = [
    {
      id: "doc1",
      title: "Attestation de domicile",
      type: "PDF",
      clientName: "Martin Dupont",
      status: "approved" as const,
      date: "15/04/2025"
    },
    {
      id: "doc2",
      title: "Pièce d'identité",
      type: "JPG",
      clientName: "Sophie Leroy",
      status: "pending" as const,
      date: "14/04/2025"
    },
    {
      id: "doc3",
      title: "Relevé bancaire",
      type: "PDF",
      clientName: "Jean Dujardin",
      status: "waiting" as const,
      date: "13/04/2025"
    },
    {
      id: "doc4",
      title: "Contrat d'assurance",
      type: "PDF",
      clientName: "Camille Blanc",
      status: "rejected" as const,
      date: "12/04/2025"
    }
  ];

  // Données mockées pour les notifications
  const notifications = [
    {
      id: "notif1",
      message: "Nouveau document déposé par Martin Dupont",
      time: "Il y a 10 minutes",
      isRead: false,
      type: "info" as const
    },
    {
      id: "notif2",
      message: "La date limite pour le document de Sophie Leroy approche",
      time: "Il y a 2 heures",
      isRead: false,
      type: "warning" as const
    },
    {
      id: "notif3",
      message: "Document validé : Attestation de domicile",
      time: "Il y a 5 heures",
      isRead: true,
      type: "success" as const
    },
    {
      id: "notif4",
      message: "Échec de l'envoi de la relance automatique",
      time: "Hier",
      isRead: true,
      type: "error" as const
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <motion.h1 
            className="text-2xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Tableau de bord
          </motion.h1>
          
          <motion.button
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Déposer des documents
          </motion.button>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, staggerChildren: 0.1 }}
        >
          {stats.map((stat, index) => (
            <DashboardCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          ))}
        </motion.div>
        
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Documents récents</h2>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentDocuments.map((doc) => (
                  <DocumentCard
                    key={doc.id}
                    id={doc.id}
                    title={doc.title}
                    type={doc.type}
                    clientName={doc.clientName}
                    status={doc.status}
                    date={doc.date}
                  />
                ))}
              </div>
              
              <div className="px-6 py-4 border-t border-gray-200 text-center">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                  Voir tous les documents
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <ActivityChart 
                title="Activité des documents (30 derniers jours)" 
                data={activityData} 
              />
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <NotificationPanel notifications={notifications} />
          </motion.div>
        </div>
      </main>
      
      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
  );
};

export default Dashboard;
