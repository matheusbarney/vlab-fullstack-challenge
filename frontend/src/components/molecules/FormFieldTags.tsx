// molecules/TagsInput.tsx
import { useState, type KeyboardEvent } from 'react';

type FormFieldTagsProps = {
  value: string[];
  onChange: (tags: string[]) => void;
  label?: string;
  error?: string;
};

export function FormFieldTags({ value, onChange, label, error }: FormFieldTagsProps) {
  const [input, setInput] = useState('');

  const addTag = () => {
    // Remoção de espaços
    const trimmed = input.trim();
    // Checagem de tag vazia ou duplicada. Após isso, esvaziamos o setInput
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
    }
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault(); 
      addTag(); // adiciona input atual como tag
    } else if (e.key === 'Backspace' && input === '') {
      onChange(value.slice(0, -1)); // remove última tag
    }
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full py-1">
      {<label className="pb-1 text-xl text-gray-800">{label}</label>}
      <div className={"flex flex-wrap rounded-md bg-neutral-100 px-5 py-2 shadow-xs focus:ring-1 focus:ring-teal-800 focus:outline-none 'border-slate-300"}>
        {value.map((tag, i) => (
          <span key={i} className="flex items-center gap-1 bg-neutral-300 text-slate-700 text-md px-2 py-0.5 mx-0.5 rounded-full">
            <p className="px-2">{tag}</p>
            <button type="button" onClick={() => removeTag(i)} className="hover:text-red-500 font-bold flex justify-center w-6">×</button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag} // confirma ao sair do campo
          placeholder={value.length === 0 ? 'Adicione tags (Enter ou vírgula)' : ''}
          className="flex-1 min-w-24 outline-none py-2 text-xl bg-transparent"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}