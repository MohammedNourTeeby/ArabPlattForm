// stores/useAutomationStore.jsx
import { create } from "zustand";
import mockData from "./mockData.json";

export const useAutomationStore = create((set) => ({
  contacts: mockData.contacts,
  campaigns: mockData.campaigns,
 
  addCampaign: (campaign) => 
    set(state => ({ campaigns: [campaign, ...state.campaigns] })),
  updateContact: (id, data) => 
    set(state => ({
      contacts: state.contacts.map(c => 
        c.id === id ? { ...c, ...data } : c
      )
    }))
}));