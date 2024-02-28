import { NextRequest, NextResponse } from 'next/server'

import { createOrder } from '@/utils/requests'

export async function POST(
  req: NextRequest,
) {

  const data = await req.formData()

  const deliveryTime = data.get("deliveryTime") as string
  const address = data.get("address") as string

  const request = await createOrder({ deliveryTime, address })

  if ( request.status != 200 )
  {
    return NextResponse.redirect(new URL(`/purchase?message=${request.response.data.message}`, req.url), 302) //Somehow this thing clears form data hahhahhaha
  }
  const url = req.nextUrl.clone()  
  url.pathname = '/'

  return NextResponse.redirect(url, 302)
}

