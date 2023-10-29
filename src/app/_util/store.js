import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

const nullProfile = {
  profile: null,
}

export const useGlobalStore = create()(
  devtools(
    persist(
      set => ({
        profile_full: nullProfile,
        profile_add_profile: incomingProfile => set(state => ({ profile_full: { ...state.profile_full, profile: incomingProfile } })),
        profileRemove: () => set(() => ({ profile: nullProfile })),
      }),
      {
        name: 'global-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)
