import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
const nullProfile = {
  profile: null,
  posts: null,
  profiles: null,
}

export const useGlobalStore = create()(
  devtools(
    set => ({
      profile_full: nullProfile,
      profile_add_profile: incomingProfile => set(state => ({ profile_full: { ...state.profile_full, profile: incomingProfile } })),
      profileRemove: () => set(() => ({ profile_full: nullProfile })),
    }),
    {
      name: 'global-storage',
    }
  )
)
