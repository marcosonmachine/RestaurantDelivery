"use client"
import { use, useState, useEffect } from 'react'

import { getProfile, editProfile } from '@/utils/clientRequest';

export default function ProfileEdit() {
  const [profile, changeProfile] = useState<Record<string, string | number | string[] | number[]>>()
  useEffect(()=>{
    getProfile()
    .then((value)=>{
        changeProfile({...profile, ...value})
    })
  }, [])
   const handleSave = () => {
    editProfile(profile)
    .then(()=> changeProfile({...profile}))
  };


  return (
    <main className='min-h-screen items-center flex flex-cols'>
    <div className="max-w-md mx-auto my-4 p-8 bg-white rounded-md shadow-md">
      <h2 className="text-lg font-medium text-gray-800 mb-4">Edit Profile</h2>
      <div className="mb-4">
        <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={profile?.fullName as string}
          className="w-full border-gray-400 border rounded-md px-3 py-2"
          onChange={(e) => changeProfile({...profile, fullName:e.target.value})}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="birthDate" className="block text-gray-700 font-medium mb-2">
          Birth Date
        </label>
        <input
          type="date"
          id="birthDate"
          value={profile?.birthDate.toString().split('T')[0]}
          className="w-full border-gray-400 border rounded-md px-3 py-2"
          onChange={(e) => changeProfile({...profile, birthDate: e.target.value})}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={profile?.address as string}
          className="w-full border-gray-400 border rounded-md px-3 py-2"
          onChange={(e) => changeProfile({...profile, address: e.target.value})}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phoneNumber"
          value={profile?.phoneNumber as string}
          className="w-full border-gray-400 border rounded-md px-3 py-2"
          onChange={(e) => changeProfile({...profile, phoneNumber: e.target.value})}
        />
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => handleSave()}
        >
          Save
        </button>
      </div>
    </div>
    </main>
  );
}