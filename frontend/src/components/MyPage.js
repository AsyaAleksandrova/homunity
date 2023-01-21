/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import EditMemberPopup from './EditMemberPopup'


function MyPage({loggedIn, logOut, currentUser}) {
  const [isNewMemberPopupOpen, setNewMemberPopupOpen] = useState(false);
  const [member, setMember] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [newOne, setNewOne] = useState(true);

  function newMember() {
    setMember({
      surname: '', name: '', patronymic: '', date_birth: {}, date_death: {},
      //country: '', region: '',
      biography: '', hobby: '', achievements: '', rewards: '', trips: '', books: '', sport: '', music: '', 
      cinema: '', games: '', schoolmates: '', firstlove: '', student: '', profession: '', home: '', recipe: ''
    });
    setNewMemberPopupOpen(true);
  }
  
  function saveMember() {

  }

  function cancelEdit() {
    setNewMemberPopupOpen(false);
  }

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
            <li className='mypage__family-add'>
              <button type='button' onClick={newMember} className='mypage__family-add'><FontAwesomeIcon icon={faUserPlus} style={{ color: '#E7E6E9' }} transform="grow-25" /></button>
            </li>
          </ul>
        </div>
        <EditMemberPopup isOpen={isNewMemberPopupOpen} onClose={cancelEdit} member={member} onSubmit={saveMember} newOne={newOne} />
      </section>
     </main>
  );
}

export default MyPage;