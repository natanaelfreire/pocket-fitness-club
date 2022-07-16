import { useState } from 'react'
import { Switch } from '@headlessui/react'

type ToggleProps = {
  title: string;
}

export function DarkModeToggle({ title }: ToggleProps) {
  const [enabled, setEnabled] = useState(false)

  const handleToggle = () => {
    setEnabled(!enabled);

    const htmlTag = document.querySelector('html');

    if (!enabled) {
      htmlTag?.classList.add('dark');
    }
    else {
      if (htmlTag?.classList.contains('dark'))
        htmlTag?.classList.remove('dark');
    }    
  }  

  return (
    <div className='flex items-center gap-2'>
      <label className="text-sm text-zinc-300">{title}</label>
      <Switch
        checked={enabled}
        onChange={handleToggle}
        className={`${enabled ? 'bg-purple-900' : 'bg-gray-500'
          } relative inline-flex h-6 w-11 items-center rounded-full border-transparent transition-colors duration-200 ease-in-out`}
      >
        <span className="sr-only">{title}</span>
        <span
          className={`${enabled ? 'translate-x-6' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white`}
        />
      </Switch>
    </div>
  )
}
