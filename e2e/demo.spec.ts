import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois les donateurs à réactiver", async () => {
    await expect(page.getByRole("heading", { name: "Donateurs à réactiver" })).toBeVisible();
    await expect(page.getByText("Claire Beaumont")).toBeVisible();
    await expect(page.getByText("Cycle en cours")).toBeVisible();
  });
});
