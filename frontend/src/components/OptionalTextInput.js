import React, { useState } from 'react';
import AcceptDeletePopup from './AcceptDeletePopup';

function OptionalTextInput({ input, toggleInput, handleChangeInput, name, placeholder }) {
   const [acceptDeletePopupOpen, setAcceptDeletePopupOpen] = useState(false)
   
   function closeAcceptDeletePoput() {
      setAcceptDeletePopupOpen(false)
   };
   function acceptDeletion() {
      setAcceptDeletePopupOpen(false);
      toggleInput();
   }

   return (
      <div className='popup__person-input_container'>
         <label className="popup__person-input_label">{ name }</label>
         <textarea onChange={handleChangeInput} value={input} autoComplete="off" placeholder={placeholder} wrap="hard" maxLength="1500" className="popup__person-input popup__person-input_long"></textarea>
         <button type='button' onClick={setAcceptDeletePopupOpen} className="popup__person-input_delete"></button>
         <AcceptDeletePopup isOpen={acceptDeletePopupOpen} onAccept={acceptDeletion} onClose={closeAcceptDeletePoput} />
      </div>              
   )
}

export default OptionalTextInput;
