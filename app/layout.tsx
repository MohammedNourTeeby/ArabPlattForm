// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import Footer from '@/components/Footer';
import AppSidebar from '@/components/app-sidebar';
import { Providers as OtherProviders } from './providers'; // Mantine, MediaRecorder

const cairo = Cairo({ subsets: ['latin','arabic'], weight:['300','400','600','700'], display:'swap', variable:'--font-cairo' });

export const metadata: Metadata = { title: 'منصة الإعتماد العربي', description: 'منصة متخصصة في الاعتماد التعليمي' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html  className={cairo.variable}>
      <body className="flex flex-col min-h-screen bg-gray-50">
        {/* 1. مزوّد React Query */}
        
          {/* 2. باقي المزوّدين */}
          <OtherProviders>
            {/* شجرة التطبيق */}
            <div className="flex-1">
              <div className="hidden lg:block">
                <AppSidebar variant="header" />
                <main className="pt-16 pl-0">{children}</main>
              </div>
              <div className="block lg:hidden">
                <main className="flex-1 p-4">{children}</main>
              </div>
            </div>
            <Footer />
          </OtherProviders>
      </body>
    </html>
  );
}
