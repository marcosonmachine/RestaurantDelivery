import Image from 'next/image'
import { cookies } from 'next/headers'

import React, { FormEvent, use } from "react";

import { getBasket } from "../../utils/requests";


//TODO: Do form validation with nextjs 
export default function CreateOrderPage({searchParams}: {searchParams: any}) {
  const cookieStore = cookies()
  const items = use(getBasket())
  const totalPrice = items?.reduce((acc:number, item:any) => acc + item.totalPrice, 0);

  return items===undefined || items.length==0?(
  <main className='flex flex-col h-screen items-center justify-center'>
    <div className="justify-center bg-white p-3 rounded-md">
      <Image className='self-center' alt='emptyCart' src={'https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png'} width={280} height={200} />
      <h1 className="text-3xl font-bold mb-8 p-3 rounded-md "> Oops! empty cart </h1>
    </div>
  </main>
  ):(
    <div className="grid grid-cols items-center justify-center h-max">
      <h1 className="text-3xl font-bold mb-4 bg-slate-100 rounded-md p-3 w-full text-center">Create Order</h1>
      <form className="flex flex-col w-full bg-white p-8 rounded-md gap-4" action="/api/purchase-form" method="post" encType='multipart/form-data'>
        <div className="mb-4 bg-gray-200 rounded-md p-2">
          <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
          <p className="text-gray-700">+7 9123456780</p>
        </div>
        <div className="mb-4 bg-gray-200 rounded-md p-2">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <p className="text-gray-700">{cookieStore.get("email")?.value}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Delivery Address:</label>
          <input
            id="address"
            name="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Address"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Delivery Time:</label>
          <input
            id='deliveryTime'
            name='deliveryTime'
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="datetime-local"
            required
          />
        </div>
        {items?.map((item:any, i:number) => (
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-50 rounded-md shadow-md">
          <Image src={item.image} alt={item.name} width={875} height={535} className="w-full h-48 object-cover" />
          <div className="px-2 py-2">
            <p>{i+1}. </p>
            <h2 className="text-lg font-bold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">${item.price}</p>
          </div>
        </div>
        ))} 
        {searchParams.message &&
        <div className='bg-slate-100 p-2 rounded-md font-bold'>
          <p className='text-red-600'>{searchParams.message}</p>
        </div>
        }
        <div className="flex justify-between items-center p-2 rounded-sm bg-slate-200">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >Confirm Order
          </button>
           <p className="text-gray-700 font-bold">Total: ${totalPrice}</p>
        </div>
      </form>
    </div>
  );
}