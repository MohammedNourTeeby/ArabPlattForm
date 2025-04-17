// pages/AdminDashboard.jsx
"use client"

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic'; // <-- أضف هذا السطر

import Header from './Header';
import Sidebar from './Sidbar';
import UsersTable from './UsersTable';
import SummaryCard from './SummaryCard';
import ActivityLog from './ActivityLog';

import dashboardData from '../../data/dashboardData.json';
import statsData from '../../data/statsData.json';
import DashboardStats from './DashboardStats'; // تأكد من المسار الصحيح
import CourseManagement from './CourseManagement';
import coursesData from '../../data/coursesData.json';
import supportData from '../../data/supportTickets.json';
import SupportTickets from './SupportTickets';
import FinancialReports from './FinancialReports';
import InviteLinkGenerator from './InviteLinkGenerator';
import TeamManagementPanel from './TeamManagementPanel';
import CourseManagementy from './components/CourseManagementy';
import ReviewStats from './components/ReviewStats';
import AdminAdsPage from './components/ads/page';
import OffersPage from './components/Offers/page';
import CouponDashboard from './components/coupons/page';
import RefundsPage from './components/Refunds/page';
import RefundDashboard from './components/promotion/page';
import PayoutsPage from './components/Payouts/page';
import PrivacyPage from './components/legal/page';
import CertificatesPage from './components/Certificates/page';
import AcademicDashboard from './components/Academic/page';
import FinancialDashboard from './components/financial/page';
import NotificationsDashboard from './components/SMS/page';
import EmailTemplatesPage from './Email/page';
import AnalyticsDashboard from './components/CRM/page';
import LicenseDashboard from './components/Saas/page';
import SosialDashboard from './components/Social/page';
import CommunityCoursePage from './components/communitycourse/page';


const AdminDashboard = () => {
  // State management
  const [activeSection, setActiveSection] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [activityLogs, setActivityLogs] = useState([]);
  const [courses, setCourses] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize data
  useEffect(() => {
    try {
      setUsers(dashboardData.users || []);
      setStats(dashboardData.stats || {});
      setActivityLogs(dashboardData.activityLogs || []);
      setCourses(coursesData.courses || []);
      setTickets(supportData.tickets || []);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load data:", error);
      setIsLoading(false);
    }
  }, []);

  // Handle user operations
  const handleUserSubmit = (userData) => {
    if (userData.id) {
      setUsers(users.map(user => 
        user.id === userData.id ? userData : user
      ));
    } else {
      const newUser = {
        ...userData,
        id: Date.now()
      };
      setUsers([...users, newUser]);
    }
  };

  // Handle course operations
  const handleCourseSubmit = (courseData) => {
    if (courseData.id) {
      setCourses(courses.map(course =>
        course.id === courseData.id ? courseData : course
      ));
    } else {
      const newCourse = {
        ...courseData,
        id: Date.now()
      };
      setCourses([...courses, newCourse]);
    }
  };

  // Handle ticket operations
  const handleTicketUpdate = (ticketId, updates) => {
    setTickets(tickets.map(ticket =>
      ticket.id === ticketId ? { ...ticket, ...updates } : ticket
    ));
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">جاري تحميل البيانات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sections={{
            dashboard: 'لوحة التحكم',
  users: 'إدارة المستخدمين',
  content: 'المحتوى والدورات',
  support: 'الدعم والتذاكر',
  finance: 'العمليات المالية',
  addstudent: 'إضافة متدرب جديد',
  addgroup: 'إضافة فريق إداري',
  tracker: 'تفاعل المستخدمين',
  payouts: 'تسوية العمولات الآلية',
  ads: 'إدارة الاعلانات',
  offers: 'إدارة العروض',
  copon: 'إدارة الخصومات',
  refunds: 'إدارة الرسوم المالية',
  promotion: 'ظهور المدرب في الصفحة الأولى',
  legal: 'سياسة و شروط المنصة',
  certif: 'إدارة الشهادات',
  email: ' إدارة النظام البريدي',
  crm: ' CRM  ',
  saas: ' ادارة التراخيص  SaaS  ',
  social: ' إدارة التواصل الاجتماعي',



          }}
        />

        <main className="flex-1 mr-64 p-8">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <SummaryCard
                  title="إجمالي المستخدمين"
                  value={stats.totalUsers || 0}
                  icon="👥"
                  trend="up"
                />
                <SummaryCard
                  title="المستخدمين النشطين"
                  value={stats.activeUsers || 0}
                  icon="✅"
                  trend="up"
                />
                <SummaryCard
                  title="عدد المدربين"
                  value={stats.trainers || 0}
                  icon="🎓"
                  trend="neutral"
                />
                <SummaryCard
                  title="عدد المتدربين"
                  value={stats.trainees || 0}
                  icon="🧑💻"
                  trend="up"
                />
              </div>

              <DashboardStats data={statsData} />

              <div className="bg-white p-6 rounded-lg shadow-sm mt-6">
                <h3 className="text-lg font-semibold mb-4">أحدث الأنشطة</h3>
                <ActivityLog logs={activityLogs.slice(0, 5)} />
              </div>
            </>
          )}

          {/* Users Section */}
          {activeSection === 'users' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <UsersTable
                users={users}
                onSubmit={handleUserSubmit}
                onDelete={(userId) => setUsers(users.filter(u => u.id !== userId))}
              />
            </div>
          )}

          {/* Content Section */}
          {activeSection === 'content' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <CourseManagement
                courses={courses}
                onSubmit={handleCourseSubmit}
                onDelete={(courseId) => setCourses(courses.filter(c => c.id !== courseId))}
              />
             <CommunityCoursePage />
            </div>
            
          ) }

          {/* Support Section */}
          {activeSection === 'support' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <SupportTickets
                tickets={tickets}
                teams={supportData.teams || []}
                onUpdate={handleTicketUpdate}
                onDelete={(ticketId) => setTickets(tickets.filter(t => t.id !== ticketId))}
              />
            </div>
          )}

          {/* Finance Section */}
          {activeSection === 'finance' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
          {activeSection === 'finance' && <FinancialReports />}
          {activeSection === 'finance' && <FinancialDashboard />}
          </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-bold mb-4">إعدادات النظام</h2>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">إعدادات المظهر</h3>
                  <p className="text-gray-600 text-sm">تخصيص واجهة المستخدم</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-medium">إعدادات الأمان</h3>
                  <p className="text-gray-600 text-sm">إدارة الصلاحيات والمستخدمين</p>
                </div>
              </div>
            </div>
          )}
                {activeSection === 'addstudent' && <InviteLinkGenerator />}
                {activeSection === 'addgroup' && <TeamManagementPanel />}
                {activeSection === 'tracker' && <CourseManagementy  />}
                {activeSection === 'tracker' && <ReviewStats  />}
                {activeSection === 'payouts' && <PayoutsPage   />}
                {activeSection === 'ads' && <AdminAdsPage   />}
                {activeSection === 'offers' && <OffersPage   />}
                {activeSection === 'copon' && <CouponDashboard   />}
                {activeSection === 'refunds' && <RefundsPage   />}
                {activeSection === 'promotion' && <RefundDashboard   />}
                {activeSection === 'legal' && <PrivacyPage   />}
                {activeSection === 'certif' && <CertificatesPage   />}
                {activeSection === 'certif' && <AcademicDashboard   />}
                {activeSection === 'email' && <NotificationsDashboard   />}
                {activeSection === 'email' && <EmailTemplatesPage   />}
                {activeSection === 'crm' && <AnalyticsDashboard   />}
                {activeSection === 'saas' && <LicenseDashboard   />}
                {activeSection === 'social' && <SosialDashboard   />}

        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;