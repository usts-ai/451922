import { Client, Document, Notification } from '../types';

export const clients: Client[] = [
  {
    id: '1',
    nom: 'AXA Assurances',
    email: 'contact@axa.fr',
    telephone: '01 45 67 89 00',
    statut: 'Actif',
    dateCreation: '15/01/2025',
    documentsManquants: 2,
    documentsTotal: 12
  },
  {
    id: '2',
    nom: 'Allianz France',
    email: 'service@allianz.fr',
    telephone: '01 43 98 76 54',
    statut: 'Actif',
    dateCreation: '03/02/2025',
    documentsManquants: 0,
    documentsTotal: 8
  },
  {
    id: '3',
    nom: 'Groupama Assurances',
    email: 'support@groupama.fr',
    telephone: '01 56 77 88 99',
    statut: 'En attente',
    dateCreation: '27/02/2025',
    documentsManquants: 5,
    documentsTotal: 10
  },
  {
    id: '4',
    nom: 'MAIF Assurances',
    email: 'relations@maif.fr',
    telephone: '01 42 91 87 65',
    statut: 'Actif',
    dateCreation: '12/03/2025',
    documentsManquants: 1,
    documentsTotal: 15
  },
  {
    id: '5',
    nom: 'MMA Assurances',
    email: 'info@mma.fr',
    telephone: '01 44 55 66 77',
    statut: 'Inactif',
    dateCreation: '05/01/2025',
    documentsManquants: 7,
    documentsTotal: 7
  }
];

export const documents: Document[] = [
  {
    id: '101',
    nom: 'Contrat responsabilité civile',
    clientId: '1',
    clientNom: 'AXA Assurances',
    type: 'Contrat',
    statut: 'Validé',
    dateDepot: '16/01/2025',
    dateExpiration: '16/01/2026',
    priorite: 'Haute'
  },
  {
    id: '102',
    nom: 'Attestation de formation',
    clientId: '1',
    clientNom: 'AXA Assurances',
    type: 'Attestation',
    statut: 'En attente',
    dateDepot: '18/01/2025',
    priorite: 'Moyenne'
  },
  {
    id: '103',
    nom: 'Justificatif de conformité',
    clientId: '2',
    clientNom: 'Allianz France',
    type: 'Justificatif',
    statut: 'Validé',
    dateDepot: '04/02/2025',
    dateExpiration: '04/02/2026',
    priorite: 'Haute'
  },
  {
    id: '104',
    nom: 'Rapport d\'audit annuel',
    clientId: '2',
    clientNom: 'Allianz France',
    type: 'Rapport',
    statut: 'Validé',
    dateDepot: '05/02/2025',
    priorite: 'Haute'
  },
  {
    id: '105',
    nom: 'Demande d\'agrément',
    clientId: '3',
    clientNom: 'Groupama Assurances',
    type: 'Demande',
    statut: 'En cours d\'analyse',
    dateDepot: '28/02/2025',
    priorite: 'Haute'
  },
  {
    id: '106',
    nom: 'Contrat d\'assurance habitation',
    clientId: '4',
    clientNom: 'MAIF Assurances',
    type: 'Contrat',
    statut: 'Validé',
    dateDepot: '13/03/2025',
    dateExpiration: '13/03/2026',
    priorite: 'Moyenne'
  },
  {
    id: '107',
    nom: 'Attestation de sinistre',
    clientId: '4',
    clientNom: 'MAIF Assurances',
    type: 'Attestation',
    statut: 'Rejeté',
    dateDepot: '14/03/2025',
    priorite: 'Basse'
  },
  {
    id: '108',
    nom: 'Contrat de partenariat',
    clientId: '5',
    clientNom: 'MMA Assurances',
    type: 'Contrat',
    statut: 'En attente',
    dateDepot: '06/01/2025',
    priorite: 'Moyenne'
  }
];

export const notifications: Notification[] = [
  {
    id: '201',
    message: 'Nouveau document déposé par AXA Assurances',
    date: '18/01/2025 14:30',
    lue: false,
    type: 'info'
  },
  {
    id: '202',
    message: 'Relance automatique envoyée à Groupama Assurances',
    date: '05/03/2025 09:15',
    lue: true,
    type: 'warning'
  },
  {
    id: '203',
    message: 'Document validé pour Allianz France',
    date: '05/02/2025 16:45',
    lue: false,
    type: 'success'
  },
  {
    id: '204',
    message: 'Document rejeté pour MAIF Assurances',
    date: '14/03/2025 11:20',
    lue: false,
    type: 'error'
  },
  {
    id: '205',
    message: '5 documents en attente de validation',
    date: '23/04/2025 08:00',
    lue: true,
    type: 'info'
  }
];

export const donutChartData = {
  documentsParStatut: [
    { statut: 'Validés', nombre: 45, couleur: '#4CAF50' },
    { statut: 'En attente', nombre: 23, couleur: '#FF9800' },
    { statut: 'Rejetés', nombre: 7, couleur: '#F44336' },
    { statut: 'En analyse', nombre: 15, couleur: '#2196F3' }
  ],
  clientsParStatut: [
    { statut: 'Actifs', nombre: 18, couleur: '#4CAF50' },
    { statut: 'En attente', nombre: 5, couleur: '#FF9800' },
    { statut: 'Inactifs', nombre: 3, couleur: '#F44336' }
  ]
};

export const lineChartData = {
  documentsTraites: [
    { mois: 'Jan', nombre: 42 },
    { mois: 'Fév', nombre: 56 },
    { mois: 'Mars', nombre: 48 },
    { mois: 'Avr', nombre: 61 },
    { mois: 'Mai', nombre: 55 },
    { mois: 'Juin', nombre: 67 }
  ],
  delaisMoyens: [
    { mois: 'Jan', jours: 5.2 },
    { mois: 'Fév', jours: 4.8 },
    { mois: 'Mars', jours: 4.5 },
    { mois: 'Avr', jours: 4.3 },
    { mois: 'Mai', jours: 3.9 },
    { mois: 'Juin', jours: 3.7 }
  ]
};
