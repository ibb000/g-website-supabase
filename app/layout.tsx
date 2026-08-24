import type { Metadata } from 'next';
import { Sora, DM_Sans } from 'next/font/google';
import './globals.css';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--fh',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--fb',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Genie Studio® — A Brand of Magic That Never Fails',
  description:
    'Genie Studio is a full-service creative studio specialising in brand identity, web, 3D, AI automation, marketing, and event planning.',
  openGraph: {
    title: 'Genie Studio® — A Brand of Magic That Never Fails',
    description:
      'Genie Studio is a full-service creative studio specialising in brand identity, web, 3D, AI automation, marketing, and event planning.',
    url: 'https://genies.studio',
    siteName: 'Genie Studio',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
