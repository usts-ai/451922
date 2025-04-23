export interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  statut: 'Actif' | 'En attente' | 'Inactif';
  dateCreation: string;
  documentsManquants: number;
  documentsTotal: number;
}

export interface Document {
  id: string;
  nom: string;
  clientId: string;
  clientNom: string;
  type: string;
  statut: 'Validé' | 'En attente' | 'Rejeté' | 'En cours d\'analyse';
  dateDepot: string;
  dateExpiration?: string;
  priorite: 'Haute' | 'Moyenne' | 'Basse';
}

export interface Notification {
  id: string;
  message: string;
  date: string;
  lue: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}
