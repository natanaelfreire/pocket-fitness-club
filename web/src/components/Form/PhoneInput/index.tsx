import { useId } from "react";
import InputMask from "react-input-mask";
import { StyledIcon } from '@styled-icons/styled-icon';

type PhoneInputProps = {
  setInput: (value: string) => void; 
  label: string;
  placeholder?: string;
  Icone?: StyledIcon;
  value: string;
}

export function PhoneInput({ setInput, label, Icone, placeholder, value } : PhoneInputProps) {
  const id = useId();
  
  return (
    <div className="flex flex-col w-full mb-3 relative">
      <label 
        htmlFor={id}
        className="mb-1 text-slate-900"
      >
        {label}
      </label>
      <InputMask 
        id={id} 
        mask="(99) 99999-9999" 
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={e => setInput(e.currentTarget.value)} 
        className={`${Icone ? 'pl-7 ' : ''}
          text-zinc-900 border border-zinc-400 text-sm py-2 px-2 rounded-md outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`
        }
      />
      {
        Icone && <Icone size="16" title={label} className="absolute bottom-[0.6rem] left-2 text-zinc-600" />
      }
    </div>  
  );
}
