"use client";
//TODO: Write an api for cart count instead of client parsing
// GlobalContext is cringe
import { useState, useEffect } from "react";
import { getBasket } from "@/utils/clientRequest";

export default function CartIcon() {
    
    const [cartCount, setCartCount] = useState(0)
    
    useEffect(()=>{
        const interval = setInterval( () =>
        getBasket()
        .then(
            (value) => {
                const count = value?.reduce((accumulator:number, item: any)=> accumulator + item.amount, 0)
                if(count!=cartCount)
                    setCartCount(count)
            }
        ), 5000) // Websockets maybe? 
        return () => clearInterval(interval)
    }, [])

    return (
        (cartCount<=0)?<></>:
      <div className="relative inline-block">
        <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
            <span className="text-white text-sm font-medium">{cartCount}</span>
        </div>
      </div>
    );
};
