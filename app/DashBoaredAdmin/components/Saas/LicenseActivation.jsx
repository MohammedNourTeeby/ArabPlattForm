import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export default function LicenseActivation() {
  const { register, handleSubmit } = useForm();
  const { addLicense } = useLicenseStore();

  const onSubmit = (data) => {
    const newLicense = {
      id: crypto.randomUUID(),
      key: data.licenseKey,
      status: 'active',
      activationDate: new Date().toISOString(),
      price: data.plan === 'pro' ? 299 : 99
    };
    addLicense(newLicense);
    toast.success('تم تفعيل الترخيص بنجاح!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="card p-6 max-w-md mx-auto">
      <select 
        {...register("plan")}
        className="select select-bordered w-full mb-4"
      >
        <option value="basic">الباقة الأساسية (99$/شهر)</option>
        <option value="pro">الباقة الاحترافية (299$/شهر)</option>
      </select>
      
      <input
        {...register("licenseKey", { required: true })}
        placeholder="أدخل مفتاح الترخيص"
        className="input input-bordered w-full mb-4"
      />
      
      <button type="submit" className="btn btn-primary w-full">
        تفعيل الترخيص
      </button>
    </form>
  );
}