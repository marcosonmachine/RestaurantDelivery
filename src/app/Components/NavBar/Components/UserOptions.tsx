import Link from 'next/link'
import CartIcon from "./CartIcon"

const UserOptionChildren = () => 
(
    <>
    <Link href='/' className='hover:text-gray-600'>
            Menu
        </Link>
        <Link href='/orders' className='hover:text-gray-600'>
            Orders
        </Link>
        <div className='flex gap-2 items-center'>
            <Link href='/cart' className='hover:text-gray-600'>
                Cart
            </Link>
            <CartIcon />
        </div>
    </>
)

export default function UserOptions({col=false}:{col?: boolean})
{
    return col ? (
        <div className="flex flex-col gap-4 px-4 items-center">
            <UserOptionChildren/>
        </div>
    ):
    (
        <div className="flex gap-4 px-4 items-center">
            <UserOptionChildren/>
        </div>
    )
 
}