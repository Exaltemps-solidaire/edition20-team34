export type StatutDonateur =
  | { type: "inactif"; moisInactivite: number }
  | { type: "enCours"; jour: number };

export type Donateur = {
  id: string;
  nom: string;
  initiales: string;
  dernierDon: string;
  source: string;
  raison: string;
  statut: StatutDonateur;
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
  },
  {
    id: "thomas-lefevre",
    nom: "Thomas Lefèvre",
    initiales: "TL",
    dernierDon: "oct. 2023",
    source: "Campagne fin d'année",
    raison: "Sollicitation campagne de fin d'année (CFA)",
    statut: { type: "inactif", moisInactivite: 25 },
  },
  {
    id: "marie-rousseau",
    nom: "Marie Rousseau",
    initiales: "MR",
    dernierDon: "août 2024",
    source: "Rallye du Cœur Lyon",
    raison: "Proche impliqué dans le Rallye du Cœur",
    statut: { type: "enCours", jour: 5 },
  },
  {
    id: "philippe-dupont",
    nom: "Philippe Dupont",
    initiales: "PD",
    dernierDon: "juil. 2024",
    source: "Don en ligne direct",
    raison: "Don spontané suite à Septembre en or",
    statut: { type: "inactif", moisInactivite: 18 },
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
