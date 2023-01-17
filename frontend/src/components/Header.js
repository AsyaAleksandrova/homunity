import React from 'react';
import { useForm } from '../hooks/useForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Header({loggedIn, currentUser}) {
   const className = `header ${!loggedIn && 'header_hidden'}`;
   const [search, setSearch, handleChangeSearch ] = useForm('');

   return (
      <header className={className}>
         <div className='header__menu'>
            <div className='header__logo'></div>
            <form className='header__form'>
               <input onChange={handleChangeSearch} value={search} type="text" name="search" className='header__search' placeholder='...поиск по профилю' />
               <button type="button" className="header__submit"><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: '#394650' }} transform="grow-5" /></button>
            </form>
            <button type='button' className='header__button'><FontAwesomeIcon icon={faBell} style={{ color: '#394650' }} transform="grow-5" /></button>
         </div>
         <div className='header__menu'>
            <button type='button' className='header__button'><FontAwesomeIcon icon={faEnvelope} style={{ color: '#394650' }} transform="grow-10" /></button>
            <button type='button' className='header__button'><FontAwesomeIcon icon={faUserGroup} style={{ color: '#394650' }} transform="grow-7" /></button>
            <button type='button' className='header__button'><FontAwesomeIcon icon={faCircleUser} style={{ color: '#394650' }} transform="grow-10" /></button>
            <button type='button' className='header__button'><FontAwesomeIcon icon={faDoorOpen} style={{ color: '#394650' }} transform="grow-9" /></button>
         </div>
         
      </header>
   );
}

export default Header;