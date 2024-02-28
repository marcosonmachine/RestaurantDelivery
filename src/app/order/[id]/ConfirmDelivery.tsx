"use client";
import { confirmOrder } from "@/utils/clientRequest";
import { useState } from "react";

export default function ConfirmDelivery({orderId, status}: {orderId: string, status: string}) {
    const [mode, setMode] = useState(status!="Delivered")

    function handleConfirmClick(){
        confirmOrder(orderId)
        .then(()=>{
            setMode(false)
        })
    }
    return mode?
    (
        <button className="px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600" onClick={()=>handleConfirmClick}>
            Confirm Order
        </button>
    ) :
    (
        <button className="px-2 py-1 bg-gray-500 text-white rounded-md">
            Confirm Order
        </button>
    )
};