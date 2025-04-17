// lib/schemas.js
import { z } from "zod";

export const campaignSchema = z.object({
  name: z.string()
    .min(3, "اسم الحملة يجب أن يحتوي على 3 أحرف على الأقل")
    .max(50, "اسم الحملة لا يمكن أن يتجاوز 50 حرفًا"),
  
  type: z.enum(['sms', 'call'], {
    required_error: "يرجى اختيار نوع الحملة",
    invalid_type_error: "النوع المختار غير صالح"
  }),

  scheduledAt: z.string()
    .datetime({ message: "تنسيق التاريخ غير صالح" })
    .refine((date) => new Date(date) > new Date(), {
      message: "لا يمكن جدولة الحملة في تاريخ سابق"
    }),

  message: z.string()
    .min(10, "الرسالة يجب أن تحتوي على 10 أحرف على الأقل")
    .max(1000, "الرسالة طويلة جدًا")
    .optional() // ← إجعلها مطلوبة فقط للرسائل النصية
    .transform((val) => val?.trim()),

  // إضافة تحقق شرطي للرسائل الصوتية
  voiceMessage: z.string().url("رابط الملف الصوتي غير صالح").optional()
})
.refine(data => {
  if (data.type === 'sms') return !!data.message;
  if (data.type === 'call') return !!data.voiceMessage;
  return true;
}, {
  message: "الرسالة مطلوبة للرسائل النصية، والملف الصوتي مطلوب للمكالمات",
  path: ["message", "voiceMessage"]
});