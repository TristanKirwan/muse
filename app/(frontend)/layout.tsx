import type { Metadata } from "next";
import localFont from "next/font/local";

import "./global.css";

const interVariable = localFont({
  display: "swap",
  src: [
    {
      path: "../../public/fonts/InterVariable-Italic.woff2",
      style: "italic",
    },
    {
      path: "../../public/fonts/InterVariable.woff2",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "Muse",
  description: "Your inspiration in 1 spot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${interVariable.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
