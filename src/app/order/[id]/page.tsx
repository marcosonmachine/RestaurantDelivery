import { use } from 'react'

import { getOrder } from '@/utils/requests';

import ConfirmDelivery from './ConfirmDelivery';
import OrderItem from './OrderItem';
import OrderDetails from './OrderDetails';

export default function Page ({ params }: any) {
  const order = use(getOrder(params.id));
  return (
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center border-b-2 border-gray-200 py-2">
              <h3 className="text-lg font-medium text-gray-900"> Order: {order.id}</h3>
            <ConfirmDelivery orderId={order.id} status={order.status} />
            </div>
            <div className="py-4">
            <OrderDetails order={order} />
            <div className="mt-4">
              <div className="text-sm font-medium text-gray-600"> Items: </div>
              {order.dishes.map( (dish: any, i:number) => <OrderItem key={i} dish={dish} /> )}
            </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <div className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
              <div className="flex items-center justify-center w-full rounded-md border border-transparent px-4 py-2 bg-green-500 text-base font-medium text-white shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:px-6">
                Total: {order.price}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
