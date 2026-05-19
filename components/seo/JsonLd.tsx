export function JsonLd({ locale, description }: JsonLdProps) {
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@type": "Restaurant",
      name: locale === "ar" ? "زاوية الذوق" : SITE_NAME,
      url: `${SITE_URL}/${locale}`,
      description,
    }
}