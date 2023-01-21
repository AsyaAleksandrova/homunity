/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { ValidateEmail } from '../hooks/ValidateEmail';

function RefreshPassPopup({ isOpen, onClose, onSubmit, login }) { 
   const [btnName, setBtnName] = useState('Отправить');
   const [email, setEmail, handleChangeEmail] = useForm('');
   const [isChangedEmail, setIsChangedEmail] = useState(false);
   const [blurEmail, setBlurEmail] = useState(false);
   const [emailError, checkEmailError] = ValidateEmail();
   const [disableButton, setDisableButton] = useState(true);

   useEffect(() => {
      setEmail('');
      setIsChangedEmail(false);
      setBlurEmail(false);
      setDisableButton(true);      
   }, [isOpen]);

   useEffect(() => {
      checkEmailError(email);
      if (email === '') {
         setIsChangedEmail(false)
      } else{ setIsChangedEmail(true)}
   }, [email]);  

   useEffect(() => {
      checkButton();
   }, [emailError])

   function checkButton() {
      if (emailError==='') {
         setDisableButton(false)
      } else {
         setDisableButton(true);
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Отправляем...');
      onSubmit({ email })
         .finally(() => {
            setBtnName('Отправить')
         });
   }

   return (
      <section className={`popup ${isOpen && 'popup_open'}`}>
         <div className="popup__content">
            <form onSubmit={handleSubmit} name='refresh' className="popup__form">
               <button onClick={onClose} type="button" className="popup__close"></button>
               <h2 className="popup__title">Запрос на сброс пароля</h2>
               <p className='popup__text'>Укажите почту, которая использовалась для регистрации на сайте. Мы отправим на нее ссылку для сброса пароля.</p>
               <div className='popup__input-container'>
                  <span className={`popup__input-placeholder ${isChangedEmail && 'popup__input-placeholder_active'}`}>Email</span>
                  <input onBlur={ setBlurEmail } onChange={handleChangeEmail} value={email} type="email" name="email" autoComplete="username" required className="popup__input" placeholder="" />
                  <label className={ `popup__input-label ${!emailError && 'popup__input-label_valid'}` }></label>
                  {(blurEmail && emailError) && <p className='popup__input-error'>{ emailError }</p>}
               </div> 
               <p className='popup__question'>Вспомнили пароль? <button type='button' onClick={login} className='popup__link'>&rarr; ВХОД</button></p>
               <button type="submit" className="popup__button" disabled={disableButton}>{btnName}</button>
            </form>
         </div>
      </section>
   )
}

export default RefreshPassPopup;