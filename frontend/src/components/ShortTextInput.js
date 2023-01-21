/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

function ShortTextInput({ input, handleChangeInput, name, required, toggleInput, inputError, checkInputError }) {
   const [blurInput, setBlurInput] = useState(false);
   
   useEffect(() => { checkInputError(input) }, [input]);

   return (
      <div className='popup__person-input_container'>
         <label className="popup__person-input_label">{ name }</label>
         <input onBlur={setBlurInput} onChange={handleChangeInput} value={input} type="text" className="popup__person-input popup__person-input_small" placeholder={name} />
         {!required && <button onClick={toggleInput} className="popup__person-input_delete"></button>}
         {(blurInput && inputError) && <p className='popup__person-input_error'>{inputError}</p>}
      </div>           
   )
}

export default ShortTextInput;