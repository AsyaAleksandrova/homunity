import { useState } from 'react';

export function ValidatePassword() {
   const [error, setError] = useState('Поле не может быть пустым');

   const checkError = (input) => {
      const reg_1 = /(?=.*[a-z])/g;
      const reg_2 = /(?=.*[A-Z])/g;
      const reg_3 = /(?=.*[0-9])/g;
      if (input !== '') {
         if (input.length < 8) {
            setError('Пароль не может быть меньше 8 символов');
         } else if (input.length > 30) {
            setError('Пароль не может быть больше 30 символов');
         } else if (reg_1.test(input) === false) {
            setError('Пароль должен содержать хотя бы одну латинскую букву в нижнем регистре.')
         } else if (reg_2.test(input) === false) {
            setError('Пароль должен содержать хотя бы одну латинскую букву в верхнем регистре.')
         } else if (reg_3.test(input) === false) {
            setError('Пароль должен содержать хотя бы одну цифру.')
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