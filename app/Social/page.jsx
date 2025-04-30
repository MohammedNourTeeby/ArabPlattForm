import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnifiedInbox from './UnifiedInbox';
import SocialScheduler from './SocialScheduler';

export default function SosialDashboard() {
  return (
    <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">لوحة تحكم وسائل التواصل الاجتماعي</h1>
      
      <Tabs defaultValue="inbox" className="w-full">
        <TabsList className="flex flex-wrap justify-center md:justify-start mb-6">
          <TabsTrigger 
            value="inbox" 
            className="px-4 py-2 mr-2 mb-2 md:mb-0 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
          >
            صندوق الوارد
          </TabsTrigger>
          <TabsTrigger 
            value="scheduler" 
            className="px-4 py-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white transition-all"
          >
            جدولة المنشورات
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="inbox" className="mt-4">
          <UnifiedInbox />
        </TabsContent>
        
        <TabsContent value="scheduler" className="mt-4">
          <SocialScheduler />
        </TabsContent>
      </Tabs>
    </div>
  );
}