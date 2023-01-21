/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

function DateInput({ date, setDate, handleChangeDate, year, setYear, handleChangeYear, name, inputError, checkInputError, needsLabel, mayBeUnset }) {
   const [blurInput, setBlurInput] = useState(false);
   const [inputNotSet, setInputNotSet] = useState(false);
   const [now, setNow] = useState(false);
   const classCheckInput = `popup__person-input popup__person-input_checkbox ${inputNotSet && 'popup__person-input_checkbox_checked'}` 
   const classCheckNow = `popup__person-input popup__person-input_now ${now && 'popup__person-input_now_checked'}` 
   function checkInputNotSet() { setInputNotSet(!inputNotSet) }
   function checkNow() { setNow(!now) }

   useEffect(() => {
      if (mayBeUnset) { setNow(true) }
   }, [])
   useEffect(() => { checkInputError(date, year) }, [date, year]);
   useEffect(() => {
      if (inputNotSet) {setDate('')
      } else {setYear('')}
   }, [inputNotSet])
   

   return (
      <div className='popup__person-input_container'>
         {needsLabel && <label className="popup__person-input_label">{name}</label>}
         <div className='popup__person-input_container_date'>
            {mayBeUnset && <div onClick={checkNow} className={classCheckNow}></div>}
            {!now && <input onBlur={ setBlurInput } onChange={handleChangeDate} value={date} type="date" className="popup__person-input popup__person-input_date" />}
            {!now && <div onClick={checkInputNotSet} className={classCheckInput}></div>}         
            {inputNotSet && !now && <input onChange={handleChangeYear} value={year} type="number" min="1800" max="2023" className='popup__person-input popup__person-input_date' />}
         </div>
         {(blurInput && inputError) && <p className='popup__person-input_error popup__person-input_error_date'>{inputError}</p>}
      </div>              
   )
}

export default DateInput;