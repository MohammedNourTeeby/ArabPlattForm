import { mockPlans } from '@/data/mockPlans';

export default function LicensePlans() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {mockPlans.map((plan) => (
        <div key={plan.id} className="border rounded-xl p-6">
          <h3 className="text-2xl font-bold">{plan.name}</h3>
          <p className="text-4xl my-4">${plan.price}<span>/شهر</span></p>
          <ul className="space-y-2">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <svg>...</svg>
                {feature}
              </li>
            ))}
          </ul>
          <button className="btn btn-primary w-full mt-6">اختر الخطة</button>
        </div>
      ))}
    </div>
  );
}