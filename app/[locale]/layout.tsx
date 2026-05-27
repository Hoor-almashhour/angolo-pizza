import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";

import { notFound } from "next/navigation";
import { Inter, IBM_Plex_Sans_Arabic } from "next/font/google";

import { routing, type Locale } from "@/lib/i18n/routing";
import { JsonLd } from "@/components/seo/JsonLd";
import { LocalePersistence } from "@/components/layout/LocalePersistence";
import { RestaurantShell } from "@/components/restaurant/RestaurantShell";
import { SITE_URL } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

type Props = {
  children: React.ReactNode;

  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const t = await getTranslations({
    locale,
    namespace: "meta",
  });

  const altLocale = locale === "ar" ? "de" : "ar";

  return {
    title: t("title"),

    description: t("description"),

    metadataBase: new URL(SITE_URL),

    alternates: {
      canonical: `/${locale}`,

      languages: {
        ar: "/ar",
        de: "/de",
        "x-default": "/ar",
      },
    },

    openGraph: {
      title: t("title"),

      description: t("description"),

      locale: locale === "ar" ? "ar_EG" : "de_DE",

      alternateLocale:
        altLocale === "ar"
          ? "ar_EG"
          : "de_DE",

      type: "website",

      url: `${SITE_URL}/${locale}`,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const t = await getTranslations({
    locale,
    namespace: "meta",
  });

  const dir =
    locale === "ar"
      ? "rtl"
      : "ltr";

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${ibmArabic.variable} h-full`}
    >
      <head>
        <link
          rel="alternate"
          hrefLang="ar"
          href={`${SITE_URL}/ar`}
        />

        <link
          rel="alternate"
          hrefLang="de"
          href={`${SITE_URL}/de`}
        />

        <link
          rel="alternate"
          hrefLang="x-default"
          href={`${SITE_URL}/ar`}
        />
      </head>

      <body className="min-h-full bg-black text-white antialiased">
        <JsonLd
          locale={locale}
          description={t("description")}
        />

        <NextIntlClientProvider messages={messages}>
          <LocalePersistence />

          <RestaurantShell>
            {children}
          </RestaurantShell>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}