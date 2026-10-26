import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FB Video Helper",
  description: "Preview Facebook videos and download direct video files you are authorized to save."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
