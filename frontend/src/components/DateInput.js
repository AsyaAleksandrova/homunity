/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';

function DateInput({ input, setInput, checkInputError, mayBeTillNow, blurInput, setBlurInput }) {
   const [date, setDate, handleChangeDate] = useForm('');
   const [year, setYear, handleChangeYear] = useForm('')
   const [dateNotSet, setdateNotSet] = useState(false);
   const [now, setNow] = useState(false);
   const classCheckInput = `popup__person-input popup__person-input_checkbox ${dateNotSet && 'popup__person-input_checkbox_checked'}` 
   const classCheckNow = `popup__person-input popup__person-input_now ${now && 'popup__person-input_now_checked'}` 
   function checkdateNotSet() { setdateNotSet(!dateNotSet) }
   function checkNow() { setNow(!now); setBlurInput(true) }

   useEffect(() => { if (mayBeTillNow) { setNow(true) } }, [])
   useEffect(() => {
      if (!blurInput) { setDate(''); setYear('')}
   }, [blurInput])
   useEffect(() => { checkInputError(date, year, blurInput, now) }, [date, year, blurInput, now]);
   useEffect(() => {
      if (dateNotSet) {setDate('')
      } else { setYear('') };
      if (now) {
         setDate('');
         setYear('');
      }
   }, [dateNotSet, now])
   useEffect(() => {
      if (mayBeTillNow) {
         if (now) {
            setInput({ strictDate: '', year: '', tillNow: true })
         } else if (date) {
            let strictdate = new Date(date);
            let yearofdate = strictdate.getFullYear();
            setInput({ strictDate: strictdate, year: yearofdate, tillNow: false })
         } else {
            setInput({ strictDate: '', year: year, tillNow: false })
         }
      } else {
         if (date) {
            let strictdate = new Date(date);
            let yearofdate = strictdate.getFullYear();
            setInput({ strictDate: strictdate, year: yearofdate })
         } else {
            setInput({ strictDate: '', year: year })
         }
      }
   }, [date, year, now]);

   return (
      <div className='popup__person-input_container_date'>
         {!dateNotSet && !now && <input onBlur={setBlurInput} onChange={handleChangeDate} value={date} type="date" className="popup__person-input popup__person-input_date" />}
         {dateNotSet && !now && <input onBlur={setBlurInput} onChange={handleChangeYear} value={year} type="number" min="1800" max="2023" className='popup__person-input popup__person-input_date' />}
         {!now && <div onBlur={setBlurInput} onClick={checkdateNotSet} className={classCheckInput}></div>}
         {mayBeTillNow && <div onClick={checkNow} className={classCheckNow}></div>}
      </div>             
   )
}

export default DateInput;