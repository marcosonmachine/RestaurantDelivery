import Link from 'next/link'

import { format } from 'date-fns';

import OrderConfirm from './OrderConfirm'

export default function OrderBox({ order }: { order:any })
{
    return (
        <li key={order.id} className="p-4 bg-white shadow rounded">
          <Link href={`/order/${order.id}`}><h2 className="text-lg font-bold mb-2">Order #{order.id}</h2></Link>
          <p className="text-gray-500 mb-2">Order Time: {format(new Date(order.orderTime), "dd/MM/yyyy h:mm aa")}</p>
          <p className="text-gray-500 mb-2">Delivery Time: {format(new Date(order.deliveryTime), "dd/MM/yyyy h:mm aa")}</p>
          <p className="text-gray-500 mb-4">Status: {order.status}</p>

          <OrderConfirm status={order.status} id={order.id} />
         
          <p className="text-lg font-bold mt-4">Total Order Cost: ${order.price.toFixed(2)}</p>
        </li>
    )
}