import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faPersonDress } from '@fortawesome/free-solid-svg-icons';
import { faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';

function GenderInput({ gender, setGender, genderError, setGenderError, blurGender ,setBlurGender }) {
   const [male, setMale] = useState(false);
   const [female, setFemale] = useState(false);
   const [nogender, setNogender] = useState(false);
   useEffect(() => {
      if (!blurGender) { setMale(false); setFemale(false);  setNogender(false) }
   }, [blurGender])
   
   function onClickMale() {
      setBlurGender(true);
      if (!male) {setMale(true); setFemale(false); setNogender(false); setGender('Male'); setGenderError('')
      } else { setMale(false); setFemale(false); setNogender(false); setGender(''); setGenderError('Поле не может быть пустым')}};
   function onClickFemale() {
      setBlurGender(true);
      if (!female) {setFemale(true); setMale(false); setNogender(false); setGender('Female'); setGenderError('')
      } else {setMale(false); setFemale(false); setNogender(false); setGender(''); setGenderError('Поле не может быть пустым')}}
   function onClickNoGender() {
      setBlurGender(true);
      if (!nogender) {setNogender(true); setMale(false); setFemale(false); setGender('NoGender'); setGenderError('')
      } else {setMale(false); setFemale(false); setNogender(false); setGender(''); setGenderError('Поле не может быть пустым')}}   

   return (
      <div className='popup__person-input_container'>
         <label className="popup__person-input_label">Пол</label>
         <div onClick={onClickMale} className="popup__person-input_gender">
            <FontAwesomeIcon icon={faPerson} style={{ color: `${!male? '#969BA2': '#394650'}` }} transform="grow-9" />
         </div>
         <div onClick={onClickFemale} className="popup__person-input_gender">
            <FontAwesomeIcon icon={faPersonDress} style={{ color: `${!female? '#969BA2': '#394650'}` }} transform="grow-9" />
         </div>
         <div onClick={onClickNoGender} className="popup__person-input_gender">
            <FontAwesomeIcon icon={faPersonCircleQuestion} style={{ color: `${!nogender? '#969BA2': '#394650'}` }} transform="grow-9" />
         </div>  
         {(genderError) && <p className='popup__person-input_error'>{ genderError }</p>}
      </div>              
   )
}

export default GenderInput;