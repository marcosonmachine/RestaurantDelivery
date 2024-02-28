import Link from 'next/link'
import { jsonToUrl } from '../utils/utils'
import { use } from 'react'
import Image from 'next/image'

import { FilterBar, Rating, ToCart } from './clientComponents';
import { getDishes } from '@/utils/requests';


const Dish = ({ dish }:any) => 
{
  return (
  <div className="flex flex-col gap-3 border bg-white hover:shadow-xl border-gray-300 rounded p-4">
    <Link href={`/item/${dish.id}`}>
    <Image className="w-full h-48 object-cover" src={dish.image} alt={dish.name} width={500} height={300} />
    <h2 className="text-xl font-bold mt-2">{dish.name}</h2>
    <p className="text-sm text-gray-700">{dish.description}</p>
    </Link>
    <div className="flex items-center justify-between mt-4">
      <span className="text-gray-900 font-semibold">${dish.price.toFixed(2)}</span>
      <span className="text-sm text-gray-600">
        {dish.vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}
      </span>
    </div>
    <Rating rating={dish.rating} dishId={dish.id}/>
    <ToCart dishId={dish.id} />
    {/*going to write add more here*/}
  </div>
  );
}

const MainPage = ({ searchParams }:{ searchParams: any}) => {
  searchParams = { page: searchParams?.page ?? "1", categories: searchParams?.categories?? "Wok", sorting: searchParams?.sorting ?? "NameAsc", vegetarian: searchParams?.vegetarian?? "false" };

  const { dishes, pagination }= use(getDishes(searchParams))
  
  return (pagination == undefined || dishes == undefined )?(
  <>
  <FilterBar />
    <div className="flex h-screen">
      <div className="m-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Sorry!</h1>
        <p className="text-lg">
          We couldn&apos;t find any dishes that match your search. Please try again with different filters or check back later!
        </p>
      </div>
    </div>
  </>
  )
  :
    (<div className='flex flex-col'>
      {/*Filter Bar */}
      <FilterBar />
      {/* Dishes */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dishes?.map((dish: any) => (
            <Dish key={dish.id} dish={dish} />
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="container mx-auto p-4">
        <Pagination pagination={pagination} pageParams={searchParams} />
      </div>
    </div>
  );
};

const Pagination = ({ pagination, pageParams }:any) => {
  const { count, current } = pagination;
  const pages = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <div className="flex justify-center">
      <nav aria-label="Page navigation">
      {pages.map((page, i) => (
        <Link key={i} href={
          "/?"+ jsonToUrl({...pageParams, page: page})
        }>
        <button
          key={page}
          className={`px-3 py-2 mx-0.5 bg-white border border-gray-300 rounded ${
            page === current ? "font-bold" : ""
          }`}
        >
          {page}
        </button>
        </Link>
      ))}
      </nav>
    </div>
  );
};

export default MainPage;
