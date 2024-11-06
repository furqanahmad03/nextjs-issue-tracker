import { Container, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './NavBar';
import QueryClientProvider from "./QueryClientProvider";
import AuthProvider from "./auth/Provider";
import DarkModeContext from "./components/DarkModeContext";
import './globals.css';
import "./theme-config.css";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <DarkModeContext>
          <QueryClientProvider>
            <AuthProvider>
              <Theme appearance="light" accentColor="violet">
                <Navbar />
                <main className="p-5">
                  <Container>{children}</Container>
                </main>
              </Theme>
            </AuthProvider>
          </QueryClientProvider>
        </DarkModeContext>
      </body>
    </html>
  )
}