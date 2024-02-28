"use client";
import Link from 'next/link'
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { FormResponsiveButton, InputModule, FunctionalButton, CustomGrayForm } from "../GlobalComponents/components"
import { validateEmail, validatePassword} from '../../utils/utils'
import { login } from '../../utils/clientUtils'
import { loginAPI } from '../../utils/clientRequest'

export default function Login() {
  const router = useRouter();

  const {register, watch, formState , handleSubmit, setError} = useForm({
    mode: "onChange",
  })

  const [callBackError, setCallBackError] = useState(<p></p>);

  const submitHandler = async (data: Record<string, any>)=>
  {
    setCallBackError(<p></p>)
    try {
      const response = await loginAPI(data)
      login( data.email, response.token );
      router.refresh()
      router.replace("/")
    }
    catch(e) { 
      console.error(e);
      setCallBackError(<p className='text-red-600'>Invalid username or password</p>);
    }
  }

  return (
    <CustomGrayForm submitHandler={handleSubmit(submitHandler)}>
      <InputModule formName="email" formProps={{register, formState}} registerProps={{ required:true, validate:validateEmail }} inputType='text' inputProps={{placeholder: "Enter email address"}}/>
      <InputModule formName="password" formProps={{register, formState}} registerProps={{ required:true, validate:validatePassword, minLength:6 }} inputType='password' inputProps={{placeholder: "Enter your password"}}/>
      { callBackError }
      <div className='flex flex-col space-y-2'>
        <FormResponsiveButton buttonName="Login" formState={formState}/>
        <span className="font-bold mx-auto">Or</span>
        <Link href='/registration' className="hover:bg-green-600 hover:text-white bg-white text-black font-bold py-2 px-4 border border-gray-700 rounded m-auto shadow">
          Register
        </Link>
      </div>
    </CustomGrayForm>
  )
}