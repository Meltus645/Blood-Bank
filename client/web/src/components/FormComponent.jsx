import { useEffect } from 'react';
import {useForm} from 'react-hook-form';

const FormComponent = ({fields =[], onSubmit, className ='', children, title, defaultValues ={}}) => {
  const {reset, handleSubmit, formState: {errors}, register, setValue} =useForm();

  useEffect(() =>{
    [...Object.keys(defaultValues)].map(key =>setValue(key, defaultValues[key]));
  }, [defaultValues]);

  const handleSubmission =async values =>{
    try {
      const response =await onSubmit(values);
      reset();
    } catch ({message}) {
      alert(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmission)} className={`flex flex-col gap-4 py-6 px-8 bg-white rounded-lg shadow ${className} min-w-[400px] `}>
      {title &&(<h2 className='text-center font-[600] text-[#444444] pt-2 text-3xl uppercase'>{title}</h2>)}
      {fields.map((field, index) =>(<div key ={index} className='flex gap-2'>
        {field.map(({name, type, label, placeholder, validations, options}) =>(<div key={name} className='flex flex-col gap-2 flex-1 w-full'>
          {label && (<label htmlFor={name} className='block font-[500] text-[#555555] text-lg'>{label}</label>)}
          {
            type.toLowerCase() =='select'? (<select defaultValue={''} {...register(name, validations)} className={`block py-3 px-5 border-[1px] border-solid focus:border-blue-400 ${errors[name]? 'border-red-400': 'border-gray-300'} rounded transition-all`}>
              {options.map(({value, label, disabled}, index) =><option key ={index} value={value} disabled ={disabled || false}>{label}</option>)}
            </select>
            ) :(<input type={type || 'text'} {...register(name, validations)} placeholder={placeholder} className={`block ${type =='file'? 'py-2' : 'py-3'} px-5 border-[1px] border-solid focus:border-blue-400 ${errors[name]? 'border-red-400': 'border-gray-300'} rounded transition-all`}/>)
          }
          {errors[name] && (<small className='text-red-400 block'>{errors[name]?.message || errors[name]}</small>)}
        </div>))}
      </div>))}
      {children}
    </form>
  )
}

export default FormComponent;