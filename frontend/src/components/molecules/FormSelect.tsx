import type { UseFormRegister, FieldErrors } from 'react-hook-form';

interface FormSelectProps {
  register: UseFormRegister<any>;
  errors?: FieldErrors;
  name: string;
  label: string;
  options: { value: string; label: string }[];
}

export function FormSelect({ register, errors, name, label, options }: FormSelectProps) {
  return (
    <div className="w-full py-4">
      <p className="pb-1 text-xl text-gray-800">{label}</p>
      <select
        {...register(name)}
        className="w-full rounded-md bg-neutral-100 px-5 py-4 text-xl shadow-xs focus:ring-1 focus:ring-teal-800 focus:outline-none"
      >
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {errors?.[name] && (
        <div className="text-red-500 text-x2">
          {errors[name]?.message as string}
        </div>
      )}
    </div>
  );
}

export default FormSelect;