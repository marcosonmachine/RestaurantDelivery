import Image from 'next/image'

import ItemCounter from './ItemCounter'

export default function DishBox({item, item_number}: any) 
{
    return(
        <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-white rounded-md shadow-md">
          <Image src={item.image} alt={item.name} width={875} height={535} className="w-full h-48 object-cover" />
          <div className="px-2 py-2">
            <p>{item_number+1}. </p>
            <h2 className="text-lg font-bold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">${item.price}</p>
            <ItemCounter id={item.id} itemAmount={item.amount} itemPrice={item.price}/>
          </div>
        </div>
)}