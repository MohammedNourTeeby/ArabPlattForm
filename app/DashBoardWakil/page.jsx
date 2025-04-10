// app/dashboard/agent/page.jsx
"use client";
import React, { useState } from "react"; // <-- يجب استيراد useState
import CampaignStatistics from "./components/CampaignStats";
import Sidebar from './components/Sidebar'; // <-- تصحيح اسم المكون
import CampaignList from './components/CampaignList';
import SalesReports from './components/SalesReports';
import LeadsManager from './components/LeadsManager';
import AffiliateDashboard from './components/Affiliate/AffiliateDashboard';

function Page() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sections={{
          dashboard: 'إحصاءات سريعة',
          campaigns: 'الحملات التسويقية',
          reports: 'التقارير المالية',

          affiliate: '    التسويق بالعمولة ',
        }}
      />
      <main className="flex-1 mr-64 p-8"> {/* تصحيح الهوامش */}
      <div className="bg-white  p-6 rounded-lg shadow-sm"> {/* إضافة h-full */}
      {activeSection === 'dashboard' && <CampaignStatistics />}
      {activeSection === 'campaigns' && <CampaignList />}
      {activeSection === 'reports' && <SalesReports />}
      {activeSection === 'leads' && <LeadsManager />}
      {activeSection === 'affiliate' && <AffiliateDashboard   />}


        </div>
      </main>
    </div>
  );
}

export default Page;