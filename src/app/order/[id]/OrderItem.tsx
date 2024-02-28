import Image from 'next/image'

export default function Orderitem( { dish }: any)
{
  console.log(dish)
    return (
    <div key={dish.id} className="flex items-center mt-2">
      <Image
        src={dish.image}
        alt={dish.name}
        className="w-12 h-12 rounded-full object-cover"
        width={200}
        height={100}
      />
      <div className="flex-1 ml-4">
        <div className="text-sm font-medium text-gray-900">
          {dish.name}
        </div>
        <div className="text-sm text-gray-500">
          {dish.amount} x {dish.price} = {dish.totalPrice}
        </div>
      </div>
    </div>
    )
}