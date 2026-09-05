import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const switzer = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "./fonts/Switzer-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Switzer-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Switzer-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Switzer-700.woff2", weight: "700", style: "normal" },
  ],
});

const SITE_URL = "https://oxbridgeknights.com";
const TITLE = "Oxbridge Knights · Architecture, Real Estate & Construction";
const DESCRIPTION =
  "Oxbridge Knights designs, develops and builds across Lagos and London: " +
  "architecture, real estate and construction under one roof. Old name. New rules.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Oxbridge Knights",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_GB",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "An Oxbridge Knights residential tower lit at dusk.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${switzer.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Runs before hydration: marks the document when the loader has
            already played this session, so CSS can suppress the panel before
            the first paint. Only ever sets a data attribute, so React has
            nothing to disagree with. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem(\"ok:loader-seen\")===\"1\")" +
              "document.documentElement.setAttribute(\"data-ok-loaded\",\"1\")}catch(e){}",
          }}
        />
        <Loader />
        <SmoothScroll />
        <Cursor />
        <Nav />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
