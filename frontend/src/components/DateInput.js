/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

function DateInput({ input, handleChangeInput, name, inputError, checkInputError }) {
   const [blurInput, setBlurInput] = useState(false);
   const [inputNotSet, setInputNotSet] = useState(false);
   const classCheckInput = `popup__person-input popup__person-input_checkbox ${inputNotSet && 'popup__person-input_checkbox_checked'}` 
   function checkInputNotSet() { setInputNotSet(!inputNotSet) }
   useEffect(() => {checkInputError(input, inputNotSet)}, [input, inputNotSet]);

   return (
      <div className='popup__person-input_container'>
         <label className="popup__person-input_label">{name}</label>
         <input onBlur={ setBlurInput } onChange={handleChangeInput} value={input} type="date" className="popup__person-input popup__person-input_small" />
         {(blurInput && inputError) && <p className='popup__person-input_error'>{inputError}</p>}
         <div onClick={checkInputNotSet} className={classCheckInput}></div>
         <p className="popup__person-input_label">Не известна</p>
         </div>              
   )
}

export default DateInput;