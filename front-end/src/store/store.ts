import { create } from 'zustand'

type somethingType = {
something: string,
somethingChanger: () => void,
}

export const useStore = create<somethingType>((set) => ({
  something: "a",
  somethingChanger: () => set((x) => ({
    something: x.something === "a" ? "b" : "a"
  })),
}))