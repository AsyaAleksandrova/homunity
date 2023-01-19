/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from '../hooks/useForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Header({ loggedIn, logOut, currentUser }) {
   const className = `header ${!loggedIn && 'header_hidden'}`;
   const [search, isChangedSearch, handleChangeSearch, refreshSearch] = useForm('');

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
            <p className='header__username'>{ currentUser.name }</p>
            <button type='button' className='header__button'><FontAwesomeIcon icon={faCircleUser} style={{ color: '#394650' }} transform="grow-15" /></button>
            <button onClick={logOut} type='button' className='header__button'><FontAwesomeIcon icon={faDoorOpen} style={{ color: '#394650' }} transform="grow-10" /></button>
            
         </div>
         
      </header>
   )
}

export default Header;
