/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { ValidatePassword } from '../hooks/ValidatePassword';

function NewPassPopup({ isOpen, onClose, onSubmit }) {
   const [btnName, setBtnName] = useState('Сохранить');
   const [password, isChangedPass, handleChangePassword, refreshPassword] = useForm('');
   const [blurPass, setBlurPass] = useState(false);   
   const [passwordError, checkPasswordError] = ValidatePassword();
   const [disableButton, setDisableButton] = useState(true);
   const email = localStorage.getItem('email');

   useEffect(() => {
      refreshPassword('');
      setBlurPass(false);
      setDisableButton(true);
   }, [isOpen]);
   
   useEffect(() => {
      checkPasswordError(password);
   }, [password]); 

   useEffect(() => {
      checkButton();
   }, [passwordError])   

   function checkButton() {
      if (!passwordError) {
         setDisableButton(false)
      } else setDisableButton(true)
   }

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Сохранение...');
      onSubmit({ password })
         .finally(() => {
            setBtnName('Сохранить')
         });
   }

   return (
      <section className={`popup ${isOpen && 'popup_open'}`}>
         <div className="popup__content">
            <form onSubmit={handleSubmit} name='register' className="popup__form">
               <button onClick={onClose} type="button" className="popup__close"></button>
               <h2 className="popup__title">Смена пароля</h2>
               <p className='popup__text'>Укажите новый пароль для {email}</p>
               <div className='popup__input-container'>
                  <span className={`popup__input-placeholder ${isChangedPass && 'popup__input-placeholder_active'}`}>Пароль</span>
                  <input onBlur={ setBlurPass } onChange={handleChangePassword} value={password} type="password" name="password" autoComplete="current-password" required minLength="8" maxLength="30" className="popup__input popup__input_last" placeholder="" />
                  <label className={`popup__input-label ${!passwordError && 'popup__input-label_valid'}`}></label>
                  {(blurPass && passwordError) && <div className='popup__input-error'>{ passwordError }</div>}
               </div>    
               <button type="submit" className="popup__button" disabled={disableButton}>{btnName}</button>
            </form>
         </div>
      </section>
   )
}

export default NewPassPopup;