"use client";
import { useState } from 'react'
import { removeFromCart, addToCart } from "../../utils/clientRequest";
import { useRouter } from 'next/navigation'

export default function ItemCounter({ id ,itemAmount, itemPrice } : { id: string, itemAmount: number, itemPrice: number }) {
    const router = useRouter()
    const [ count, setCount ] = useState<{items:number, itemCost: number}>({items: itemAmount, itemCost: itemPrice})

    const handleIncreaseAmount = (id:any) => {
    addToCart(id)
    .then (
        () => setCount( { items : count.items + 1, itemCost: count.itemCost * (count.items+ 1) }),
    )
    };

  const handleDecreaseAmount = (id:any) => {
    removeFromCart(id)
    .then (
        () => { 
            if(count.items != 1)
                setCount( { items : count.items - 1, itemCost: count.itemCost * (count.items - 1) })
            else 
                handleRemoveItem(id)
        }
    )
  };

  const handleRemoveItem = (id:any) => {
    removeFromCart(id, true)
    .then(
        () => router.refresh()
    )
  };


    return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg w-8 h-8 flex items-center justify-center"
          onClick={() => handleDecreaseAmount(id)}
        >
          <span>-</span>
        </button>
        <span className="mx-4">{count.items}</span>
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-lg w-8 h-8 flex items-center justify-center"
          onClick={() => handleIncreaseAmount(id)}
        >
          <span>+</span>
        </button>
      </div>
      <button
        className="bg-red-500 text-white hover:bg-red-700 rounded-md p-2 h-8 flex items-center justify-center"
        onClick={() => handleRemoveItem(id)}
      >
        <span>Remove</span>
      </button>
    </div>
    )
}