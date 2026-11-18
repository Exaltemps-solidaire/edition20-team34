import { describe, expect, it } from "vitest";
import {
  estEligibleReactivation,
  libelleStatut,
  mentionEvenementielle,
  messageInvitation,
  montantCumule,
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
