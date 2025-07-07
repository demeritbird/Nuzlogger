import type { Metadata } from 'next';
import './globals.scss';
import ReactQueryProvider from './contexts/ReactQueryProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const metadata: Metadata = {
  title: 'nuzlogger',
  description: 'simple web app for keeping track of nuzlocke progress',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <ReactQueryProvider>
          {children}
          <ReactQueryDevtools />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
