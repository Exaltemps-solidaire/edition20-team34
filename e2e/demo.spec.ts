import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois les donateurs à réactiver", async () => {
    await expect(page.getByRole("heading", { name: "Donateurs inactifs" })).toBeVisible();
    await expect(page.getByText("Claire Beaumont")).toBeVisible();
    await expect(page.getByText("Cycle en cours")).toBeVisible();
  });

  await test.step("Je navigue entre les pages de la liste", async () => {
    await page.getByRole("button", { name: "2", exact: true }).click();
    await expect(page.getByText("Claire Beaumont")).not.toBeVisible();
    await page.getByRole("button", { name: "1", exact: true }).click();
    await expect(page.getByText("Claire Beaumont")).toBeVisible();
  });

  await test.step("Je consulte la vue 360 d'un donateur", async () => {
    await page.getByText("Claire Beaumont").click();
    await expect(page.getByRole("heading", { name: "Claire Beaumont", exact: true })).toBeVisible();
    await expect(page.getByText("Montant cumulé")).toBeVisible();
  });

  await test.step("Je prépare le cycle de réactivation", async () => {
    await page.getByText("Préparer le cycle de réactivation").click();
    await expect(page.getByRole("heading", { name: "2 contacts maximum" })).toBeVisible();
    await expect(page.getByText("Fin du cycle — arrêt complet")).toBeVisible();
    await page.getByText("Valider et lancer le cycle").click();
    await expect(page.getByRole("heading", { name: "Cycle lancé avec succès" })).toBeVisible();
    await expect(page.getByText("Hypothèses vérifiables")).toBeVisible();
    await expect(page.getByText("Outils consultés")).toBeVisible();
    await page.getByText("Retour à la liste").click();
    await expect(page.getByRole("heading", { name: "Donateurs inactifs" })).toBeVisible();
  });
});
