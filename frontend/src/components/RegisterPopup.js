/* eslint-disable default-case */
import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';

function RegisterPopup({ isOpen, onClose, onSubmit, login }) {
   const [isChangedUser, setIsChangedUser] = useState(false);
   const [isChangedEmail, setIsChangedEmail] = useState(false);
   const [isChangedPass, setIsChangedPass] = useState(false);
   const [isChangedConfirmPass, setIsChangedConfirmPass] = useState(false);
   const [validateName, setValidateName] = useState(false);
   const [validateEmail, setValidateEmail] = useState(false);
   const [validatePass, setValidatePass] = useState(false);   
   const [validateConfirmPass, setValidateConfirmPass] = useState(false);  
   const [btnName, setBtnName] = useState('Сохранить');
   const [name, setName, handleChangeName ] = useForm('');
   const [email, setEmail, handleChangeEmail] = useForm('');
   const [password, setPassword, handleChangePassword] = useForm('');
   const [confirmPassword, setConfirmPassword, handleChangeConfirmPassword] = useForm('');
   const [nameError, setNameError] = useState('Поле не может быть пустым');
   const [emailError, setEmailError] = useState('Поле не может быть пустым');
   const [passwordError, setPasswordError] = useState('Поле не может быть пустым');
   const [confirmPasswordError, setConfirmPasswordError] = useState('Поле не может быть пустым');
   const [disableButton, setDisableButton] = useState(true);

   useEffect(() => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setValidateName(false);
      setValidateEmail(false);
      setValidatePass(false);
      setValidateConfirmPass(false);
      setDisableButton(true);      
   }, [isOpen]);

   useEffect(() => {
      if (name !== '') {
         setIsChangedUser(true);
         if (name.length < 2) {
            setNameError('Имя не может быть меньше 2 символов');
         } else if (name.length > 30) {
            setNameError('Имя не может быть больше 30 символов');
         } else {
            setNameError('');
         }   
      }
      else {
         setIsChangedUser(false)
         setNameError('Поле не может быть пустым');
      }     
   }, [name]);

   useEffect(() => {
      if (email !== '') {
         setIsChangedEmail(true);
         const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
         if (reg.test(email) === false) {
            setEmailError('Некорректнный Email')
         } else {
            setEmailError('');
         }
      }
      else {
         setIsChangedEmail(false)
         setEmailError('Поле не может быть пустым');
      }     
   }, [email]);
   
   useEffect(() => {
      if (password !== '') {
         setIsChangedPass(true);
         if (password.length < 8) {
            setPasswordError('Пароль не может быть меньше 8 символов');
         } else if (password.length > 30) {
            setPasswordError('Пароль не может быть больше 30 символов');
         } else {
            setPasswordError('');
         }   
      }
      else {
         setIsChangedPass(false)
         setPasswordError('Поле не может быть пустым');
      }   
   }, [password]);   

   useEffect(() => {
      if (confirmPassword !== '') {
         setIsChangedConfirmPass(true);
         if (confirmPassword !== password) {
            setConfirmPasswordError('Пароли не совпадают');
         } else {
            setConfirmPasswordError('');
         }
      }
      else {
         setIsChangedConfirmPass(false)
         setConfirmPasswordError('Поле не может быть пустым');
      }
   }, [confirmPassword, password]);    

   useEffect(() => {
      checkButton();
   }, [nameError, emailError, passwordError, confirmPasswordError])

   function handleBlur(e) {
      switch (e.target.name) {
         case 'name':
            setValidateName(true)
            break         
         case 'email':
            setValidateEmail(true)
            break
         case 'password':
            setValidatePass(true)
            break
         case 'confirmPassword':
            setValidateConfirmPass(true)
            break
      }
   }

   function checkButton() {
      if (nameError==='' & emailError==='' & passwordError==='' & confirmPasswordError==='') {
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
      <section className={`popup popup_type_register ${isOpen && 'popup_open'}`}>
         <div className="popup__content">
            <form onSubmit={handleSubmit} name='register' className="popup__form">
               <button onClick={onClose} type="button" className="popup__close"></button>
               <h2 className="popup__title">Регистрация</h2>
               <div className='popup__input-container'>
                  <span className = {`popup__input-placeholder ${isChangedUser && 'popup__input-placeholder_active'}`}>Имя</span>
                  <input onBlur={ handleBlur } onChange={handleChangeName} value={name} type="text" name="name" required minLength="2" maxLength="30" className="popup__input popup__input_user-name" placeholder="" />
                  <label className={ `popup__input-label ${!nameError && 'popup__input-label_valid'}` }></label>
                  {(validateName && nameError) && <div className='popup__input-error'>{ nameError }</div>}
               </div>
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
               <div className='popup__input-container'>
                  <span className={`popup__input-placeholder ${isChangedConfirmPass && 'popup__input-placeholder_active'}`}>Подтвердите пароль</span>
                  <input onBlur={ handleBlur } onChange={handleChangeConfirmPassword} value={confirmPassword} type="password" name="confirmPassword" required minLength="8" maxLength="30" className="popup__input popup__input_user-password" placeholder="" />
                  <label className={`popup__input-label ${!confirmPasswordError && 'popup__input-label_valid'}`}></label>
                  {(validateConfirmPass && confirmPasswordError) && <div className='popup__input-error'>{ confirmPasswordError }</div>}
               </div> 
               <p className='popup__question'>Уже есть аккаунт? <button type='button' onClick={login} className='popup__link'>&rarr; ВХОД</button></p>
               <button type="submit" className="popup__button" disabled={disableButton}>{btnName}</button>
            </form>
         </div>
      </section>
   )
}

export default RegisterPopup;
