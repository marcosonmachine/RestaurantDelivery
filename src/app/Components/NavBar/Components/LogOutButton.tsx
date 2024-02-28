"use client";
import Link from 'next/link'
import { useRouter } from 'next/navigation';

import { deleteCookie } from '@/utils/clientUtils';

export default function LogOutButton() {
    const router = useRouter();
    const logoutHandler = ()=>
    { 
        deleteCookie("token", "/"); 
        deleteCookie("email", "/"); 
        router.refresh()
        router.replace('/login');
    }
    return (
    <div onClick={logoutHandler}>
        <Link href='/login' className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded" >
            Log Out
        </Link>
    </div>
    )
}