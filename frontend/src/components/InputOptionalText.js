import React, { useState } from 'react';
import PopupAcceptDelete from './PopupAcceptDelete';

function InputOptionalText({ input, toggleInput, handleChangeInput, name, placeholder }) {
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
         <textarea onChange={handleChangeInput} value={input} autoComplete="off" placeholder={placeholder} wrap="hard" maxLength="1500" className="popup__person-input popup__person-input_long"></textarea>
         <button type='button' onClick={setPopupAcceptDeleteOpen} className="popup__person-input_delete"></button>
         <PopupAcceptDelete isOpen={PopupAcceptDeleteOpen} onAccept={acceptDeletion} onClose={closeAcceptDeletePoput} />
      </div>              
   )
}

export default InputOptionalText;
