export interface LocalizedText {
  ar: string;
  de: string;
}

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
