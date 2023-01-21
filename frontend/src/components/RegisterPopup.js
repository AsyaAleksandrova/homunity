/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { ValidatePassword } from '../hooks/ValidatePassword';
import { ValidateEmail } from '../hooks/ValidateEmail';
import { ValidateShortInput } from '../hooks/ValidateShortInput';

function RegisterPopup({ isOpen, onClose, onSubmit, login }) { 
   const [btnName, setBtnName] = useState('Сохранить');
   const [name, setName, handleChangeName ] = useForm('');
   const [email, setEmail, handleChangeEmail] = useForm('');
   const [password, setPassword, handleChangePassword] = useForm('');
   const [isChangedName, setIsChangedName] = useState(false);
   const [isChangedEmail, setIsChangedEmail] = useState(false);
   const [isChangedPass, setIsChangedPass] = useState(false);   
   const [blurName, setBlurName] = useState(false);
   const [blurEmail, setBlurEmail] = useState(false);
   const [blurPass, setBlurPass] = useState(false);     
   const [nameError, checkNameError] = ValidateShortInput();
   const [emailError, checkEmailError] = ValidateEmail();
   const [passwordError, checkPasswordError] = ValidatePassword();
   const [disableButton, setDisableButton] = useState(true);

   useEffect(() => {
      setName('');
      setEmail('');
      setPassword('');
      setIsChangedName(false);
      setIsChangedEmail(false);
      setIsChangedName(false);
      setBlurName(false);
      setBlurEmail(false);
      setBlurPass(false);
      setDisableButton(true);      
   }, [isOpen]);

   useEffect(() => {
      checkNameError(name);
      if (name === '') {
         setIsChangedName(false)
      } else{ setIsChangedName(true)}
   }, [name]);

   useEffect(() => {
      checkEmailError(email);
      if (email === '') {
         setIsChangedEmail(false)
      } else{ setIsChangedEmail(true)}
   }, [email]);
   
   useEffect(() => {
      checkPasswordError(password);
      if (password === '') {
         setIsChangedPass(false)
      } else{ setIsChangedPass(true)}
   }, [password]);     

   useEffect(() => {
      checkButton();
   }, [nameError, emailError, passwordError])

   function checkButton() {
      if (nameError==='' & emailError==='' & passwordError==='') {
         setDisableButton(false)
      } else {
         setDisableButton(true);
      }
   }

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Сохранение...');
      onSubmit({ name, email, password })
         .finally(() => {
            setBtnName('Сохранить')
         });
   }

   return (
      <section className={`popup ${isOpen && 'popup_open'}`}>
         <div className="popup__content">
            <form onSubmit={handleSubmit} name='register' className="popup__form">
               <button onClick={onClose} type="button" className="popup__close"></button>
               <h2 className="popup__title">Регистрация</h2>
               <div className='popup__input-container'>
                  <span className = {`popup__input-placeholder ${isChangedName && 'popup__input-placeholder_active'}`}>Имя</span>
                  <input onBlur={ setBlurName } onChange={handleChangeName} value={name} type="text" name="name" required minLength="2" maxLength="30" className="popup__input" placeholder="" />
                  <label className={ `popup__input-label ${!nameError && 'popup__input-label_valid'}` }></label>
                  {(blurName && nameError) && <div className='popup__input-error'>{ nameError }</div>}
               </div>
               <div className='popup__input-container'>
                  <span className={`popup__input-placeholder ${isChangedEmail && 'popup__input-placeholder_active'}`}>Email</span>
                  <input onBlur={ setBlurEmail } onChange={handleChangeEmail} value={email} type="email" name="email" autoComplete="username" required className="popup__input" placeholder="" />
                  <label className={ `popup__input-label ${!emailError && 'popup__input-label_valid'}` }></label>
                  {(blurEmail && emailError) && <p className='popup__input-error'>{ emailError }</p>}
               </div>
               <div className='popup__input-container'>
                  <span className={`popup__input-placeholder ${isChangedPass && 'popup__input-placeholder_active'}`}>Пароль</span>
                  <input onBlur={ setBlurPass } onChange={handleChangePassword} value={password} type="password" name="password" autoComplete="new-password" required minLength="8" maxLength="30" className="popup__input popup__input_last" placeholder="" />
                  <label className={`popup__input-label ${!passwordError && 'popup__input-label_valid'}`}></label>
                  {(blurPass && passwordError) && <div className='popup__input-error'>{ passwordError }</div>}
               </div>    
               <p className='popup__question'>Уже есть аккаунт? <button type='button' onClick={login} className='popup__link'>&rarr; ВХОД</button></p>
               <button type="submit" className="popup__button" disabled={disableButton}>{btnName}</button>
            </form>
         </div>
      </section>
   )
}

export default RegisterPopup;
