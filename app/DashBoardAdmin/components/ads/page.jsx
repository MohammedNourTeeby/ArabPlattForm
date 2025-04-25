"use client"

import { Suspense, useState, useEffect } from 'react';
import AdCampaignManager from './AdCampaignManager';
import PromotedCourseBanner from './PromotedCourseBanner';
import AdPerformanceChart from './AdPerformanceChart';

const AdminAdsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [courses] = useState([]); // بيانات وهمية أو من API

  useEffect(() => {
    const savedCampaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    setCampaigns(savedCampaigns);
  }, []);

  const handleCreateCampaign = (newCampaign) => {
    const updated = [...campaigns, newCampaign];
    setCampaigns(updated);
    localStorage.setItem('campaigns', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-3xl font-bold">الإعلانات المدفوعة</h1>
      
      <Suspense fallback={<div>جاري التحميل...</div>}>
        <AdCampaignManager 
          courses={courses} 
          onCreateCampaign={handleCreateCampaign} 
        />
        
        <PromotedCourseBanner campaigns={campaigns} />
        
        <AdPerformanceChart 
          data={campaigns.map(c => ({
            date: c.startDate,
            views: Math.floor(Math.random() * 1000),
            conversions: Math.floor(Math.random() * 100)
          }))}
        />
      </Suspense>
    </div>
  );
};

export default AdminAdsPage;