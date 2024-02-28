'use client';
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from 'react'

import { jsonToUrl } from "../utils/utils";
import { checkRateAccess, setDishRating, addToCart, removeFromCart, getBasket } from "../utils/clientRequest";
import { getCookie } from "../utils/clientUtils";
import { camel_to_word } from "../utils/utils";

export function FilterBar()
{
    const router = useRouter()
    const searchParamsInt = useSearchParams()

    const searchParams = 
    ({ 
        page: searchParamsInt.get('page') ?? "1", 
        categories: searchParamsInt.getAll('categories') ?? "Wok", 
        sorting: searchParamsInt.get('sorting') ?? "NameAsc", 
        vegetarian : searchParamsInt.get('vegetarian') ?? "false" 
    });
    const handleFilterChange = (e: any) => {
        if(e.target.name == 'categories')
        {
           const value = searchParams.categories.includes(e.target.value)
          ? searchParams.categories.filter((category) => category !== e.target.value)
          : [...searchParams.categories, e.target.value];
        router.replace(
          "/?" +
            jsonToUrl({ ...searchParams, [e.target.name]: value, page: 1 })
        );
          return 
        }
        ( e.target.name == 'vegetarian' )?
        router.replace('/?'+jsonToUrl({...searchParams, [e.target.name]: e.target.checked, page:1}))
        :
        router.replace('/?'+jsonToUrl({...searchParams, [e.target.name]: e.target.value, page:1}))

    };

    return (
      <div className="bg-gray-300 p-4 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-wrap">
            <div className="relative inline-block">
            <button className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-400 rounded shadow peer">Categories</button>
            <div className="bg-transparent h-11 w-32 absolute top-0 left-0 z-[-1] peer-focus:z-10"/>
              <div className="absolute z-[-1] bg-white border border-gray-400 rounded py-2 mt-1 w-48 opacity-0 hover:opacity-100 hover:z-10 peer-focus:opacity-100 peer-focus:z-10 ">
              {["Wok", "Pizza", "Soup", "Dessert", "Drink"].map((category) => (
              <label
                key={category}
                className="flex items-center mr-4 mb-2 cursor-pointer p-2"
              >
                <input
                  type="checkbox"
                  name="categories"
                  value={category}
                  checked={searchParams.categories.includes(category)}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <span className="text-gray-700">{category}</span>
              </label>
            ))}
          </div>
          </div>
          <div>
            <select
              name="sorting"
              value={searchParams.sorting}
              onChange={handleFilterChange}
              className="w-full sm:w-auto bg-white border border-gray-300 rounded p-2 ml-0 sm:ml-4"
            >
            {["NameAsc", "NameDesc", "PriceAsc", "PriceDesc", "RatingAsc", "RatingDesc"].map((order, i)=>(
              <option key={i} value={order}>{camel_to_word(order)}</option>
            ))} 
            </select>
          </div>
          <div className='mx-3 my-auto'>
            <label
              htmlFor="vegetarian"
              className='relative inline-flex items-center cursor-pointer'
            >
              <input
                type="checkbox"
                name="vegetarian"
                id="vegetarian"
                checked={searchParams.vegetarian=='true'}
                onChange={handleFilterChange}
                className="hidden peer"
                value=""
              />
              <div className="w-11 h-6 bg-green-500 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
              <span className="ml-3 text-sm font-medium text-black">{searchParams.vegetarian=='true' ? 'Vegetarian' : 'Non-Vegetarian'}</span>
            </label>
          </div>
          </div>
        </div>
      </div>
)}

export function Star({ value, pos, setRating, canSetRating, size=5 }:{ value: number, pos: number, setRating: Function, canSetRating: boolean, size?:number })
{
  const hover = (canSetRating)?"hover:w-7 hover:h-7":""
  if(value==0)
    return(
    <svg key={pos} onClick={()=>(canSetRating)?setRating(pos+1):null} className={`w-5 h-5 ${hover}`} fill='currentColor' id={String(pos)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
    )
  return (
    <svg key={pos} onClick={()=>(canSetRating)?setRating(pos+1):null} className={`w-5 h-5 ${hover}`} id={String(pos)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <defs>
        <linearGradient id={"Gradient"+value}>
          <stop offset={value + '%'} stopColor="gold" stopOpacity="1"/>
          <stop offset={value + '%'} stopColor="#e2e8f0" stopOpacity="1"/>
        </linearGradient>
      </defs>
      <path fill={"url(#Gradient"+value+")"} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  )
}

export function Rating({rating, dishId}:{rating: number, dishId:string})
{
  const [canRate, setCanRate] = useState(false)
  useEffect(() => {
    if(getCookie("email")!=undefined)
      checkRateAccess(dishId)
    .then((value)=>{
      setCanRate(value)
    })
    else 
      setCanRate(false)
  },
   // YEAH I AM GOING TO USE IT, TO JUST REFRESH mostly**
  )
  const setRating = (pos:number) =>{
    setDishRating(dishId, pos)  
    setCanRate(false) // Just making it false if the api fixes itself else user can do rate multiple times anyways
  }

  if(rating>5 || rating<0)
    return null 
  let Stars: any[] = []; let tempRate = rating;
  for(let i=0; i<10; i++)
  {
    Stars.push(Star({value:(tempRate>=1)?100:Math.floor(tempRate*100), pos:i, setRating: setRating, canSetRating:canRate}))
    tempRate -= 1;
  }
  return (
    <div className="flex items-center bg-white">
      {...Stars} 
    </div>
  )
}

export function ToCart({dishId}:{dishId: string})
{
  const [cookie, setCookie] = useState(false)
  const [quantity, setCount] = useState(0)

  useEffect(()=>{

  if(getCookie("email")!=undefined)
  {
    setCookie(true)
    getBasket()
      .then(
      (value) =>
        {
          const match = value?.find((dish:any)=>dish.id==dishId)
          if(match != undefined)
          {
            setCount(match.amount)       
          }
        }
      )
  }
  else 
    setCookie(false)

  }, [])

  if(!cookie)
    return (<></>)
  
  const handleIncrease = () =>
  {
    addToCart(dishId).then(()=>setCount(quantity+1))
  }
  const handleDecrease = () =>
  {
    removeFromCart(dishId).then(()=>setCount(quantity-1))
  }

  return (
    <div className="flex items-center justify-self-center place-self-center mt-auto">
    { (quantity>0) ? (
      <div className="flex items-center space-x-4">
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8"
          onClick={()=>handleDecrease()}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-full w-8 h-8"
          onClick={()=>handleIncrease()}
        >
          +
        </button>
      </div>
    ) : (
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={()=>handleIncrease()}
      >
        Add to Cart
      </button>
    )}
  </div>

    )
}
