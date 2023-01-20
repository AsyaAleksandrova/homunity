import { useState } from 'react';

export function ValidateDate() {
   const [error, setError] = useState('Поле не может быть пустым');

   const checkError = (input, checkNotSet) => {
      if (input !== '') {
         let date = new Date(input)
         let today = new Date()
         if (date > today) {
            setError('Дата не может быть больше текущей');
         } else {
            setError('');
         }   
      }
      else {
         if (checkNotSet) {
            setError('');
         } else {
            setError('Поле не может быть пустым');
         }
      }        
   }

  return [error, checkError];
}