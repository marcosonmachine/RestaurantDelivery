import { format } from "date-fns";

export default function OrderDetails({ order } : any) {

    return (
        <>
         <div className="text-sm font-medium text-gray-600">
                Created at:
                <span className="ml-1 text-sm text-gray-900">
                    {format(new Date(order.orderTime), "dd MMM yyyy HH:mm:ss")}
                </span>
            </div>
            <div className="text-sm font-medium text-gray-600">
                  Delivery Time:
                <span className="ml-1 text-sm text-gray-900">
                    {format(new Date(order.deliveryTime), "dd MMM yyyy HH:mm:ss")}
                </span>
            </div>

            <div className="text-sm font-medium text-gray-600">
                Delivery Address:
                <span className="ml-1 text-sm text-gray-900"> {order.address}</span>
            </div>

            <div className="text-sm font-medium text-gray-600">
                Order Status:
                <span className="ml-1 text-sm text-gray-900"> {order.status}</span>
            </div>
        </>
    )
}