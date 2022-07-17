import { useId } from "react";
import { StyledIcon } from '@styled-icons/styled-icon';
import InputMask, { BeforeMaskedStateChangeStates } from 'react-input-mask';

type InputProps = {
  setInput: (value: string) => void;
  label?: string;
  placeholder?: string;
  Icone?: StyledIcon;
  value: string;
}

export function TimeInput({ setInput, label, Icone, placeholder, value  }: InputProps) {
  const id = useId();
  const startsWithTwo = value[0] === '2';

  const mask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/
  ]

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
        mask={mask}
        placeholder={placeholder}
        value={value}
        onChange={e => setInput(e.currentTarget.value)}
        className={`${Icone ? 'pl-7 ' : ''}
          text-zinc-900 border border-zinc-400 text-sm py-2 px-2 rounded-md outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`
        }
      >
      </InputMask>
      {
        Icone && <Icone size="16" title={label} className="absolute bottom-[0.6rem] left-2 text-zinc-600" />
      }
    </div>
  );
}