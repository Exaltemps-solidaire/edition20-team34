export type StatutDonateur =
  | { type: "inactif"; moisInactivite: number }
  | { type: "enCours"; jour: number };

export type Historique = {
  nombreDons: number;
  donMoyen: number;
  premierDon: string;
};

export type Evenement = {
  nom: string;
  date: string;
  origine: "IfM" | "Externe";
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
  habitueEvenements: boolean;
  profil: string[];
  evenements: Evenement[];
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
    habitueEvenements: true,
    profil: ["Course ESC", "Habituée événements IfM", "Don annuel"],
    evenements: [
      { nom: "ESC Saint-Cloud", date: "sept. 2021", origine: "IfM" },
      { nom: "ESC Saint-Cloud", date: "sept. 2022", origine: "IfM" },
      { nom: "ESC Saint-Cloud", date: "sept. 2023", origine: "IfM" },
      { nom: "Vente caritative Septembre en or", date: "sept. 2022", origine: "Externe" },
    ],
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
    habitueEvenements: false,
    profil: ["Campagne de fin d'année", "Don réactif"],
    evenements: [{ nom: "Campagne de fin d'année", date: "oct. 2023", origine: "IfM" }],
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
    habitueEvenements: true,
    profil: ["Rallye du Cœur", "Habituée événements IfM", "Don régulier"],
    evenements: [
      { nom: "Rallye du Cœur Lyon", date: "mars 2022", origine: "Externe" },
      { nom: "Rallye du Cœur Lyon", date: "août 2024", origine: "Externe" },
    ],
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
    habitueEvenements: false,
    profil: ["Don en ligne", "Don ponctuel"],
    evenements: [{ nom: "Campagne Septembre en or", date: "juil. 2024", origine: "Externe" }],
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

export function mentionEvenementielle(donateur: Donateur): string | null {
  if (!donateur.habitueEvenements) {
    return null;
  }
  return `Mention prochain ${donateur.source} — habitué·e événements`;
}

export function messageBilanImpact(donateur: Donateur): string {
  const raison = donateur.raison.charAt(0).toLowerCase() + donateur.raison.slice(1);
  return `${donateur.nom}, ${raison}. Vos ${donateur.historique.nombreDons} dons (${montantCumule(donateur.historique)} €) ont contribué à financer des projets de recherche en oncologie pédiatrique. Pas de demande aujourd'hui : juste vous dire que votre geste compte, encore aujourd'hui.`;
}

export function phrasesImpact(donateur: Donateur): string[] {
  const montant = montantCumule(donateur.historique);
  return [
    `Ses ${montant} € ont contribué au programme Fight Kids Cancer (essais cliniques européens).`,
    `En 2023, Imagine for Margo a financé 12 projets de recherche grâce à des donateurs comme ${donateur.nom}.`,
    `Les fonds récoltés ont soutenu 3 équipes de chercheurs en oncologie pédiatrique.`,
  ];
}

export function messageInvitation(donateur: Donateur): string {
  const base = `${donateur.nom}, si vous souhaitez continuer à soutenir la recherche contre les cancers des enfants, nous serions heureux de vous retrouver — comme vous le souhaitez.`;
  const mention = mentionEvenementielle(donateur);
  return mention ? `${base} Nous espérons vous revoir au prochain événement ${donateur.source}.` : base;
}
