// utils/safePdfWrapper.js
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";

let isPdfSupported = false;

// التحقق من دعم المتصفح قبل التحميل
try {
  if (typeof window !== "undefined") {
    new PDFViewer();
    isPdfSupported = true;
  }
} catch (e) {
  console.error("PDF renderer not supported:", e);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const SafePDFDownloadLink = isPdfSupported
  ? PDFDownloadLink
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ({ children }) => (
      <button
        disabled
        className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed"
      >
        المتصفح لا يدعم إنشاء PDF
      </button>
    );

export const SafePDFViewer = isPdfSupported
  ? PDFViewer
  : () => (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        عذراً، المتصفح لا يدعم معاينة PDF
      </div>
    );
