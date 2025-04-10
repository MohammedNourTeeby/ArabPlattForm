'use client';
import { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiMapPin, FiPlus } from 'react-icons/fi';

export default function TrainingCenterManager() {
  const [centers, setCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // بيانات وهمية للمراكز (بدلاً من localStorage)
  const mockCenters = [
    {
      id: '1',
      name: 'المركز الرئيسي بالرياض',
      location: 'حي النخيل، الرياض',
      capacity: '120',
      status: 'active'
    },
    {
      id: '2',
      name: 'فرع جدة',
      location: 'حي الصفا، جدة',
      capacity: '80',
      status: 'active'
    }
  ];

  useEffect(() => {
    try {
      // محاكاة جلب البيانات (سيتم استبدالها بالبيانات الحقيقية لاحقاً)
      setCenters(mockCenters);
    } catch (error) {
      console.error('Error loading centers:', error);
      setCenters(mockCenters); // استخدام البيانات الوهمية كبديل
    }
  }, []);

  const handleSave = (newCenter) => {
    if (selectedCenter) {
      // تعديل مركز موجود
      setCenters(centers.map(c => c.id === selectedCenter.id ? newCenter : c));
    } else {
      // إضافة مركز جديد
      setCenters([...centers, { ...newCenter, id: Date.now().toString() }]);
    }
    setSelectedCenter(null);
  };

  const filteredCenters = centers.filter(center =>
    center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    center.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 p-4">
      {/* شريط البحث وعنوان الصفحة */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">إدارة المراكز التدريبية</h1>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="ابحث عن مركز..."
            className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute left-2 top-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* زر الإضافة */}
      {!selectedCenter && (
        <button
          onClick={() => setSelectedCenter({ id: '', name: '', location: '', capacity: '', status: 'active' })}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FiPlus /> إضافة مركز جديد
        </button>
      )}

      {/* النموذج أو القائمة */}
      <div className="grid gap-8 lg:grid-cols-2">
        {selectedCenter ? (
          <CenterForm 
            center={selectedCenter} 
            onSave={handleSave}
            onCancel={() => setSelectedCenter(null)}
          />
        ) : (
          <CentersList
            centers={filteredCenters}
            onEdit={setSelectedCenter}
            onDelete={id => setCenters(centers.filter(c => c.id !== id))}
          />
        )}
        
        {/* إحصائيات سريعة */}
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">إحصائيات المراكز</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard 
              title="عدد المراكز" 
              value={centers.length} 
              icon={<FiMapPin className="text-blue-500" />}
              color="bg-blue-100"
            />
            <StatCard 
              title="مراكز نشطة" 
              value={centers.filter(c => c.status === 'active').length} 
              icon={<FiMapPin className="text-green-500" />}
              color="bg-green-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// مكون بطاقة الإحصائية
const StatCard = ({ title, value, icon, color }) => (
  <div className={`${color} p-4 rounded-lg flex items-center gap-4 border border-transparent hover:border-gray-300 transition-all`}>
    <div className="p-2 bg-white rounded-full shadow-sm">{icon}</div>
    <div>
      <p className="text-gray-600">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

// مكون النموذج
const CenterForm = ({ center, onSave, onCancel }) => {
  const [formData, setFormData] = useState(center);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        {center.id ? 'تعديل المركز' : 'إضافة مركز جديد'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-600 mb-1">اسم المركز</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">الموقع</label>
          <input
            type="text"
            required
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">السعة الاستيعابية</label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.capacity}
            onChange={(e) => setFormData({...formData, capacity: e.target.value})}
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1">الحالة</label>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="maintenance">قيد الصيانة</option>
          </select>
        </div>

        <div className="flex gap-4 justify-end mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            إلغاء
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            حفظ التغييرات
          </button>
        </div>
      </form>
    </div>
  );
};

// مكون قائمة المراكز
const CentersList = ({ centers, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">قائمة المراكز</h3>
      
      {centers.length === 0 ? (
        <div className="text-center py-8">
          <FiMapPin className="mx-auto text-gray-400 text-4xl mb-2" />
          <p className="text-gray-500">لا توجد مراكز مسجلة حالياً</p>
        </div>
      ) : (
        <div className="space-y-3">
          {centers.map(center => (
            <div key={center.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1 mb-2 sm:mb-0">
                <h4 className="font-medium text-gray-800">{center.name}</h4>
                <p className="text-sm text-gray-500">{center.location}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    center.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : center.status === 'inactive'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {center.status === 'active' ? 'نشط' : center.status === 'inactive' ? 'غير نشط' : 'قيد الصيانة'}
                  </span>
                  {center.capacity && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded-full">
                      السعة: {center.capacity}
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2 self-end sm:self-center">
                <button
                  onClick={() => onEdit(center)}
                  className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                  title="تعديل"
                >
                  <FiEdit />
                </button>
                <button
                  onClick={() => onDelete(center.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="حذف"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};