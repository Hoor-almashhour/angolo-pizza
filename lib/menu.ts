import "server-only";
import { MENU_CATEGORIES, MENU_ITEMS } from "./menu-data";

export type LocalizedText = { ar: string; de: string };

export interface MenuCategory {
  id: string;
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  order: number;
}

export interface MenuItem {
  id: string;
  categoryId: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  image: string;
  featured: boolean;
  order: number;
}

export { t, formatPrice } from "./menu-utils";

export async function getMenuCategories(): Promise<MenuCategory[]> {
  return [...MENU_CATEGORIES].sort((a, b) => a.order - b.order);
}

export async function getMenuItems(): Promise<MenuItem[]> {
  return [...MENU_ITEMS].sort((a, b) => a.order - b.order);
}

export async function getCategoryBySlug(slug: string): Promise<MenuCategory | undefined> {
  return MENU_CATEGORIES.find((c) => c.slug === slug);
}

export async function getItemsByCategory(categoryId: string): Promise<MenuItem[]> {
  return MENU_ITEMS.filter((i) => i.categoryId === categoryId);
}