
interface InputProps {
    name?: string;
    type?: "text" | "password" | "checkbox" | "date" | "hidden";
    placeholder?: string;
    register: any; 
}

function Input({ name, type = "text", placeholder, register }: InputProps) {
  return <input {...register(name)} name={name} type={type} className="w-full rounded-md bg-neutral-100 px-5 py-4 text-xl shadow-xs focus:ring-1 focus:ring-teal-800 focus:outline-none" 
  placeholder={placeholder} />;
}

export default Input;