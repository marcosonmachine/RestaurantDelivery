import Link from 'next/link'
import { cookies } from 'next/headers'

export default function ProfileIcon(){
    const cookieStore = cookies()
    if(!cookieStore.has("email"))
        return null
    const token = cookieStore.get("email")?.value
    return (
        <Link href='/profile'>
                {token}
        </Link>
    )
}