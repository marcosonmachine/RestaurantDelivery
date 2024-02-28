"use client";
import { useState } from 'react'

import { confirmOrder } from '../../utils/clientRequest';

export default function OrderConfirm({status, id}: {status: string, id: string}) 
{
    const [delivered, setDelivered] = useState(status == "Delivered")
    function confirmHandler(orderId: any) {
            confirmOrder(orderId)
            .then( ()=> { setDelivered(true) } )
    }
    return delivered ?  
        null 
            : 
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={() => confirmHandler(id)}>Confirm Delivery</button>
        
}
 
