import { test, expect } from "@playwright/test";

test.describe("Модальное окно добавления пользователя", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173/");
    await page.getByRole("button", { name: /добавить/i }).click();
    await expect(page.locator(".modal__container")).toBeVisible();
  });

  test("показывает ошибки при пустых полях", async ({ page }) => {
    await page.getByTestId("add-new-user").click();

    const errors = page.locator(".modal__error");
    await expect(errors).toHaveCount(5);
  });

  test("проверяем что если ошибка появилась и далее ввести значение - ошибка пропадает", async ({
    page,
  }) => {
    await page.getByTestId("add-new-user").click();

    const errors = page.locator(".modal__error");
    await expect(errors).toHaveCount(5);

    await page.getByPlaceholder("name").fill("Иван");
    await expect(errors).toHaveCount(4);

    await page.getByPlaceholder("age").fill("23");
    await expect(errors).toHaveCount(3);

    await page.getByPlaceholder("city").fill("Moscow");
    await expect(errors).toHaveCount(2);

    await page.getByPlaceholder("position").fill("Frontend");
    await expect(errors).toHaveCount(1);

    await page.getByPlaceholder("salary").fill("22000");
    await expect(errors).toHaveCount(0);
  });

  test('кнопка "Отмена" закрывает модалку и сбрасывает форму', async ({
    page,
  }) => {
    await page.getByTestId("cancel-form").click();
    await expect(page.locator(".modal__container")).toBeHidden();
  });

  test("отправляет форму и добавляет пользователя", async ({ page }) => {
    await page.route("**/users", async (route) => {
      const request = await route.request().postDataJSON();
      const mockResponse = { id: 999, ...request };
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(mockResponse),
      });
    });

    await page.getByPlaceholder("name").fill("Тест");
    await page.getByPlaceholder("age").fill("30");
    await page.getByPlaceholder("city").fill("Москва");
    await page.getByPlaceholder("position").fill("Аналитик");
    await page.getByPlaceholder("salary").fill("60000");

    const submitButton = page.getByTestId("add-new-user");
    await submitButton.click();

    await expect(submitButton).toBeDisabled();
    await expect(submitButton).toHaveText('Отправляю...');

    await expect(page.getByText("Тест")).toBeVisible();
  });
});
