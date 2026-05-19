import {
  createGalleryItem,
  createProject,
  createService,
  getGallery,
  getProjects,
  getServices,
} from "./data-store";

export async function seedDatabase() {
  const [projects, services, gallery] = await Promise.all([
    getProjects(),
    getServices(),
    getGallery(),
  ]);

  if (projects.length === 0) {
    await Promise.all([
      createProject({
        title: { ar: "هوية بصرية فاخرة", de: "Luxury Brand Identity" },
        description: {
          ar: "تصميم هوية متكاملة لعلامة تجارية راقية",
          de: "Complete visual identity for a premium brand",
        },
        category: "branding",
        image: "https://picsum.photos/seed/proj1/800/600",
        featured: true,
      }),
      createProject({
        title: { ar: "تجربة ويب سينمائية", de: "Cinematic Web Experience" },
        description: {
          ar: "موقع تفاعلي بمستوى جوائز التصميم",
          de: "Award-level interactive website",
        },
        category: "web",
        image: "https://picsum.photos/seed/proj2/800/600",
        featured: true,
      }),
      createProject({
        title: { ar: "حملة إعلانية", de: "Advertising Campaign" },
        description: {
          ar: "إنتاج مرئي متكامل للعلامة",
          de: "Full visual production for the brand",
        },
        category: "campaign",
        image: "https://picsum.photos/seed/proj3/800/600",
        featured: false,
      }),
    ]);
  }

  if (services.length === 0) {
    await Promise.all([
      createService({
        title: { ar: "التصميم البصري", de: "Visual Design" },
        description: {
          ar: "هويات بصرية وتجارب علامات فاخرة",
          de: "Brand identities and premium experiences",
        },
        icon: "FiPenTool",
        order: 1,
      }),
      createService({
        title: { ar: "تطوير الويب", de: "Web Development" },
        description: {
          ar: "مواقع عالية الأداء بتجربة سينمائية",
          de: "High-performance cinematic websites",
        },
        icon: "FiCode",
        order: 2,
      }),
      createService({
        title: { ar: "الإنتاج المرئي", de: "Visual Production" },
        description: {
          ar: "فيديو، موشن، ومحتوى تفاعلي",
          de: "Video, motion, and interactive content",
        },
        icon: "FiFilm",
        order: 3,
      }),
      createService({
        title: { ar: "استراتيجية رقمية", de: "Digital Strategy" },
        description: {
          ar: "تخطيط وتجربة مستخدم متقدمة",
          de: "Advanced UX planning and strategy",
        },
        icon: "FiTrendingUp",
        order: 4,
      }),
    ]);
  }

  if (gallery.length === 0) {
    for (let i = 1; i <= 6; i++) {
      await createGalleryItem({
        title: { ar: `عمل فني ${i}`, de: `Artwork ${i}` },
        image: `https://picsum.photos/seed/gal${i}/600/${400 + i * 50}`,
        category: i % 2 === 0 ? "studio" : "events",
      });
    }
  }
}
