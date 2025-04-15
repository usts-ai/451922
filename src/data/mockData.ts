// Types
export interface Client {
  id: string;
  name: string;
  email: string;
  contractsCount: number;
  documentsCount: number;
  pendingDocumentsCount: number;
}

export interface Document {
  id: string;
  title: string;
  type: string;
  clientName: string;
  status: 'pending' | 'approved' | 'rejected' | 'waiting';
  date: string;
  category: string;
}

export interface Notification {
  id: string;
  message: string;
  time: string;
  isRead: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface ActivityData {
  label: string;
  value: number;
  color: string;
}

export interface StatCard {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

// Données mockées des clients
export const mockClients: Client[] = [
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

// Données mockées des documents
export const mockDocuments: Document[] = [
  {
    id: "doc1",
    title: "Attestation de domicile",
    type: "PDF",
    clientName: "Martin Dupont",
    status: "approved",
    date: "15/04/2025",
    category: "identification"
  },
  {
    id: "doc2",
    title: "Pièce d'identité",
    type: "JPG",
    clientName: "Sophie Leroy",
    status: "pending",
    date: "14/04/2025",
    category: "identification"
  },
  {
    id: "doc3",
    title: "Relevé bancaire",
    type: "PDF",
    clientName: "Jean Dujardin",
    status: "waiting",
    date: "13/04/2025",
    category: "financial"
  },
  {
    id: "doc4",
    title: "Contrat d'assurance",
    type: "PDF",
    clientName: "Camille Blanc",
    status: "rejected",
    date: "12/04/2025",
    category: "contract"
  },
  {
    id: "doc5",
    title: "Bulletin de salaire",
    type: "PDF",
    clientName: "Pierre Martin",
    status: "approved",
    date: "11/04/2025",
    category: "financial"
  },
  {
    id: "doc6",
    title: "Contrat de prêt",
    type: "PDF",
    clientName: "Lucie Dubois",
    status: "pending",
    date: "10/04/2025",
    category: "contract"
  },
  {
    id: "doc7",
    title: "Carte d'identité",
    type: "JPG",
    clientName: "Thomas Mercier",
    status: "approved",
    date: "09/04/2025",
    category: "identification"
  },
  {
    id: "doc8",
    title: "Livret de famille",
    type: "PDF",
    clientName: "Marie Laurent",
    status: "waiting",
    date: "08/04/2025",
    category: "identification"
  },
  {
    id: "doc9",
    title: "Certificat d'immatriculation",
    type: "PDF",
    clientName: "Robert Bernard",
    status: "pending",
    date: "07/04/2025",
    category: "vehicle"
  },
  {
    id: "doc10",
    title: "Attestation d'assurance",
    type: "PDF",
    clientName: "Élise Moreau",
    status: "approved",
    date: "06/04/2025",
    category: "insurance"
  },
  {
    id: "doc11",
    title: "Avis d'imposition",
    type: "PDF",
    clientName: "Philippe Lemoine",
    status: "rejected",
    date: "05/04/2025",
    category: "financial"
  },
  {
    id: "doc12",
    title: "Contrat de travail",
    type: "PDF",
    clientName: "Caroline Petit",
    status: "waiting",
    date: "04/04/2025",
    category: "contract"
  }
];

// Données mockées des notifications
export const mockNotifications: Notification[] = [
  {
    id: "notif1",
    message: "Nouveau document déposé par Martin Dupont",
    time: "Il y a 10 minutes",
    isRead: false,
    type: "info"
  },
  {
    id: "notif2",
    message: "La date limite pour le document de Sophie Leroy approche",
    time: "Il y a 2 heures",
    isRead: false,
    type: "warning"
  },
  {
    id: "notif3",
    message: "Document validé : Attestation de domicile",
    time: "Il y a 5 heures",
    isRead: true,
    type: "success"
  },
  {
    id: "notif4",
    message: "Échec de l'envoi de la relance automatique",
    time: "Hier",
    isRead: true,
    type: "error"
  }
];

// Données mockées pour le graphique d'activité
export const mockActivityData: ActivityData[] = [
  { label: "Documents reçus", value: 84, color: "bg-blue-500" },
  { label: "Documents validés", value: 67, color: "bg-green-500" },
  { label: "Documents en attente", value: 23, color: "bg-yellow-500" },
  { label: "Documents rejetés", value: 12, color: "bg-red-500" }
];

// Données mockées pour les statistiques
export const mockStats = (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
  </svg>
) => [
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
