import { useEffect, useId, useState } from 'react';
import Select from 'react-select';

interface SelectProps<TOption> {
  name: string;
  options: TOption[];
  selected?: string;
  setInput: (value: string) => void;
  value: keyof TOption;
  label: keyof TOption;
  loading?: boolean;
}

type Option = {
  value: string;
  label: string;
}

export function GenericSelect<TOption,>(props: SelectProps<TOption>) {
  const id = useId();
  const [selectOptions, setSelectOptions] = useState<Option[]>();
  const [selectedOption, setSelectedOption] = useState<Option>();

  useEffect(() => {
    const newOptions = props.options.map(option => {
      const newOption: Option = {
        value: String(option[props.value]),
        label: String(option[props.label])
      };

      return newOption;
    })

    setSelectOptions(newOptions);

    if (props.selected) {
      const option = newOptions.find(option => option.value === props.selected)
      setSelectedOption(option);
    }

  }, [])

  return (
    <div className='flex flex-col mb-3'>
      <label 
        htmlFor={id}
        className="mb-1 text-slate-900"
      >
        {props.name}
      </label>
      <Select
        id={id}
        options={selectOptions}
        placeholder="Selecione..."
        value={selectedOption}
        onChange={(option => {
          if (option) {
            setSelectedOption(option);
            props.setInput(option.value);
          } else {
            setSelectedOption(undefined);
            props.setInput('');
          }
        })}
        isClearable
        noOptionsMessage={() => 'Sem opções'}
        loadingMessage={() => 'Carregando...'}
        isLoading={props.loading}
      />
    </div>
  );
}