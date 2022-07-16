import { useId } from "react";
import { StyledIcon } from '@styled-icons/styled-icon';

type InputProps = {
  setInput: (value: string) => void;
  label?: string;
  placeholder?: string;
  Icone?: StyledIcon;
  type: 'text' | 'number';
  value: string;
}

export function Input({ setInput, label, type, Icone, placeholder, value } : InputProps) {
  const id = useId();

  return (
    <div className="flex flex-col w-full mb-3 relative">
      <label 
        htmlFor={id}
        className="mb-1 text-slate-900"
      >
        {label}
      </label>
      <input 
        id={id} 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={e => setInput(e.currentTarget.value)}
        className={`${Icone ? 'pl-7 ' : ''}
          text-zinc-900 border border-zinc-400 text-sm py-2 px-2 rounded-md outline-none focus:ring-2 focus:ring-offset-2 ring-offset-white focus:ring-blue-500`
        }
      />
      {
        Icone && <Icone size="16" title={label} className="absolute bottom-[0.6rem] left-2 text-zinc-600" />
      }
    </div>    
  );
}