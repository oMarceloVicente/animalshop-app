import "./globals.css";
import NextAuthSessionProvider from "@/auth/context/nextAuthSessionProvider";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextAuthSessionProvider>
        <body>{children}</body>
      </NextAuthSessionProvider>
    </html>
  );
}
