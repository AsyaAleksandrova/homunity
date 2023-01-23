/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import PopupAcceptDelete from './PopupAcceptDelete';

function InputShortText({ input, handleChangeInput, name, required, toggleInput, inputError, checkInputError, blurInput, setBlurInput }) {
   useEffect(() => { checkInputError(input) }, [input]);

   const [PopupAcceptDeleteOpen, setPopupAcceptDeleteOpen] = useState(false)
   
   function closeAcceptDeletePoput() {
      setPopupAcceptDeleteOpen(false)
   };
   function acceptDeletion() {
      setPopupAcceptDeleteOpen(false);
      toggleInput();
   }

   return (
      <div className='popup__person-input_container'>
         <label className="popup__person-input_label">{ name }</label>
         <input onBlur={setBlurInput} onChange={handleChangeInput} value={input} type="text" className="popup__person-input popup__person-input_small" placeholder={name} />
         {!required && <button type='button' onClick={setPopupAcceptDeleteOpen} className="popup__person-input_delete"></button>}
         {(blurInput && inputError) && <p className='popup__person-input_error'>{inputError}</p>}
         <PopupAcceptDelete isOpen={PopupAcceptDeleteOpen} onAccept={acceptDeletion} onClose={closeAcceptDeletePoput} />
      </div>           
   )
}

export default InputShortText;