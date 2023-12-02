// Import necessary libraries and components
import { useRouter } from 'next/navigation'
import { FaCheck } from 'react-icons/fa'
import { IoMdPersonAdd } from 'react-icons/io'
import { IoPersonRemove } from 'react-icons/io5'
import { useGlobalStore } from '../../_util/store'
import { IconButton, PrimaryButton } from '../Buttons/Buttons'
import ProfilePicture from '../ProfileAssets/ProfilePicture'
const SearchPet = ({ searchTerm, searchPets, handleClosePopup, isFriend = false, handleAddFriend }) => {
  const profile = useGlobalStore(state => state.profile_full.profile)
  const router = useRouter()
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 px-6'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full'>
        {isFriend ? (
          <>
            {searchTerm === 'Friends' ? (
              <h2 className='text-2xl font-bold mb-4'>Friends</h2>
            ) : (
              <h2 className='text-2xl font-bold mb-4'>Pending Friends</h2>
            )}
          </>
        ) : (
          <h2 className='text-2xl font-bold mb-4'>
            Search Results for: <span className='font-normal'>&quot;{searchTerm}&quot;</span>
          </h2>
        )}

        {searchPets.length > 0 ? (
          <ul className='flex flex-col gap-3 max-h-[340px] overflow-y-auto'>
            {searchPets.map((petUser, index) => {
              console.log(petUser.pets_data_1)
              return (
                <li key={index} className=' flex gap-4 items-center border-b border-neutral-300 pb-3'>
                  <ProfilePicture username={isFriend ? petUser.pets_data_1.username : petUser.username} size={40} />
                  <p
                    className='text-lg font-semibold cursor-pointer hover:underline'
                    onClick={() => {
                      router.push(`/profile/${petUser.username}`)
                    }}
                  >
                    {isFriend ? petUser.pets_data_1.petname : petUser.petname}
                  </p>
                  <p
                    className='text-lg font-normal text-neutral-500 cursor-pointer hover:underline'
                    onClick={() => {
                      router.push(`/profile/${petUser.username}`)
                    }}
                  >
                    @{isFriend ? petUser.pets_data_1.username : petUser.username}
                  </p>
                  {isFriend && (
                    <>
                      {searchTerm === 'Friends' ? (
                        <div onClick={() => handleAddFriend(petUser.pets_data_1.username, profile.username, 'remove')}>
                          <IconButton icon={<IoPersonRemove />} />
                        </div>
                      ) : (
                        <div className='flex gap-2 items-center'>
                          <div onClick={() => handleAddFriend(petUser.pets_data_1.username, profile.username, 'accepted')}>
                            <IconButton icon={<IoMdPersonAdd />} />
                          </div>
                          <div onClick={() => handleAddFriend(petUser.pets_data_1.username, profile.username, 'decline')}>
                            <IconButton icon={<IoPersonRemove />} />
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </li>
              )
            })}
          </ul>
        ) : (
          <p>No matching pet users found.</p>
        )}
        <div onClick={handleClosePopup} className='mt-5'>
          <PrimaryButton text={'Close'} />
        </div>
      </div>
    </div>
  )
}

export default SearchPet
