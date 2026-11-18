import { describe, expect, it } from "vitest";
import {
  ENVOIS_MAX_CYCLE,
  OBJECTIF_ENVOIS_SIX_SEMAINES,
  donateurs,
  estEligibleReactivation,
  libelleStatut,
  mentionEvenementielle,
  messageInvitation,
  montantCumule,
  nombrePages,
  paginer,
  phrasesImpact,
  trouverDonateur,
} from "./donateurs";

describe("estEligibleReactivation", () => {
  it("est éligible seulement si inactif depuis au moins 13 mois", () => {
    expect(estEligibleReactivation({ type: "inactif", moisInactivite: 13 })).toBe(true);
    expect(estEligibleReactivation({ type: "inactif", moisInactivite: 12 })).toBe(false);
  });

  it("n'est jamais éligible si un cycle est déjà en cours", () => {
    expect(estEligibleReactivation({ type: "enCours", jour: 5 })).toBe(false);
  });
});

describe("libelleStatut", () => {
  it("affiche la durée d'inactivité ou l'avancement du cycle en cours", () => {
    expect(libelleStatut({ type: "inactif", moisInactivite: 26 })).toBe("26 mois d'inactivité");
    expect(libelleStatut({ type: "enCours", jour: 5 })).toBe("Cycle en cours — J+5");
  });
});

describe("trouverDonateur", () => {
  it("retrouve un donateur par son identifiant, ou rien si inconnu", () => {
    expect(trouverDonateur("claire-beaumont")?.nom).toBe("Claire Beaumont");
    expect(trouverDonateur("inconnu")).toBeUndefined();
  });
});

describe("montantCumule", () => {
  it("multiplie le nombre de dons par le don moyen", () => {
    expect(montantCumule({ nombreDons: 3, donMoyen: 25, premierDon: "sept. 2021" })).toBe(75);
  });
});

const claire = trouverDonateur("claire-beaumont")!;
const thomas = trouverDonateur("thomas-lefevre")!;

describe("mentionEvenementielle", () => {
  it("n'apparaît que pour un donateur habitué des événements", () => {
    expect(mentionEvenementielle(claire)).not.toBeNull();
    expect(mentionEvenementielle(thomas)).toBeNull();
  });
});

describe("messageInvitation", () => {
  it("porte la mention événementielle seulement si le donateur est habitué", () => {
    expect(messageInvitation(claire)).toContain("prochain événement");
    expect(messageInvitation(thomas)).not.toContain("prochain événement");
  });
});

describe("phrasesImpact", () => {
  it("mentionne le montant cumulé du donateur", () => {
    expect(phrasesImpact(claire)[0]).toContain("75 €");
  });
});

describe("ENVOIS_MAX_CYCLE", () => {
  it("reste bien en dessous de l'objectif de 6 semaines (H1)", () => {
    expect(ENVOIS_MAX_CYCLE).toBeLessThan(OBJECTIF_ENVOIS_SIX_SEMAINES);
  });
});

describe("paginer", () => {
  it("découpe en pages de la taille demandée, la dernière pouvant être incomplète", () => {
    expect(paginer(donateurs, 1, 10)).toHaveLength(10);
    expect(paginer(donateurs, 2, 10)).toHaveLength(donateurs.length - 10);
  });
});

describe("nombrePages", () => {
  it("arrondit au nombre de pages supérieur", () => {
    expect(nombrePages(15, 10)).toBe(2);
    expect(nombrePages(20, 10)).toBe(2);
  });
});
