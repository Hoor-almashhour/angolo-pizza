import { SITE_NAME, SITE_NAME_DE, SITE_URL } from "@/lib/constants";

interface JsonLdProps {
  locale: string;
  description: string;
}

export function JsonLd({ locale, description }: JsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: locale === "ar" ? SITE_NAME : SITE_NAME_DE,
    url: `${SITE_URL}/${locale}`,
    description,
    sameAs: [
      "https://instagram.com",
      "https://facebook.com",
      "https://linkedin.com",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
