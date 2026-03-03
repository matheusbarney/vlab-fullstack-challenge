import Input from '../atoms/Input.tsx';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';


interface FormFieldProps {
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  name: string;
  label: string;
  placeholder?: string;
  type?: "text" | "password" | "checkbox" | "date" | "hidden";
}

export function FormField({
  register,
  errors,
  name,
  label,
  placeholder,
  type = "text"
}: FormFieldProps) {

  
  return (
    <div className="w-full py-4">
      <p className="pb-1 text-xl text-gray-800">{label}</p>
      <Input 
        register={register} 
        name={name} 
        type={type}
        placeholder={placeholder} 
      />
      {errors?.[name] && (
        <div className="text-red-500 text-x2">
          {errors[name]?.message as string}
        </div>
      )}
    </div>
  );
}

export default FormField;