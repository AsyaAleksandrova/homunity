import { useState } from 'react';

export function ValidateDate() {
   const [error, setError] = useState('Поле не может быть пустым');

   const checkError = (date, year) => {
      if (date !== '') {
         let newdate = new Date(date)
         let today = new Date()
         if (newdate > today) {
            setError('Дата не может быть больше текущей');
         } else {
            setError('');
         }   
      }
      else {
         if (year !== '') {
            setError('');
         } else {
            setError('Поле не может быть пустым');
         }
      }        
   }

  return [error, checkError];
}