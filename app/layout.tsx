import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter, Karla } from "next/font/google";
import Script from "next/script";
import ErudaProvider from "./ErudaProvider";
import "./globals.css";
import { Providers } from "./providers";
import {
  AnalyticsProviders,
  RouteViewTracker,
} from "lib/analytics";

const inter = Inter({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-inter",
});

const karla = Karla({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "block",
  variable: "--font-karla",
});

export const metadata: Metadata = {
  title: "JuridIA",
  icons: {
    icon: "/icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <Script id="clarity-script" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "we58h01nu1");`}
        </Script>
        <GoogleAnalytics gaId={"G-3M6YVH47ED"} />
        {/* Tracking próprio do Hub (o MESMO da LP da VSL): identidade
            visitor/sessão, UTM, pageview, scroll, vídeos e cliques em
            [data-lp-cta] — tudo aparece na seção LPs do admin como
            "Site Institucional JuridIA". A chave nasce em /lp/paginas. */}
        <Script
          id="jlp-snippet"
          strategy="afterInteractive"
          src="https://hub.juridia.com.br/j.js"
          data-lp="institucional"
          data-key="pk_lp_institucional_8fb70d6d4c88"
        />
      </head>
      <body
        className={`${karla.variable} ${inter.variable} bg-n-1 dark:bg-n-6 font-sans text-[1rem] leading-6 -tracking-[.01em] text-n-7 antialiased md:bg-n-1 dark:text-n-1 dark:md:bg-primary-100`}
      >
        <ErudaProvider />
        <RouteViewTracker />
        <Providers>{children}</Providers>
        <AnalyticsProviders />
      </body>
    </html>
  );
}
