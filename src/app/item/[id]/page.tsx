import {use} from 'react'
import Image from 'next/image';
import { getDishInfo } from '@/utils/requests';

export default function Page( {params, searchParams}:{ params: any, searchParams: any}){
   const dish = use(getDishInfo(params.id));
   return (
    <div className="w-screen h-screen flex ">
    <div className="h-1/2 w-1/2 mx-auto my-[8%]">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <Image src={dish.image} alt={dish.name} className="w-full h-64 object-cover" width={875} height={535} />
        <div className="px-4 py-2">
          <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
          <p className="text-gray-600 mb-4">{dish.description}</p>

          <div className="flex items-center mb-4">
            <div className="text-gray-700 font-bold mr-2">Price:</div>
            <div className="text-xl font-bold">${dish.price}</div>
          </div>

          <div className="flex items-center mb-4">
            <div className="text-gray-700 font-bold mr-2">Category:</div>
            <div className="text-lg">{dish.category}</div>
          </div>

          <div className="flex items-center mb-4">
            <div className="text-gray-700 font-bold mr-2">Rating:</div>
            <div className="text-lg">{dish.rating?.toFixed(1)??0} stars</div>
          </div>

          <div className="flex items-center mb-4">
            <div className="text-gray-700 font-bold mr-2">Vegetarian:</div>
            <div className="text-lg">{dish.vegetarian ? "Yes" : "No"}</div>
          </div>

          <div className="flex items-center">
            <div className="text-gray-700 font-bold mr-2">Nutrition:</div>
            <div className="text-lg">{dish.description} g</div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}