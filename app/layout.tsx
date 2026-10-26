import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FB Video Helper",
  description: "A simple, mobile-friendly video link helper for videos you own or are allowed to download."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
