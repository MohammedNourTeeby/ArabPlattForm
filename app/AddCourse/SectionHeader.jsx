import React from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title, description, icon, COLORS }) => (
  <motion.div
    className="mb-8 p-4 rounded-xl"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    style={{
      background: `${COLORS.primary}08`,
      border: `1px solid ${COLORS.primary}20`,
    }}
  >
    <div className="flex items-start gap-4">
      <div className="p-2 rounded-lg" style={{ background: COLORS.primary }}>
        {icon}
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2" style={{ color: COLORS.primary }}>
          {title}
        </h2>
        <p className="text-sm" style={{ color: COLORS.muted }}>
          {description}
        </p>
      </div>
    </div>
  </motion.div>
);

export default SectionHeader;