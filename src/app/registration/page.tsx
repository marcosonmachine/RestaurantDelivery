"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from 'react'

import PasswordStrengthBar from "react-password-strength-bar";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";

import { FormResponsiveButton, InputModule, SelectionModule, CustomGrayForm } from '../GlobalComponents/components'
import { validateEmail, validatePassword } from "../../utils/utils";
import { login } from "../../utils/clientUtils";
import { registerAPI } from '../../utils/clientRequest';


const genderOptions = [
  "Male", // Misgenderism within API
  "Female",
  "Gender Binary",
  "Gender Expression",
  "Gender Normative",
  "Cisgender",
  "Gender Identity",
  "Genderqueer",
  "Transgender"
];


const RegistrationForm = () => {
  const router = useRouter();

  const [callBackError, setCallBackError] = useState(<p></p>);

  const {register, watch, formState, handleSubmit, setError} = useForm({
    mode: "onChange",
  })

  const  submitHandler = async (data: Record<string, any>)=>
  {
    delete data["confirmPassword"];
    setCallBackError(<p></p>)
    try {
      const response = await registerAPI(data)
      login(data.email, response.data.token);
      router.refresh();
      router.replace('/');
    }
    catch(e){ 
      console.error(e);
      setCallBackError(<p className='text-red-600'>Failed to register</p>);
      false;
    }
   }

 return (
    <CustomGrayForm submitHandler={handleSubmit(submitHandler)}>
      <InputModule formName="fullName" registerProps={{required:true}} formProps={{register, formState}} inputProps={{placeholder: "Enter your full name"}}/>
      <InputModule formName="email" registerProps={{required:true, validate:validateEmail}} formProps={{register,formState}} inputProps={{placeholder: "Enter your email"}} />
      <InputModule formName="address" registerProps={{required:true}} formProps={{register, formState}} inputProps={{placeholder: "Confirm password"}} />
      <InputModule formName="phone" registerProps={{required:true, validate: (val) => {return (!isPossiblePhoneNumber(val))?"Invalid phone format":undefined} }} formProps={{register, formState}} inputProps={{placeholder: "Confirm password"}} />
      <InputModule formName="birthDate" registerProps={{required:true, valueAsDate: true, max: new Date().toISOString().split('T')[0]}} formProps={{register, formState}} inputProps={{placeholder: "DOB", type: "date", max: new Date().toISOString().split('T')[0]}} />
      <div>
       <InputModule formName="password" registerProps={{required:true, validate: validatePassword, minLength:8}} formProps={{register, formState}} inputProps={{placeholder: "Enter a password", type:"password"}}/>
       <PasswordStrengthBar password={watch("password")} />
       <InputModule formName="confirmPassword" registerProps={{required:true, validate:(val: string)=> { if(val!=watch("password"))return "no match" } }} formProps={{register, formState}} inputProps={{placeholder: "Confirm password", type: "password"}} />
      </div>
      <SelectionModule name="Gender" list={genderOptions} formProps={{register}}/>
        { callBackError }
      <FormResponsiveButton buttonName="Register" formState={formState} />
    </CustomGrayForm>
  );
};

export default RegistrationForm;