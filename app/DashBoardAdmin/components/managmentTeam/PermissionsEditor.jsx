'use client';
import { 
  CheckIcon,
  PencilIcon,
  TrashIcon,
  MegaphoneIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  Square2StackIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const theme = {
  blue: '#008DCB',
  black: '#0D1012',
  gray: '#999999',
  red: '#E2101E',
  white: '#FFFFFF',
  yellow: '#F9D011'
};

const permissionIcons = {
  view: <Square2StackIcon className="w-5 h-5" />,
  edit: <PencilIcon className="w-5 h-5" />,
  delete: <TrashIcon className="w-5 h-5" />,
  publish: <MegaphoneIcon className="w-5 h-5" />,
  query: <MagnifyingGlassIcon className="w-5 h-5" />,
  reports: <ChartBarIcon className="w-5 h-5" />,
  manage_users: <UserGroupIcon className="w-5 h-5" />
};

export default function PermissionsEditor({ permissions, onChange }) {
  const allPermissions = [
    { 
      id: 'view', 
      label: 'عرض المحتوى',
      description: 'القدرة على معاينة المحتوى دون التعديل',
      category: 'الصلاحيات الأساسية'
    },
    { 
      id: 'edit', 
      label: 'التعديل',
      description: 'تعديل المحتوى والإعدادات الرئيسية',
      category: 'الصلاحيات الأساسية'
    },
    { 
      id: 'delete', 
      label: 'الحذف',
      description: 'إزالة المحتوى بشكل دائم',
      category: 'الصلاحيات الخطرة',
      warning: true
    },
    { 
      id: 'publish', 
      label: 'النشر',
      description: 'نشر المحتوى للعامة',
      category: 'إدارة المحتوى'
    },
    { 
      id: 'query', 
      label: 'استعلام البيانات',
      description: 'الوصول إلى قواعد البيانات',
      category: 'التقارير'
    },
    { 
      id: 'reports', 
      label: 'التقارير',
      description: 'إنشاء وتصدير التقارير التحليلية',
      category: 'التقارير'
    },
    { 
      id: 'manage_users', 
      label: 'إدارة المستخدمين',
      description: 'إضافة/حذف المستخدمين وتعديل الصلاحيات',
      category: 'الإدارة'
    },
  ];

  const groupedPermissions = allPermissions.reduce((acc, perm) => {
    (acc[perm.category] = acc[perm.category] || []).push(perm);
    return acc;
  }, {});

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheckIcon className="w-7 h-7" style={{ color: theme.blue }} />
        <h2 className="text-2xl font-bold" style={{ color: theme.black }}>
          إدارة الصلاحيات
        </h2>
      </div>

      {Object.entries(groupedPermissions).map(([category, perms]) => (
        <div 
          key={category} 
          className="border rounded-xl overflow-hidden"
          style={{ 
            borderColor: theme.gray + '30',
            backgroundColor: theme.white
          }}
        >
          <div 
            className="p-4 flex items-center gap-3"
            style={{ 
              backgroundColor: theme.blue + '08',
              borderBottom: `1px solid ${theme.gray + '30'}`
            }}
          >
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: theme.blue + '15' }}
            >
              <span style={{ color: theme.blue }}>
                {permissionIcons[perms[0].id]}
              </span>
            </div>
            <h3 
              className="font-semibold text-lg"
              style={{ color: theme.blue }}
            >
              {category}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4">
            {perms.map((perm) => {
              const isChecked = permissions.includes(perm.id);
              
              return (
                <motion.label 
                  key={perm.id}
                  whileHover={{ y: -2 }}
                  className={`relative p-4 rounded-xl cursor-pointer transition-all ${
                    isChecked ? 'ring-2' : 'border'
                  }`}
                  style={{
                    borderColor: theme.gray + '40',
                    ringColor: theme.blue,
                    backgroundColor: isChecked ? theme.blue + '08' : theme.white
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="relative mt-1">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => onChange(perm.id, e.target.checked)}
                        className="sr-only"
                      />
                      <div 
                        className={`w-5 h-5 flex items-center justify-center rounded-md border-2 ${
                          isChecked ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                        }`}
                        style={{
                          backgroundColor: isChecked ? theme.blue : theme.white,
                          borderColor: isChecked ? theme.blue : theme.gray + '60'
                        }}
                      >
                        {isChecked && (
                          <CheckIcon 
                            className="w-4 h-4" 
                            style={{ color: theme.white }} 
                          />
                        )}
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span style={{ color: theme.black }}>
                          {permissionIcons[perm.id]}
                        </span>
                        <span 
                          className="font-medium"
                          style={{ 
                            color: perm.warning ? theme.red : theme.black,
                            fontSize: '0.9375rem'
                          }}
                        >
                          {perm.label}
                        </span>
                        {perm.warning && (
                          <span 
                            className="text-xs px-2 py-1 rounded-full"
                            style={{ 
                              backgroundColor: theme.red + '15', 
                              color: theme.red 
                            }}
                          >
                            صلاحية خطرة
                          </span>
                        )}
                      </div>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: theme.gray }}
                      >
                        {perm.description}
                      </p>
                    </div>
                  </div>
                </motion.label>
              );
            })}
          </div>
        </div>
      ))}

      <div 
        className="p-4 rounded-lg flex items-start gap-3"
        style={{ 
          backgroundColor: theme.yellow + '10',
          border: `1px solid ${theme.yellow + '30'}`
        }}
      >
        <ExclamationTriangleIcon 
          className="w-5 h-5 flex-shrink-0 mt-1" 
          style={{ color: theme.yellow }} 
        />
        <div>
          <p 
            className="text-sm font-medium mb-1"
            style={{ color: theme.yellow }}
          >
            ملاحظة أمان هامة
          </p>
          <p 
            className="text-sm"
            style={{ color: theme.black }}
          >
            امنح فقط الصلاحيات الضرورية لأداء المهام المطلوبة
          </p>
        </div>
      </div>
    </div>
  );
}