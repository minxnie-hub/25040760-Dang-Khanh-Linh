import { expect, test } from "@playwright/test";

async function openHome(page: import("@playwright/test").Page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const introButton = page.getByRole("button", { name: "Mở cuốn sổ" });
  if (await introButton.isVisible().catch(() => false)) await introButton.click();
  await expect(page.getByRole("heading", { name: "Đặng Khánh Linh" })).toBeVisible();
  await page.waitForTimeout(300);
}

test("homepage has no horizontal overflow", async ({ page }) => {
  await openHome(page);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test("six constellation chapters are available", async ({ page }) => {
  await openHome(page);
  await page.locator("#muc-luc").scrollIntoViewIfNeeded();
  await expect(page.locator(".constellation-node, .constellation-mobile-list a")).toHaveCount(12);
  await expect(page.locator("strong:visible").filter({ hasText: "Sử dụng AI có trách nhiệm trong học tập và nghiên cứu" })).toHaveCount(1);
});

test("assignment preserves document and table rendering", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/bai-2/");
  await expect(page.getByRole("heading", { name: "Tìm kiếm và đánh giá thông tin học thuật" })).toBeVisible();
  await expect(page.locator(".paper-sheet table")).toHaveCount(1);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
