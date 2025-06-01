import { test, expect } from "@playwright/test";

test.describe("TableContainer: бесконечная прокрутка", () => {
  test.beforeEach(async ({ page }) => {
    await page.route("**/users?_page=1&_limit=20**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(
          Array.from({ length: 20 }, (_, i) => ({
            id: i + 1,
            name: `Пользователь ${i + 1}`,
            age: 25,
            city: "Город",
            position: "Должность",
            salary: 30000,
          }))
        ),
      });
    });

    await page.route("**/users?_page=2&_limit=20**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([
          {
            id: 21,
            name: "Пользователь 21",
            age: 30,
            city: "Город 2",
            position: "Инженер",
            salary: 40000,
          },
        ]),
      });
    });

    await page.goto("http://localhost:5173/");
  });

  test("отображает первую страницу и подгружает вторую при скролле", async ({
    page,
  }) => {
    await expect(
      page.getByText("Пользователь 1", { exact: true })
    ).toBeVisible();

    await expect(
      page.getByText("Пользователь 20", { exact: true })
    ).toBeVisible();

    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    const inifinitScroll = page.getByTestId("infinite-block");

    await expect(inifinitScroll).toBeVisible();

    await expect(page.getByText("Пользователь 21")).toBeVisible();

    await expect(inifinitScroll).toHaveText("Данных больше нет");
  });
});
