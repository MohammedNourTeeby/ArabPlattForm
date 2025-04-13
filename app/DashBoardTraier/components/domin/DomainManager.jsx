'use client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useIntegratedStore } from './IntegratedContext';

export default function DomainManager() {
  const { register, handleSubmit } = useForm();
  const { domains, addDomain, linkDomainToPage } = useIntegratedStore();

  const onSubmit = (data) => {
    const newDomain = {
      id: Date.now(),
      name: data.domain,
      linkedPage: null,
      status: 'pending'
    };
    addDomain(newDomain);
    toast.success('تم إضافة الدومين! قم بإكمال التحقق.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("domain", { 
          required: "مطلوب",
          pattern: { value: /^(?!https?:\/\/)[a-zA-Z0-9-.]+\.[a-zA-Z]{2,}$/, message: "صيغة غير صحيحة" }
        })}
        placeholder="example.com"
        className="input input-bordered w-full"
      />
      <button type="submit" className="btn btn-primary w-full">ربط الدومين</button>
    </form>
  );
}