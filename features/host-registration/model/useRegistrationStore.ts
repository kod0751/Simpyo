import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  type StateStorage,
} from "zustand/middleware";
import { initialHostForm, type HostFormData } from "@/lib/host";

interface RegistrationState {
  form: HostFormData;
  update: <K extends keyof HostFormData>(
    key: K,
    value: HostFormData[K],
  ) => void;
  toggleAmenity: (id: string) => void;
  reset: () => void;
}

const sessionStorageAdapter: StateStorage = {
  getItem: (name) => sessionStorage.getItem(name),
  setItem: (name, value) => sessionStorage.setItem(name, value),
  removeItem: (name) => sessionStorage.removeItem(name),
};

export const useRegistrationStore = create<RegistrationState>()(
  persist(
    (set) => ({
      form: initialHostForm,

      update: (key, value) =>
        set((state) => ({
          form: { ...state.form, [key]: value },
        })),

      toggleAmenity: (id) =>
        set((state) => ({
          form: {
            ...state.form,
            amenities: state.form.amenities.includes(id)
              ? state.form.amenities.filter((a) => a !== id)
              : [...state.form.amenities, id],
          },
        })),

      reset: () => set({ form: initialHostForm }),
    }),
    {
      name: "host-registration",
      storage: createJSONStorage(() => sessionStorageAdapter),
      partialize: (state) => ({
        form: { ...state.form, photos: [] },
      }),
    },
  ),
);
