import { create } from "zustand";

export const useIntegratedStore = create((set) => ({
  domains: [],
  pages: [],
  currentPage: null,
  currentDomain: null,
  addDomain: (domain) =>
    set((state) => ({ domains: [...state.domains, domain] })),
  addPage: (page) => set((state) => ({ pages: [...state.pages, page] })),
  linkDomainToPage: (domainId, pageId) =>
    set((state) => ({
      domains: state.domains.map((d) =>
        d.id === domainId ? { ...d, linkedPage: pageId, status: "active" } : d
      ),
    })),
}));
