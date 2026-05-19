import { promises as fs } from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

export interface Project {
  id: string;
  title: { ar: string; de: string };
  description: { ar: string; de: string };
  category: string;
  image: string;
  featured: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  title: { ar: string; de: string };
  description: { ar: string; de: string };
  icon: string;
  order: number;
}

export interface GalleryItem {
  id: string;
  title: { ar: string; de: string };
  image: string;
  category: string;
  createdAt: string;
}

export interface SiteSettings {
  siteName: { ar: string; de: string };
  tagline: { ar: string; de: string };
  email: string;
  phone: string;
  address: { ar: string; de: string };
  heroVideo?: string;
}

type Collection = "projects" | "services" | "gallery";

const DATA_DIR = path.join(process.cwd(), "data");

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson<T>(file: string, fallback: T): Promise<T> {
  await ensureDataDir();
  const filePath = path.join(DATA_DIR, file);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 2), "utf-8");
    return fallback;
  }
}

async function writeJson<T>(file: string, data: T): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(path.join(DATA_DIR, file), JSON.stringify(data, null, 2), "utf-8");
}

export async function getProjects(): Promise<Project[]> {
  return readJson<Project[]>("projects.json", []);
}

export async function getProject(id: string): Promise<Project | undefined> {
  const items = await getProjects();
  return items.find((p) => p.id === id);
}

export async function createProject(
  data: Omit<Project, "id" | "createdAt">
): Promise<Project> {
  const items = await getProjects();
  const project: Project = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  items.unshift(project);
  await writeJson("projects.json", items);
  return project;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<Project, "id" | "createdAt">>
): Promise<Project | null> {
  const items = await getProjects();
  const index = items.findIndex((p) => p.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...data };
  await writeJson("projects.json", items);
  return items[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const items = await getProjects();
  const filtered = items.filter((p) => p.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson("projects.json", filtered);
  return true;
}

export async function getServices(): Promise<Service[]> {
  return readJson<Service[]>("services.json", []);
}

export async function createService(
  data: Omit<Service, "id">
): Promise<Service> {
  const items = await getServices();
  const service: Service = { ...data, id: uuidv4() };
  items.push(service);
  items.sort((a, b) => a.order - b.order);
  await writeJson("services.json", items);
  return service;
}

export async function updateService(
  id: string,
  data: Partial<Omit<Service, "id">>
): Promise<Service | null> {
  const items = await getServices();
  const index = items.findIndex((s) => s.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...data };
  await writeJson("services.json", items);
  return items[index];
}

export async function deleteService(id: string): Promise<boolean> {
  const items = await getServices();
  const filtered = items.filter((s) => s.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson("services.json", filtered);
  return true;
}

export async function getGallery(): Promise<GalleryItem[]> {
  return readJson<GalleryItem[]>("gallery.json", []);
}

export async function createGalleryItem(
  data: Omit<GalleryItem, "id" | "createdAt">
): Promise<GalleryItem> {
  const items = await getGallery();
  const item: GalleryItem = {
    ...data,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  await writeJson("gallery.json", items);
  return item;
}

export async function updateGalleryItem(
  id: string,
  data: Partial<Omit<GalleryItem, "id" | "createdAt">>
): Promise<GalleryItem | null> {
  const items = await getGallery();
  const index = items.findIndex((g) => g.id === id);
  if (index === -1) return null;
  items[index] = { ...items[index], ...data };
  await writeJson("gallery.json", items);
  return items[index];
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const items = await getGallery();
  const filtered = items.filter((g) => g.id !== id);
  if (filtered.length === items.length) return false;
  await writeJson("gallery.json", filtered);
  return true;
}

export async function getSettings(): Promise<SiteSettings> {
  return readJson<SiteSettings>("settings.json", {
    siteName: { ar: "زاوية الذوق", de: "Angolo della" },
    tagline: {
      ar: "تجارب بصرية سينمائية فاخرة",
      de: "Premium cinematic visual experiences",
    },
    email: "hello@angolodella.com",
    phone: "+49 123 456 789",
    address: {
      ar: "برلين، ألمانيا",
      de: "Berlin, Deutschland",
    },
  });
}

export async function updateSettings(
  data: Partial<SiteSettings>
): Promise<SiteSettings> {
  const current = await getSettings();
  const updated = { ...current, ...data };
  await writeJson("settings.json", updated);
  return updated;
}

export type { Collection };
