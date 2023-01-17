/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';

function LoginPopup({ isOpen, onClose, onSubmit, register }) {
   const [isChangedEmail, setIsChangedEmail] = useState(false);
   const [isChangedPass, setIsChangedPass] = useState(false);
   const [validateEmail, setValidateEmail] = useState(false);
   const [validatePass, setValidatePass] = useState(false);
   const [btnName, setBtnName] = useState('Войти');
   const [email, setEmail, handleChangeEmail] = useForm('');
   const [password, setPassword, handleChangePassword] = useForm('');
   const [emailError, setEmailError] = useState('Поле не может быть пустым');
   const [passwordError, setPasswordError] = useState('Поле не может быть пустым');
   const [disableButton, setDisableButton] = useState(true);

   useEffect(() => {
      setEmail('');
      setPassword('');
      setValidateEmail(false);
      setValidatePass(false);
      setDisableButton(true);
   }, [isOpen]);

   useEffect(() => {
      if (email !== '') {
         setIsChangedEmail(true);
         const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
         if (reg.test(email) === false) {
            setEmailError('Некорректнный Email')
         } else setEmailError('')
      }
      else {
         setIsChangedEmail(false)
         setEmailError('Поле не может быть пустым')
      }
   }, [email]);
   
   useEffect(() => {
      if (password !== '') {
         setIsChangedPass(true);
         if (password.length < 8) {
            setPasswordError('Пароль не может быть меньше 8 символов')
         } else if (password.length > 30) {
            setPasswordError('Пароль не может быть больше 30 символов')
         } else {
            setPasswordError('')
         }   
      }
      else {
         setIsChangedPass(false)
         setPasswordError('Поле не может быть пустым')
      }
   }, [password]); 

   useEffect(() => {
      checkButton();
   }, [emailError, passwordError])   

   function handleBlur(e) {
      switch (e.target.name) {
         case 'email':
            setValidateEmail(true)
            break
         case 'password':
            setValidatePass(true)
            break
      }
   }

   function checkButton() {
      if (!emailError && !passwordError) {
         setDisableButton(false)
      } else setDisableButton(true)
   }

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Проверяем...');
      onSubmit({ email, password })
         .finally(() => {
            setBtnName('Войти')
         });
   }


   return (
      <section className={`popup popup_type_register ${isOpen && 'popup_open'}`}>
         <div className="popup__content">
            <form onSubmit={handleSubmit} name='register' className="popup__form">
               <button onClick={onClose} type="button" className="popup__close"></button>
               <h2 className="popup__title">Вход</h2>
               <div className='popup__input-container'>
                  <span className={`popup__input-placeholder ${isChangedEmail && 'popup__input-placeholder_active'}`}>Email</span>
                  <input onBlur={ handleBlur } onChange={handleChangeEmail} value={email} type="email" name="email" required className="popup__input popup__input_user-email" placeholder="" />
                  <label className={ `popup__input-label ${!emailError && 'popup__input-label_valid'}` }></label>
                  {(validateEmail && emailError) && <p className='popup__input-error'>{ emailError }</p>}
               </div>
               <div className='popup__input-container'>
                  <span className={`popup__input-placeholder ${isChangedPass && 'popup__input-placeholder_active'}`}>Пароль</span>
                  <input onBlur={ handleBlur } onChange={handleChangePassword} value={password} type="password" name="password" required minLength="8" maxLength="30" className="popup__input popup__input_user-password" placeholder="" />
                  <label className={`popup__input-label ${!passwordError && 'popup__input-label_valid'}`}></label>
                  {(validatePass && passwordError) && <div className='popup__input-error'>{ passwordError }</div>}
               </div>    
               <p className='popup__question'>Забыли пароль? <button type='button' onClick={register} className='popup__link'>&rarr; СБРОСИТЬ ПАРОЛЬ</button></p>
               <button type="submit" className="popup__button" disabled={disableButton}>{btnName}</button>
            </form>
         </div>
      </section>
   )
}

export default LoginPopup;
