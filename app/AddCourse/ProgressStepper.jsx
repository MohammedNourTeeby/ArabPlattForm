import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiImage, FiTarget, FiList, FiUsers, FiDollarSign, FiLock, FiPaperclip, FiFilm } from "react-icons/fi";

const getIcon = (iconName) => {
  switch (iconName) {
    case "FiBook": return <FiBook />;
    case "FiImage": return <FiImage />;
    case "FiTarget": return <FiTarget />;
    case "FiList": return <FiList />;
    case "FiUsers": return <FiUsers />;
    case "FiDollarSign": return <FiDollarSign />;
    case "FiLock": return <FiLock />;
    case "FiPaperclip": return <FiPaperclip />;
    case "FiFilm": return <FiFilm />;
    default: return <FiBook />;
  }
};

const ProgressStepper = ({ activeStep, setActiveStep, STEPS, COLORS, validateStep }) => (
  <div className="relative px-6 pt-6 mb-8">
    <div className="flex justify-between relative">
      {STEPS.map((step) => (
        <div
          key={step.id}
          className="flex flex-col items-center z-10"
          style={{ width: `${100 / STEPS.length}%` }}
        >
          <motion.div
            className="flex items-center justify-center rounded-full mb-2 cursor-pointer"
            whileHover={{ scale: 1.1 }}
            onClick={() => validateStep(step.id) && setActiveStep(step.id)}
            style={{
              width: "3rem",
              height: "3rem",
              background: activeStep >= step.id ? COLORS.primary : `${COLORS.muted}20`,
              color: activeStep >= step.id ? COLORS.background : COLORS.muted,
              boxShadow: activeStep === step.id ? `0 4px 12px ${COLORS.primary}30` : "none",
            }}
          >
            {getIcon(step.icon)}
          </motion.div>
          <div className="text-center">
            <span className={`text-xs font-semibold ${activeStep >= step.id ? "text-primary" : "text-muted"}`}>
              {step.title}
            </span>
          </div>
        </div>
      ))}
      <div className="absolute top-6 left-0 right-0 h-1 bg-gray-100 mx-6">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${((activeStep - 1) / (STEPS.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  </div>
);

export default ProgressStepper;