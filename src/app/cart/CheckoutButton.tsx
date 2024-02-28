import Link from 'next/link'
export default function CheckoutButton({totalPrice}: {totalPrice: number}) {
    return (
    <div className="flex justify-end mt-8">
        <Link href="/purchase">
        <button
          className="bg-green-500 text-white hover:bg-green-600 rounded-md px-4 py-2"
        >
          Checkout
        </button>
        </Link>
        <div className="text-lg font-bold ml-4">${totalPrice}</div>
    </div>
    )
}