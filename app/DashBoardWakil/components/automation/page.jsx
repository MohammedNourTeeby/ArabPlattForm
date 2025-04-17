// pages/dashboard.jsx
import { CampaignScheduler } from "./CampaignScheduler";
import { ContactManager } from "./ContactManager";
import { Analytics } from "./Analytics";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-6 p-8">
      {/* قسم الجدولة */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <CampaignScheduler />
      </div>

      {/* إدارة جهات الاتصال */}
      <div className="col-span-12 md:col-span-6 lg:col-span-4">
        <ContactManager />
      </div>

      {/* التحليلات */}
      <div className="col-span-12 lg:col-span-4">
        <Analytics />
      </div>
    </div>
  );
}