import React from 'react';
import { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';


function MyPage({loggedIn, logOut, getAppData, currentUser}) {

  // useEffect(() => {
  //   getAppData();
  // }, [])



  return (
    <main className="root">
      <Header loggedIn={loggedIn} logOut={logOut} currentUser={ currentUser } />
      <section className="mypage">
        <div className='mypage__family'>
          <h2 className='mypage__title'>Моя семья</h2>
          <ul className='mypage__family-list'>
            <li className='mypage__family-item'>
              <div className='mypage__person-photo'></div>
              <div className='mypage__button-container'>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faBinoculars} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faPenToSquare} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faUserMinus} style={{ color: '#969BA2' }} transform="grow-10" /></button>
              </div>
            </li>
            <li className='mypage__family-item'>
              <div className='mypage__person-photo'></div>
              <div className='mypage__button-container'>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faBinoculars} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faPenToSquare} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faUserMinus} style={{ color: '#969BA2' }} transform="grow-10" /></button>
              </div>
            </li>
            <li className='mypage__family-item'>
              <div className='mypage__person-photo'></div>
              <div className='mypage__button-container'>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faBinoculars} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faPenToSquare} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faUserMinus} style={{ color: '#969BA2' }} transform="grow-10" /></button>
              </div>
            </li>
            <li className='mypage__family-item'>
              <div className='mypage__person-photo'></div>
              <div className='mypage__button-container'>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faBinoculars} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faPenToSquare} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faUserMinus} style={{ color: '#969BA2' }} transform="grow-10" /></button>
              </div>
            </li>
            <li className='mypage__family-item'>
              <div className='mypage__person-photo'></div>
              <div className='mypage__button-container'>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faBinoculars} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faPenToSquare} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faUserMinus} style={{ color: '#969BA2' }} transform="grow-10" /></button>
              </div>
            </li>
            <li className='mypage__family-item'>
              <div className='mypage__person-photo'></div>
              <div className='mypage__button-container'>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faBinoculars} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faPenToSquare} style={{ color: '#394650' }} transform="grow-10" /></button>
                <button type='button' className='mypage__person-button'><FontAwesomeIcon icon={faUserMinus} style={{ color: '#969BA2' }} transform="grow-10" /></button>
              </div>
            </li>            
            <li className='mypage__family-add'>
              <button type='button' className='mypage__family-add'><FontAwesomeIcon icon={faPersonCirclePlus} style={{ color: '#E7E6E9' }} transform="grow-50" /></button>
            </li>
          </ul>
          

        </div>
      </section>
     </main>
  );
}

export default MyPage;