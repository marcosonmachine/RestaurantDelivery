import Link from 'next/link'
import { cookies } from 'next/headers'

import UserOptions from './Components/UserOptions'
import ProfileIcon from './Components/ProfileIcon'
import LogOutButton from './Components/LogOutButton'
import LoginButton from './Components/LoginButton'

export default function Navbar(){
    const cookieStore = cookies()
    const token = cookieStore.has("email");
    
    return (
        <nav 
        className="flex gap-6 w-full py-2 bg-white shadow-lg justify-between overflow-clip">
            <div className="flex gap-4 px-4 items-center">
                <Link href='/' className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" >
                    Delivery.Eats
                </Link >
                
                <div className='max-md:hidden'>
                { token ?
                    <UserOptions />
                    :
                    null
                }
                </div>
            </div>
            <div className='sm:hidden'>
                <a href='#' id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="peer inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600" type="button"> 
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"></path>
                    </svg>
                </a>
                <a className='absolute -z-10 top-2 right-0 peer-focus:z-20 p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"></path>
                    </svg>
                </a>
                <div className='absolute flex-col left-0 top-14 w-screen items-center hidden bg-white p-6 gap-5 rounded-md shadow-md peer-focus:flex hover:flex'>
                    <UserOptions col={true}/>
                    <div className='flex flex-col items-center'>
                        <ProfileIcon/>
                    </div>
                    <div className='flex flex-col items-center'>
                        <LogOutButton/>
                    </div>
                </div>
            </div>
        {
            token?
            (
            <>
                <div className="flex gap-4 px-4 items-center max-sm:hidden">
                    <ProfileIcon/> 
                    <LogOutButton />
                </div>
            </>
            )
                :
            <LoginButton />
        }
        </nav>
    )};