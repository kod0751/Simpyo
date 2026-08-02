import { create } from "zustand";
import {
  persist,
  createJSONStorage,
  type StateStorage,
} from "zustand/middleware";
import { initialHostForm, type HostFormData } from "@/lib/host";
import { MAX_TAGS } from "@/lib/host";

interface RegistrationState {
  form: HostFormData;
  update: <K extends keyof HostFormData>(
    key: K,
    value: HostFormData[K],
  ) => void;
  toggleAmenity: (id: string) => void;
  toggleTag: (id: string) => void;
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

      toggleTag: (id) =>
        set((state) => {
          const isSelected = state.form.tags.includes(id);
          if (isSelected) {
            return {
              form: {
                ...state.form,
                tags: state.form.tags.filter((t) => t !== id),
              },
            };
          }
          if (state.form.tags.length >= MAX_TAGS) return state; // 이미 3개 선택된 상태면 아무 변화 없이 그대로 반환
          return { form: { ...state.form, tags: [...state.form.tags, id] } };
        }),

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
