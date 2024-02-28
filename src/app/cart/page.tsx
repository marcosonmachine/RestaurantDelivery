import { use } from 'react'
import Image from 'next/image'

import { getBasket } from '../../utils/requests';

import CheckoutButton from './CheckoutButton';
import DishBox from './DishBox';

export default function Cart () {
  const items = use(getBasket())
  const totalPrice = items?.reduce((acc:number, item:any) => acc + item.totalPrice, 0);

  return (
    <main className="h-max flex item-center justify-center">
    <div className="p-6 rounded-md container mx-auto py-8 min-h-screen self-center">
      {items?.length === 0 ? (
        <div className='flex flex-col item-center justify-center p-2 gap-6 bg-white rounded-lg shadow-md'>
        <Image className='self-center' alt='emptyCart' src={'https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png'} width={200} height={200} />
        <h1 className="text-3xl font-bold mb-8 p-3 text-center "> Oops! empty cart </h1>
        </div>
      ) : (
      <>
        <h1 className="text-3xl font-bold mb-8 bg-slate-50 p-3 rounded-md shadow-md">Your Cart</h1>
        <div className="flex flex-col m-auto p-auto gap-4">
            {items?.map((item:any, i:number) => ( <DishBox key={i} item={item} item_number={i} /> ))}
        </div>
        <CheckoutButton totalPrice={totalPrice}/>
      </>
      )}
    </div>
    </main>
  );
};
