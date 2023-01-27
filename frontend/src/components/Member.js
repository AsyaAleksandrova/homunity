/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';

function Member({member, onDelete}) {
   const [url, setUrl] = useState('');
   const [fio, setFio] = useState('')
   
   useEffect(() => {
      setFio(`${member.surname + ' ' + member.name + ' ' + member.patronymic}`)
      if(member.photo){setUrl(`${member.photo.path}`)}
   }, [])

   function handleCardOpen() {
      console.log('open')
   }

   function handleCardEdit() {
      console.log('edit')
   }

   function handleCardDelete() {
      onDelete(member);
   }

   return (
      <li className='member'>
         <div className="member__photo-container">
            <img src={url ? url : 'free-icon-portrait.png'} alt='Фото' className='member__photo' />
         </div>
         
         <p className="member__fio">{ fio }</p>
            <div className='member__button-container'>
            <FontAwesomeIcon onClick={handleCardOpen} className='member__button' icon={faBinoculars} style={{ color: '#394650' }} transform="grow-10" />
            <FontAwesomeIcon onClick={handleCardEdit} className='member__button' icon={faPenToSquare} style={{ color: '#394650' }} transform="grow-10" />
            <FontAwesomeIcon onClick={handleCardDelete} className='member__button' icon={faUserMinus} style={{ color: '#969BA2' }} transform="grow-10" />
         </div>
      </li>
   );
}

export default Member;