import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import "@styles/globals.css";
import ChakraProviders from "@contexts/ChakraProvider";
import ClientProvider from "@contexts/AuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from '@app/api/auth/[...nextauth]/authOptions';
import { ApolloWrapper } from '@contexts/ApolloWrapper';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SGP',
  description: 'Système de gestion de pompes',
}

// This is the root layout of the application. All route share this same layout.

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <ClientProvider session={session}>
          <ApolloWrapper>
            <ChakraProviders>{children}</ChakraProviders>
          </ApolloWrapper>
        </ClientProvider>
      </body>
    </html>
  );
}
