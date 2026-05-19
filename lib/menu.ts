import "server-only";
import { promises as fs } from "fs";
import path from "path";
import type { MenuCategory, MenuItem } from "./menu-types";

export type { MenuCategory, MenuItem, LocalizedText } from "./menu-types";
export { t, formatPrice } from "./menu-utils";

const dataDir = path.join(process.cwd(), "data");

export async function getMenuCategories(): Promise<MenuCategory[]> {
  const raw = await fs.readFile(path.join(dataDir, "menu-categories.json"), "utf-8");
  const categories = JSON.parse(raw) as MenuCategory[];
  return categories.sort((a, b) => a.order - b.order);
}

export async function getMenuItems(): Promise<MenuItem[]> {
  const raw = await fs.readFile(path.join(dataDir, "menu-items.json"), "utf-8");
  const items = JSON.parse(raw) as MenuItem[];
  return items.sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug: string): Promise<MenuCategory | undefined> {
  const categories = await getMenuCategories();
  return categories.find((c) => c.slug === slug);
}

export async function getItemsByCategory(categoryId: string): Promise<MenuItem[]> {
  const items = await getMenuItems();
  return items.filter((i) => i.categoryId === categoryId);
}
