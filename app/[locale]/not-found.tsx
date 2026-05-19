import { Link } from "@/lib/i18n/navigation";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-semibold text-gradient">404</h1>
      <p className="mt-4 text-muted">Page not found</p>
      <Link href="/" className="mt-8 text-accent-purple hover:underline">
        Go home
      </Link>
    </div>
  );
}
