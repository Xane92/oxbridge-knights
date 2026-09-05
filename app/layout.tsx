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

export const metadata: Metadata = {
  title: "Oxbridge Knights",
  description: "Old name. New rules.",
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
