/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { ValidateShortInput } from '../hooks/ValidateShortInput';

function OptionalTextInput({ input, toggleInput, handleChangeInput, name, placeholder }) {
   const [inputError, checkInputError] = ValidateShortInput();
   const [blurInput, setBlurInput] = useState(false);
   
   useEffect(() => {
      checkInputError(input);
   }, [input]);

   return (
      <div className='popup__person-input_container'>
         <label className="popup__person-input_label">{ name }</label>
         <textarea onBlur={setBlurInput} onChange={handleChangeInput} value={input} autocomplete="off" placeholder={placeholder} wrap="hard" className="popup__person-input popup__person-input_long"></textarea>
         <button onClick={toggleInput} className="popup__person-input_delete"></button>
         {(blurInput && inputError) && <p className='popup__person-input_error'>{inputError}</p>}
      </div>              
   )
}

export default OptionalTextInput;
