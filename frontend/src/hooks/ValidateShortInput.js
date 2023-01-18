import { useState } from 'react';

export function ValidateShortInput() {
   const [error, setError] = useState('Поле не может быть пустым');

   const checkError = (input) => {
      if (input !== '') {
         if (input.length < 2) {
            setError('Поле не может быть меньше 2 символов');
         } else if (input.length > 30) {
            setError('Поле не может быть больше 30 символов');
         } else {
            setError('');
         }   
      }
      else {
         setError('Поле не может быть пустым');
      }        
   }

  return [error, checkError];
}