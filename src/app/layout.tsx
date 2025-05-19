import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css';
import {ReactNode} from 'react';

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
  title: 'Movie Bingo',
  description: 'A fun bingo game for movie lovers!',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
      <html lang="en">
      <body className={inter.className}>{children}</body>
      </html>
  );
}