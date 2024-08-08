'use client'
import { Inter } from "next/font/google";
import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../styles/theme';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{margin:0}} className={inter.className}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
