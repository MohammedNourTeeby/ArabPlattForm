import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLicenseStore } from '@/context/LicenseContext';

export default function LicenseForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { licenses, addLicense } = useLicenseStore();

  const onSubmit = (data) => {
    const isValid = licenses.some(l => l.key === data.key && l.status === 'active');
    if (isValid) {
      toast.success('تم تفعيل الترخيص بنجاح!');
    } else {
      toast.error('مفتاح الترخيص غير صالح أو منتهي الصلاحية');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      <input
        {...register("key", {
          required: "مطلوب",
          pattern: { value: /^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/, message: "صيغة غير صحيحة" }
        })}
        placeholder="XXXXX-XXXXX-XXXXX"
        className="input input-bordered w-full"
      />
      {errors.key && <p className="text-red-500">{errors.key.message}</p>}
      <button type="submit" className="btn btn-primary w-full mt-4">تفعيل</button>
    </form>
  );
}