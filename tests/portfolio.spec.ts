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

test("intro masks the homepage before the book opens", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".welcome-shell")).toBeVisible();
  await expect(page.locator(".welcome-book")).toBeVisible();
  await expect(page.locator(".hero")).toHaveCSS("visibility", "hidden");
});

test("Vietnamese footer title renders without clipping", async ({ page }) => {
  await openHome(page);
  await page.locator("#lien-he").scrollIntoViewIfNeeded();
  const title = page.locator(".footer-message h2");
  await expect(title).toContainText("Tớ sẽ rất vui nếu có thể");
  await expect(title).toContainText("được đồng hành cùng cậu.");
  const metrics = await title.evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
    clientHeight: element.clientHeight,
    scrollHeight: element.scrollHeight,
  }));
  expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  expect(metrics.scrollHeight).toBeLessThanOrEqual(metrics.clientHeight + 1);
});
