import type { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: "Admin | Angolo della",
};

export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-[#050508] text-white antialiased">{children}</body>
    </html>
  );
}
