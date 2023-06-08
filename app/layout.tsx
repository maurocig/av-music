import Sidebar from '@/components/Sidebar';
import { Figtree, Inter } from 'next/font/google';
import './globals.css';

const font = Figtree({ subsets: ['latin'] });

export const metadata = {
  title: 'AV music',
  description: 'Custom music for audiovisual content.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
