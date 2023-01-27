/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import PopupEditMember from './PopupEditMember';
import * as familyApi from '../utils/familyApi';
import Member from './Member';

function MyPage({loggedIn, logOut, myFamily, getAppData, openPopupInfo}) {
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
  };
  
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
      .then(() => {
        getAppData();
      })
      .catch((e) => {
        setNewMemberPopupOpen(false);
        switch(e.status) {
          case 400: openPopupInfo('Ошибка сохранения', 'Переданые некорректные данные при создании карточки.');
            break;
          default: openPopupInfo('Ошибка сохранения', 'Что-то пошло не так. Попробуйте повторить запрос.');
            console.log(e)
            break;
        }
      });
  }

  function cancelEdit() {
    setMember({});
    setNewMemberPopupOpen(false);
  };

  function deleteMember(member) {

    return familyApi.deleteMember(member._id)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        getAppData();
      })
      .catch((e) => {
        setNewMemberPopupOpen(false);
        switch (e.status) {
          case 403: openPopupInfo('Ошибка удаления', 'Отсутствуют права на удаление карточки.');
            break;
          default: openPopupInfo('Ошибка удаления', 'Что-то пошло не так. Попробуйте повторить запрос.');
            console.log(e)
            break;
        }
      })
  }  

  return (
    <main className="root">
      <Header loggedIn={loggedIn} logOut={logOut} />
      <section className="mypage">
        <div className='mypage__family'>
          <h2 className='mypage__title'>Моя семья</h2>
          <ul className='mypage__family-list'>
            {myFamily.map((member) => (  
            <Member
              member={member}
              onDelete={deleteMember}
              key={member._id} />
            ))}
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
          openPopupInfo={openPopupInfo}
        />
      </section>
     </main>
  );
}

export default MyPage;