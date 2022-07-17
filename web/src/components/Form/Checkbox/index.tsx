import { useState } from 'react'
import { Switch } from '@headlessui/react'

type ToggleProps = {
  label: string;
  enabled: boolean,
  setEnabled: (value: boolean) => void;
}

export function Checkbox({ label, enabled, setEnabled }: ToggleProps) {

  const handleToggle = () => {
    setEnabled(!enabled); 
  }  

  return (
    <div className='flex items-center gap-2'>
      <label className="text-slate-900">{label}</label>
      <Switch
        checked={enabled}
        onChange={handleToggle}
        className={`${enabled ? 'bg-green-600' : 'bg-gray-400'
          } relative inline-flex h-6 w-11 items-center rounded-full border-transparent transition-colors duration-200 ease-in-out`}
      >
        <span className="sr-only">{label}</span>
        <span
          className={`${enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white`}
        />
      </Switch>
    </div>
  )
}
