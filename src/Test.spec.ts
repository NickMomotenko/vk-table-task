import { test, expect } from "@playwright/test";

test("модалка работает", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("Добавить")).toBeVisible();
});
