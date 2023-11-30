import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
const nullProfile = {
  profile: {
    id: 1,
    username: 'Benji_official',
    email: 'benjithedog@gmail.com',
    petName: 'Benji',
    password: '12345',
    petType: 'Goldendoodle',
  },
  posts: [
    {
      id: 1,
      text: 'I love toys!',
      user: 2,
      username: 'm_dog',
      petName: 'Maxy',
      petType: 'Yorkshire Terrier',
      comments: [
        {
          id: 1,
          text: 'I will be there!',
          user: 1,
          username: 'Benji_official',
          petName: 'Benji',
          petType: 'Goldendoodle',
        },
      ],
    },
  ],
  profiles: [
    {
      id: 1,
      username: 'Benji_official',
      petName: 'Benji',
      petType: 'Goldendoodle',
    },
    {
      id: 2,
      username: 'm_dog',
      petName: 'Maxy',
      petType: 'Yorkshire Terrier',
    },
  ],
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
