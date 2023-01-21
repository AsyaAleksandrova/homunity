import { useState } from 'react';

export function useForm(inputValues) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event) => {
    setValues(event.target.value);
  };

  return [values, setValues, handleChange];
}