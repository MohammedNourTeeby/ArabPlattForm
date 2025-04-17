import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UnifiedInbox from './UnifiedInbox';
import SocialScheduler from './SocialScheduler';

const SosialDashboard = () => {
  return (
    <div className="p-6">
      <Tabs defaultValue="inbox">
        <TabsList>
          <TabsTrigger value="inbox">صندوق الوارد</TabsTrigger>
          <TabsTrigger value="scheduler">جدولة المنشورات</TabsTrigger>
        </TabsList>
        <TabsContent value="inbox">
          <UnifiedInbox />
        </TabsContent>
        <TabsContent value="scheduler">
          <SocialScheduler />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SosialDashboard;