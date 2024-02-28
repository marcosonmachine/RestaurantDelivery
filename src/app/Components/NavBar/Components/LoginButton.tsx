import Link from 'next/link'

export default function LoginButton() {return (
    <div className="flex max-sm:flex-col gap-4 px-4 items-center">
        <Link href='/login' className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border rounded" >
        Login
        </Link>
    </div>
)}