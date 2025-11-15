import "./globals.css";
import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SAP Fiori Tile Assignment Guide",
  description: "Step-by-step SAP HANA tutorial showing how to create a Fiori launchpad tile and link it to a transaction code."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
