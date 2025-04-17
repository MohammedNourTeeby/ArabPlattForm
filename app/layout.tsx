// app/layout.tsx
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Cairo } from 'next/font/google';
import Footer from "../components/Footer";
import AppSidebar from "@/components/app-sidebar";
import "./globals.css";
import { MediaRecorderProvider } from '@/contexts/MediaRecorderContext';
import { MantineProvider } from "@mantine/core";


// إعداد الخط مع التحقق من توفر الخصائص
const cairo = Cairo({
  subsets: ['latin', 'arabic'],
  weight: ['300', '400', '600', '700'],
  display: 'swap',
  variable: '--font-cairo',
  fallback: ['Arial', 'sans-serif']
});

export const metadata: Metadata = {
  title: "منصة الإعتماد العربي",
  description: "منصة متخصصة في الاعتماد التعليمي",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <head>
        {/* إضافة وسم العنوان هنا للتوافق مع التحسينات */}
        <title>منصة الإعتماد العربي</title>
        {/* إزالة روابط الخطوط الخارجية لأن next/font يتولى ذلك */}
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        {/* هيكل الصفحة الرئيسي */}
        <div className="flex-1">
          <div className="hidden lg:block">
            <AppSidebar variant="header" />
            <main className="pt-16 pl-64"> 
            <MantineProvider>
              <MediaRecorderProvider>
                {children}
              </MediaRecorderProvider>
              </MantineProvider>
            </main>
          </div>
          
          {/* نسخة الهاتف المحمول */}
          <div className="block lg:hidden">
            <main className="flex-1 p-4">
              <MediaRecorderProvider>
                {children}
              </MediaRecorderProvider>
            </main>
          </div>
        </div>
        
        {/* الفوتر في جميع الإصدارات */}
        <Footer />
      </body>
    </html>
  );
}