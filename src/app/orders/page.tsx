import Link from 'next/link'
import React, { use } from 'react';

import { getOrders } from '../../utils/requests';

import OrderBox from './OrderBox';


export default function Orders() {
    var orders = use(getOrders())

    return (
    <main className='min-h-screen h-full'>
    <div className="container mx-auto px-4 py-8 w-screen">
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mb-7" ><Link href='/purchase'>Add New Order</Link></button>
      <div className="flex justify-between items-center mb-8 bg-slate-50 p-2 rounded-md shadow-lg">
        <h1 className="text-2xl font-bold">Previous Orders</h1>
      </div>
      {orders?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {orders?.map((order:any) => (
            <OrderBox order={order} key={order.id} />
          ))}
        </ul>
      ) : (
        <p>No previous orders found.</p>
      )}
    </div>
    </main>
    );
}
