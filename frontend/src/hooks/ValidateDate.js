import { useState } from 'react';

export function ValidateDate() {
   const [error, setError] = useState('');

   const checkError = (date, year, blurInput, tillNow) => {
      if (blurInput) {
         if (!tillNow) {
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
         } else {
            setError('');
         }
      }
   }

  return [error, checkError];
}