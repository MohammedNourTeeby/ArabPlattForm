// components/Dashboard/CampaignScheduler.jsx
"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignSchema } from "./campaignSchema";
import { useAutomationStore } from "./useAutomationStore";

export const CampaignScheduler = () => {
  const { addCampaign } = useAutomationStore();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(campaignSchema)
  });

  const onSubmit = (data) => {
    addCampaign({
      id: Date.now(),
      ...data,
      status: "scheduled",
      createdAt: new Date().toISOString()
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
        type="text" 
        placeholder="اسم الحملة"
        {...register("name")}
      />
      <select {...register("type")}>
        <option value="sms">رسالة نصية</option>
        <option value="call">مكالمة آليّة</option>
      </select>
      <input 
        type="datetime-local" 
        {...register("scheduledAt")}
      />
      <button type="submit">جدولة</button>
    </form>
  );
};