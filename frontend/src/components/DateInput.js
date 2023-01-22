/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';

function DateInput({ date, setDate, handleChangeDate, year, setYear, handleChangeYear,checkInputError, mayBeTillNow }) {
   const [blurInput, setBlurInput] = useState(false);
   const [inputNotSet, setInputNotSet] = useState(false);
   const [now, setNow] = useState(false);
   const classCheckInput = `popup__person-input popup__person-input_checkbox ${inputNotSet && 'popup__person-input_checkbox_checked'}` 
   const classCheckNow = `popup__person-input popup__person-input_now ${now && 'popup__person-input_now_checked'}` 
   function checkInputNotSet() { setInputNotSet(!inputNotSet) }
   function checkNow() { setNow(!now) }

   useEffect(() => {
      if (mayBeTillNow) { setNow(true) }
   }, [])
   useEffect(() => { checkInputError(date, year, blurInput, now) }, [date, year, blurInput, now]);
   useEffect(() => {
      if (inputNotSet) {setDate('')
      } else {setYear('')}
   }, [inputNotSet])

   return (
      <div className='popup__person-input_container_date'>
         {!inputNotSet && !now && <input onBlur={setBlurInput} onChange={handleChangeDate} value={date} type="date" className="popup__person-input popup__person-input_date" />}
         {inputNotSet && !now && <input onBlur={setBlurInput} onChange={handleChangeYear} value={year} type="number" min="1800" max="2023" className='popup__person-input popup__person-input_date' />}
         {!now && <div onBlur={setBlurInput} onClick={checkInputNotSet} className={classCheckInput}></div>}
         {mayBeTillNow && <div onClick={checkNow} className={classCheckNow}></div>}
      </div>             
   )
}

export default DateInput;