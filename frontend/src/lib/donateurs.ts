export type StatutDonateur =
  | { type: "inactif"; moisInactivite: number }
  | { type: "enCours"; jour: number };

export type Historique = {
  nombreDons: number;
  donMoyen: number;
  premierDon: string;
};

export type Donateur = {
  id: string;
  nom: string;
  initiales: string;
  dernierDon: string;
  source: string;
  raison: string;
  statut: StatutDonateur;
  historique: Historique;
};

export const SEUIL_MOIS_INACTIVITE = 13;

// Données en dur (itération 1), reprises du prototype retenu (screen-1).
export const donateurs: Donateur[] = [
  {
    id: "claire-beaumont",
    nom: "Claire Beaumont",
    initiales: "CB",
    dernierDon: "sept. 2023",
    source: "ESC Saint-Cloud",
    raison: "Participation à la course ESC en tant que coureuse",
    statut: { type: "inactif", moisInactivite: 26 },
    historique: { nombreDons: 3, donMoyen: 25, premierDon: "sept. 2021" },
  },
  {
    id: "thomas-lefevre",
    nom: "Thomas Lefèvre",
    initiales: "TL",
    dernierDon: "oct. 2023",
    source: "Campagne fin d'année",
    raison: "Sollicitation campagne de fin d'année (CFA)",
    statut: { type: "inactif", moisInactivite: 25 },
    historique: { nombreDons: 2, donMoyen: 40, premierDon: "oct. 2023" },
  },
  {
    id: "marie-rousseau",
    nom: "Marie Rousseau",
    initiales: "MR",
    dernierDon: "août 2024",
    source: "Rallye du Cœur Lyon",
    raison: "Proche impliqué dans le Rallye du Cœur",
    statut: { type: "enCours", jour: 5 },
    historique: { nombreDons: 5, donMoyen: 30, premierDon: "mars 2022" },
  },
  {
    id: "philippe-dupont",
    nom: "Philippe Dupont",
    initiales: "PD",
    dernierDon: "juil. 2024",
    source: "Don en ligne direct",
    raison: "Don spontané suite à Septembre en or",
    statut: { type: "inactif", moisInactivite: 18 },
    historique: { nombreDons: 1, donMoyen: 50, premierDon: "juil. 2024" },
  },
];

export function estEligibleReactivation(statut: StatutDonateur): boolean {
  return statut.type === "inactif" && statut.moisInactivite >= SEUIL_MOIS_INACTIVITE;
}

export function libelleStatut(statut: StatutDonateur): string {
  if (statut.type === "enCours") {
    return `Cycle en cours — J+${statut.jour}`;
  }
  return `${statut.moisInactivite} mois d'inactivité`;
}

export function trouverDonateur(id: string): Donateur | undefined {
  return donateurs.find((donateur) => donateur.id === id);
}

export function montantCumule(historique: Historique): number {
  return historique.nombreDons * historique.donMoyen;
}
