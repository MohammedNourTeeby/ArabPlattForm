import TrainingCenterManager from '../components/TrainingCenterManager';

export default function TrainingCentersPage() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8">إدارة المراكز التدريبية</h1>
      <TrainingCenterManager />
    </div>
  );
}