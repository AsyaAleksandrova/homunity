/* eslint-disable no-useless-escape */
import { useState } from 'react';

export function ValidateEmail() {
   const [error, setError] = useState('Поле не может быть пустым');

   const checkError = (input) => {
      if (input !== '') {
         const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
         if (reg.test(input) === false) {
            setError('Некорректнный Email')
         } else setError('')
      }
      else {
         setError('Поле не может быть пустым')
      }
   }

  return [error, checkError];
}