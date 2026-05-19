import { getGallery, getProjects, getServices } from "@/lib/data-store";
import { seedDatabase } from "@/lib/seed";
import Link from "next/link";
import { FiFolder, FiLayers, FiImage, FiArrowRight } from "react-icons/fi";

export default async function AdminDashboardPage() {
  await seedDatabase();
  const [projects, services, gallery] = await Promise.all([
    getProjects(),
    getServices(),
    getGallery(),
  ]);

  const stats = [
    { label: "Projects", count: projects.length, href: "/admin/projects", icon: FiFolder },
    { label: "Services", count: services.length, href: "/admin/services", icon: FiLayers },
    { label: "Gallery", count: gallery.length, href: "/admin/media", icon: FiImage },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-zinc-500">Manage your cinematic website content</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {stats.map(({ label, count, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-2xl border border-white/10 bg-white/5 p-6 transition-all hover:border-violet-500/30 hover:bg-violet-500/5"
          >
            <Icon className="text-violet-400" size={24} />
            <p className="mt-4 text-3xl font-semibold">{count}</p>
            <p className="text-sm text-zinc-500">{label}</p>
            <span className="mt-4 flex items-center gap-1 text-xs text-violet-400 opacity-0 transition-opacity group-hover:opacity-100">
              Manage <FiArrowRight size={12} />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="font-medium">Quick Links</h2>
        <ul className="mt-4 space-y-2 text-sm text-zinc-400">
          <li>
            <Link href="/ar" className="hover:text-violet-400" target="_blank">
              View Arabic site →
            </Link>
          </li>
          <li>
            <Link href="/de" className="hover:text-violet-400" target="_blank">
              View German site →
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
