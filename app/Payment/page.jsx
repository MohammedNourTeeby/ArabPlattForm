"use client"
import React from 'react';
import { CreditCardIcon, PlusCircleIcon } from '@heroicons/react/24/outline';

const page = () => {
  const savedPaymentMethods = []; // يمكن استبدالها ببيانات حقيقية من API

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* العنوان الرئيسي */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <CreditCardIcon className="w-6 h-6 text-blue-500" />
        طرق الدفع
      </h2>

      {savedPaymentMethods.length > 0 ? (
        /* حالة وجود طرق دفع مسجلة */
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">الطرق المضافة</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* بطاقة طريقة الدفع */}
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <img 
                  src="/visa-logo.png" 
                  alt="Visa" 
                  className="w-12 h-8 object-contain"
                />
                <div>
                  <h4 className="font-medium">بطاقة فيزا</h4>
                  <p className="text-sm text-gray-500">**** **** **** 1234</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* حالة عدم وجود طرق دفع */
        <div className="text-center py-12">
          <div className="mx-auto mb-4 text-gray-400">
            <CreditCardIcon className="w-20 h-20 inline-block" />
          </div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            لا توجد طرق دفع مضافة
          </h3>
          <p className="text-gray-500 mb-6">
            قم بإضافة طريقة دفع جديدة لتتمكن من إتمام عملياتك بسهولة
          </p>
        </div>
      )}

      {/* زر إضافة طريقة دفع جديدة */}
      <button className="mt-6 w-full md:w-auto flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
        <PlusCircleIcon className="w-5 h-5" />
        إضافة طريقة دفع جديدة
      </button>

      {/* نموذج إضافة طريقة دفع (يمكن تفعيله عند النقر على الزر) */}
      <div className="mt-8 p-6 border rounded-lg bg-gray-50 hidden">
        <h3 className="text-lg font-semibold mb-4">إضافة طريقة دفع جديدة</h3>
        {/* ... نموذج الإضافة هنا ... */}
      </div>
    </div>
  );
};

export default page;