import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AMIR — Video · Photo · Edit",
  description: "Портфолио Амира — видео, фотография и монтаж.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
