import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; 
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'gulugulu - Search Engine',
  description: 'The search engine that finds what you didn\'t know you needed',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}