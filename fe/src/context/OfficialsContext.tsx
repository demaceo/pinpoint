/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

interface OfficialsState {
  officials: any[];
  setOfficials: (officials: any[]) => void;
//   addOfficial: (official: any) => void;
//   removeOfficial: (officialId: number) => void;
//   updateOfficial: (officialId: number, updatedOfficial: any) => void;
//   clearOfficials: () => void;
}

export const useOfficialsStore = create<OfficialsState>((set) => ({
  officials: [],
  setOfficials: (officials) => set({ officials }),
//   addOfficial: (official) => set((state) => ({ officials: [...state.officials, official] })),
//   removeOfficial: (officialId: number) => set((state) => ({
//     officials: state.officials.filter(official => official.id !== officialId),
//   })),
//   updateOfficial: (officialId: number, updatedOfficial: any) => set((state) => ({
//     officials: state.officials.map(official =>
//       official.id === officialId ? { ...official, ...updatedOfficial } : official
//     ),
//   })),
//   clearOfficials: () => set({ officials: [] }),
}));
