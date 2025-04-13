// LicenseContext.jsx
"use client";
import React, { createContext, useContext, useState } from "react";

const LicenseContext = createContext({
  licenses: [],
  clients: [],
  addLicense: () => {},
  addClient: () => {},
  updateClientStatus: () => {},
  loadInitialData: () => {}, // تأكد من وجود هذه الدالة
});

export const LicenseProvider = ({ children }) => {
  const [licenses, setLicenses] = useState([]);
  const [clients, setClients] = useState([]);

  const addLicense = (license) => setLicenses((prev) => [...prev, license]);
  const addClient = (client) => setClients((prev) => [...prev, client]);
  const updateClientStatus = (clientId, status) =>
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status } : c))
    );

  // تعريف loadInitialData لتعيين البيانات الأولية
  const loadInitialData = (data) => {
    setLicenses(data.licenses || []);
    setClients(data.clients || []);
  };

  return (
    <LicenseContext.Provider
      value={{
        licenses,
        clients,
        addLicense,
        addClient,
        updateClientStatus,
        loadInitialData, // تأكد من تمرير الدالة
      }}
    >
      {children}
    </LicenseContext.Provider>
  );
};

export const useLicenseStore = () => {
  return useContext(LicenseContext);
};
