import { 
  FieldValues,RegisterOptions, UseFormReturn
} from 'react-hook-form';

import Link from 'next/link'
import { camel_to_word } from '../../utils/utils';
import { Children, ReactNode } from 'react';
import { FormState } from 'react-hook-form';

type UseFormReturnOptional<TFieldValues extends FieldValues = FieldValues, TContext = any> = Partial<UseFormReturn>

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{}

interface InputModuleProps
{
  formName: string;
  registerProps?: RegisterOptions<FieldValues, any>;
  formProps?: UseFormReturnOptional<FieldValues , any>;
  inputProps?:  InputProps 
  inputType?: "text" | "password"
  children?: React.ReactElement | undefined
}

function InputModule
(
  {
    formName,
    registerProps,
    formProps,
    inputProps,
    inputType,
    children
  }: InputModuleProps
)
{
  return (
    <div>
      <label id="large-input" className="block mb-2 text-sm font-medium text-gray-900 ">
      {(camel_to_word(formName))}
      </label>
      <input
          type={inputType} id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 "
        {...formProps?.register?.(formName, registerProps)??[]} 
        {...inputProps??[]}
        />
      { formProps?.formState?.errors[formName]  && <span>Required field</span> }
      { children??"" }
    </div>
   ) 
}

interface FormResponsiveButtonProps {
  buttonName: string 
  formState?: FormState<FieldValues>
}
function FormResponsiveButton
(
  {
    buttonName,
    formState
  }: FormResponsiveButtonProps
)
{
  return (formState?.isValid)?
   (<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded m-auto " type="submit" disabled={false}>
      { buttonName }
    </button>)
    :
    (<button className="bg-gray-500 text-white font-bold py-2 px-4 border border-gray-700 rounded m-auto " type="submit" disabled={true}>
      { buttonName }
    </button>)
    ??
    <></>
}


function FunctionalButton(func: Function, name: string,referLink: string, isVisible?: boolean)
{
  return (
  <div>
  <a onClick={func()}>
    <Link href={referLink}>
      {name}
    </Link> 
    {isVisible && (
        <svg
          className="animate-spin h-5 w-5 mt-3"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            fill="currentColor"
          ></path>
        </svg>
      )}
  </a>
  </div>
  )
}

interface SelectionModuleInterface {
  name: string,
  list: any[],
  registerProps?: RegisterOptions<FieldValues, any>;
  formProps?: UseFormReturnOptional<FieldValues , any>;
}

function SelectionModule( { name, list, registerProps, formProps }: SelectionModuleInterface )
{
  return (
  <div>
      <label id="large-input" className="block mb-2 text-sm font-medium text-gray-900 ">
      {name}
      </label>
      <select 
        className="
        bg-gray-50 border border-gray-300 
        text-gray-900 text-sm rounded-lg  mb-6 
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
        " 
        {...formProps?.register?.(name, registerProps)??[]} 
      >
        {
          list.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
            )
          )
        }
      </select>
    </div>
  )
}

interface formInterface {
  submitHandler: ()=>{},
  children: ReactNode
}

function CustomGrayForm({ submitHandler, children }: formInterface)
{
  return (
  <div className="w-screen h-screen flex flex-col justify-center items-center gap-6 my-28">
    <form onSubmit={submitHandler} className="p-10 bg-white rounded-xl drop-shadow-lg space-y-5">
        {children}
    </form>
  </div>
  )
}

export { InputModule, FormResponsiveButton, FunctionalButton, SelectionModule, CustomGrayForm }
