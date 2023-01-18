import { useState } from 'react';

export function ValidatePassword() {
   const [error, setError] = useState('Поле не может быть пустым');

   const checkError = (input) => {
      if (input !== '') {
         if (input.length < 8) {
            setError('Пароль не может быть меньше 8 символов');
         } else if (input.length > 30) {
            setError('Пароль не может быть больше 30 символов');
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