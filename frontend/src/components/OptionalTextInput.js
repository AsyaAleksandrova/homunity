import React from 'react';

function OptionalTextInput({ input, toggleInput, handleChangeInput, name, placeholder }) {
   return (
      <div className='popup__person-input_container'>
         <label className="popup__person-input_label">{ name }</label>
         <textarea onChange={handleChangeInput} value={input} autoComplete="off" placeholder={placeholder} wrap="hard" maxLength="1500" className="popup__person-input popup__person-input_long"></textarea>
         <button onClick={toggleInput} className="popup__person-input_delete"></button>
      </div>              
   )
}

export default OptionalTextInput;
