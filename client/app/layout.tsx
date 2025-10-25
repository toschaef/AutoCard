import type { Metadata } from "next";
import { Provider } from "@/Context";
import "./globals.css";
import Header from "./Header";

export const metadata: Metadata = {
  title: "FlashCard App",
  description: "Create and study with flashcards",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Header />
          {children}
        </Provider>
      </body>
    </html>
  );
}
