"use client"
import { useForm } from 'react-hook-form';
import { useBrandStore } from './WhiteLabelContext';
import { HexColorPicker } from 'react-colorful';
import {useState} from 'react'
export default function BrandForm() {
    const { register, handleSubmit, watch, setValue } = useForm();
    const { updateBrand } = useBrandStore();
  const [logoPreview, setLogoPreview] = useState('');

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setLogoPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    updateBrand({
      logo: logoPreview,
      primaryColor: data.primaryColor,
      font: data.font,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label>الشعار</label>
        <input 
          type="file" 
          onChange={handleLogoUpload} 
          className="file-input"
        />
        {logoPreview && <img src={logoPreview} className="w-32 mt-2"/>}
      </div>

      <div>
        <label>اللون الأساسي</label>
        <HexColorPicker 
          color={watch('primaryColor')} 
          onChange={(c) => setValue('primaryColor', c)}
        />
        <input 
          {...register('primaryColor')} 
          className="input input-bordered"
        />
      </div>

      <button type="submit" className="btn btn-primary">حفظ التغييرات</button>
    </form>
  );
}