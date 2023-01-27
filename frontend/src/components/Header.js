/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from '../hooks/useForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Header({ loggedIn, logOut }) {
   const className = `header ${!loggedIn && 'header_hidden'}`;
   const [search, setSearch, handleChangeSearch] = useForm('');
   const currentUser = React.useContext(CurrentUserContext);

   return (
      <header className={className}>
         <div className='header__menu'>
            <div className='header__logo'></div>
            <form className='header__form'>
               <input onChange={handleChangeSearch} value={search} type="text" name="search" className='header__search' placeholder='...поиск по профилю' />
               <FontAwesomeIcon className="header__submit" icon={faMagnifyingGlass} style={{ color: '#394650' }} transform="grow-5" />
            </form>
            <FontAwesomeIcon className='header__button' icon={faBell} style={{ color: '#394650' }} transform="grow-5" />
         </div>
         <div className='header__menu'>
            <p className='header__username'>{ currentUser.name }</p>
            <FontAwesomeIcon className='header__button' icon={faCircleUser} style={{ color: '#394650' }} transform="grow-15" />
            <FontAwesomeIcon onClick={logOut} className='header__button' icon={faDoorOpen} style={{ color: '#394650' }} transform="grow-10" /> 
         </div>
         
      </header>
   )
}

export default Header;
