import { useState } from 'react';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);
  const [isChanged, setIsChanged] = useState(false);

  const handleChange = (event) => {
    setValues(event.target.value);
    if (event.target.value !== '') {
         setIsChanged(true);
      }
      else {
         setIsChanged(false)
      }
  };

  const refresh = (value) => {
    setValues(value);
    setIsChanged(false);
  }

  return [values, isChanged, handleChange, refresh];
}