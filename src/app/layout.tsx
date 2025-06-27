import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';
import Navbar from '@/components/shared/navbar';

export const metadata: Metadata = {
  title: 'MindfulChat',
  description: 'Your safe space to talk',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;700&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
          <footer className="p-4 text-center text-xs text-muted-foreground border-t">
            <p>Disclaimer: MindfulChat is an AI assistant and not a substitute for professional medical advice, diagnosis, or treatment. If you are in a crisis, please contact a local emergency service.</p>
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
