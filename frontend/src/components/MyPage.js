/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faBinoculars } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import PopupEditMember from './PopupEditMember';
import * as familyApi from '../utils/familyApi';


function MyPage({loggedIn, logOut, currentUser, setIsInfoPopupOpen, setInfoTitle, setInfoMessage}) {
  const [isNewMemberPopupOpen, setNewMemberPopupOpen] = useState(false);
  const [member, setMember] = useState({});
  const [newOne, setNewOne] = useState(true);

  function newMember() {
    setNewOne(true);
    setMember({
      photo: {}, surname: '', name: '', patronymic: '', //country: '', region: '',
      yearsOfLifeStart: { strictDate: '', year: '' }, yearsOfLifeEnd: { strictDate: '', year: '', tillNow: true },
      description: {biography: '', hobby: '', achievements: '', rewards: '', trips: '', books: '', sport: '', music: '', 
      cinema: '', games: '', schoolmates: '', firstlove: '', student: '', profession: '', home: '', recipe: ''}
    });
    setNewMemberPopupOpen(true);
  }
  
  function saveMember({ member, file }) {
    return familyApi.createNewMember(member)
      .then((res) => {
        if (!file.size) {
          setNewMemberPopupOpen(false);
        } else {
          const parent = res._id;
          return familyApi.saveMemberPhoto({ file, parent })
            .then((res) => {
              setNewMemberPopupOpen(false);
            })          
        }
      })
      .catch((e) => {
        setNewMemberPopupOpen(false);
        setInfoTitle('Ошибка сохранения');
        switch(e.status) {
          case 400: setInfoMessage('Переданые некорректные данные при создании карточки.');
            break;
          default: setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            console.log(e)
            break;
        }
        setIsInfoPopupOpen(true);
      });
  }

  function cancelEdit() {
    setMember({});
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
        <PopupEditMember
          isOpen={isNewMemberPopupOpen}
          onClose={cancelEdit}
          member={member}
          onSubmit={saveMember}
          newOne={newOne}
          setIsInfoPopupOpen={setIsInfoPopupOpen}
          setInfoTitle={setInfoTitle}
          setInfoMessage={setInfoMessage}
        />
      </section>
     </main>
  );
}

export default MyPage;