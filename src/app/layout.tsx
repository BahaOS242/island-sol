import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SiteSettingsProvider } from "@/lib/site-settings-context";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { SITE_URL, organizationJsonLd } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | ${settings.businessName}`,
    },
    description: settings.defaultSeoDescription,
    openGraph: {
      siteName: settings.businessName,
      type: "website",
      ...(settings.defaultOgImage ? { images: [settings.defaultOgImage] } : {}),
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream-50 text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(settings)) }}
        />
        <SiteSettingsProvider settings={settings}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SiteSettingsProvider>
      </body>
    </html>
  );
}
