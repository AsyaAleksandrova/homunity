/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';
import * as familyApi from '../utils/familyApi';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import AcceptEmail from './AcceptEmail'
import PopupRegister from "./PopupRegister";
import PopupLogin from "./PopupLogin";
import PopupRefreshPass from './PopupRefreshPass';
import ChangePass from './ChangePass';
import PopupNewPass from './PopupNewPass';
import PopupInform from "./PopupInform";
import MyPage from './MyPage';

function App() {
  const history = useHistory();
  const [isPopupLoginOpen, setIsPopupLoginOpen] = useState(false);
  const [isPopupRegisterOpen, setIsPopupRegisterOpen] = useState(false);
  const [isPopupRefreshPassOpen, setIsPopupRefreshPassOpen] = useState(false);
  const [isPopupNewPassOpen, setIsPopupNewPassOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const isOpen = isPopupLoginOpen || isPopupRegisterOpen || isInfoPopupOpen;
  const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''});
  const [loggedIn, setLoggedIn] = useState(false);
  const [myFamily, setMyFamily] = useState({});

  const registerUser = ({ name, email, password}) => {
    return auth.register(name, email, password)
      .then((res) => {
        closeAllPopups();
        openPopupInfo('Регистрация прошла успешно', `Мы отправили вам письмо на адрес ${res.user.email}. 
        Просьба перейти по ссылке для подтверждения адреса почты и активации аккаунта.
        Мы не хотим терять с вами связь на случай утраты пароля.`);
      })
      .catch((e) => {
        closeAllPopups();
        switch(e.status) {
          case 409: openPopupInfo('Ошибка регистрации', 'Пользователь с таким email уже зарегистрирован.');
            break;
          case 400: openPopupInfo('Ошибка регистрации', 'Переданые некорректные данные при создании пользователя.');
            break;
          default: openPopupInfo('Ошибка регистрации', 'Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  }

  const loginUser = ({ email, password}) => {
    return auth.login(email, password)
      .then((res) => {
        localStorage.setItem('user_id', res.user._id );
        closeAllPopups();
      })
      .then(() => {
        getAppData();
      })
      .catch((e) => {
       closeAllPopups();
        switch(e.status) {
          case 401: openPopupInfo('Ошибка входа', 'Некорректно указаны почта и/или пароль.');
            break;
          case 403: openPopupInfo('Ошибка входа', 'Для продолжения перейдите по направленной ссылке для подтвеждения email. Мы отправили ссылку повторно.');
            break;          
          default: openPopupInfo('Ошибка входа', 'Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  }

  const logOut = () => {
    return auth.logout()
      .then((res) => {
        localStorage.removeItem('user_id');
        setCurrentUser({ name: '', email: '', _id: '' });
        setLoggedIn(false);
      })
      .catch((e) => {
        openPopupInfo('Ошибка', 'Что-то пошло не так. Попробуйте повторить запрос.');
      })
  } 

  const confirmEmail = (id) => {
    return auth.checkToken(id)
      .then((res) => {
        localStorage.setItem('user_id', res.user._id );    
        openPopupInfo('Регистрация завершена', 'Ваш Email подтвержден. Спасибо за регистрацию на сайте!');
      })
      .then(() => {
        getAppData();
      })
      .catch((e) => {
        history.push('/main');
        switch(e.status) {
          case 401: openPopupInfo('Регистрация завершена', 'Необходима авторизация.');
            break;
          default: openPopupInfo('Ошибка подтверждения', 'Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  }
  
  const refreshLink = ({ email }) => {
    return auth.refreshLink(email)
      .then((res) => {
        closeAllPopups();
        openPopupInfo('Восстановление пароля', 'На указанную почту отправлена ссылка для восстановления пароля.');
      })
      .catch((e) => {
        closeAllPopups();
        switch(e.status) {
          case 404: openPopupInfo('Ошибка восстановления пароля', 'Проверьте корректность указанного адреса почты.');
            break;
          default: openPopupInfo('Ошибка восстановления пароля', 'Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  }

  const changePassLink = (link) => {
    return auth.getIdByLink(link)
      .then((res) => {
        localStorage.setItem('user_id', res.user._id);
        localStorage.setItem('email', res.user.email );
        setIsPopupNewPassOpen(true);
      })
      .catch((e) => {
        closeAllPopups();
        setInfoTitle();
        switch(e.status) {
          case 404: openPopupInfo('Ошибка изменения пароля', 'Некорректная ссылка.');
            break;         
          default: openPopupInfo('Ошибка изменения пароля', 'Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
      });
  }

  const refreshPass = ({password}) => {
    const email = localStorage.getItem('email');
    const _id = localStorage.getItem('user_id')
    return auth.refreshPass(email, password, _id)
      .then((res) => {
        localStorage.removeItem('email');
        localStorage.setItem('user_id', res.user._id );
        closeAllPopups();
        openPopupInfo('Изменение пароля', 'Пароль успешно изменен.');
      })
      .then(() => {
        getAppData();
      })
      .catch((e) => {
        closeAllPopups();
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
        switch(e.status) {
          case 404: openPopupInfo('Ошибка изменения пароля', 'Некорректная ссылка.');
            break;
          case 400: openPopupInfo('Ошибка изменения пароля', 'Указаны некорректные параметры при изменении данных пользователя.');
            break;          
          default: openPopupInfo('Ошибка изменения пароля', 'Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
        history.push('/main');
      });      
  }

  const getAppData = () => {
    Promise.all([auth.checkToken(localStorage.getItem('user_id')), familyApi.getMyFamily()])
      .then(([user, family]) => {
        setCurrentUser({ ...currentUser, name: user.user.name, email: user.user.email, _id: user.user._id });
        setMyFamily(family);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((e) => {
        localStorage.removeItem('user_id');
        history.push('/main')
        setIsPopupRegisterOpen(false);
        setInfoMessage('Ошибка получения данных о пользователе.', 'Что-то пошло не так. Попробуйте повторить запрос.');
      }); 
  }

  useEffect(() => {
    if (localStorage.getItem('user_id')) {
      getAppData();
    }
  }, [])  
  
  const handleLoginClick = () => {
    closeAllPopups();
    setIsPopupLoginOpen(true);
  }

  const handleRegisterClick = () => {
    closeAllPopups();
    setIsPopupRegisterOpen(true);
  }

  const handleRefreshClick = () => {
    closeAllPopups();
    setIsPopupRefreshPassOpen(true);
  }

  const openPopupInfo = (title, message) => {
    setInfoTitle(title);
    setInfoMessage(message);
    setIsInfoPopupOpen(true);
  }
   
  const closeAllPopups = () => {
    setIsPopupLoginOpen(false);
    setIsPopupRegisterOpen(false);
    setIsPopupRefreshPassOpen(false);
    setIsPopupNewPassOpen(false);
    setIsInfoPopupOpen(false);
    setInfoTitle('');
    setInfoMessage('');
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen])  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>         
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          logOut={logOut}
          myFamily={myFamily}
          getAppData={getAppData}
          openPopupInfo={openPopupInfo}
          component={MyPage}
        /> 

        <Route path="/main">
          <Main handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
        </Route> 
        <Route path="/accept">
          <AcceptEmail confirmEmail={ confirmEmail } />
        </Route>
        <Route path="/auth/refresh/pass/">
          <ChangePass changePass={ changePassLink } />
        </Route>         

      </Switch>

      <PopupRegister isOpen={isPopupRegisterOpen} onClose={closeAllPopups} onSubmit={registerUser} login={handleLoginClick} />
      <PopupLogin isOpen={isPopupLoginOpen} onClose={closeAllPopups} onSubmit={loginUser} refreshPass={handleRefreshClick} />
      <PopupRefreshPass isOpen={isPopupRefreshPassOpen} onClose={closeAllPopups} onSubmit={refreshLink} login={handleLoginClick} />
      <PopupNewPass isOpen={isPopupNewPassOpen} onClose={getAppData} onSubmit={refreshPass} />
      <PopupInform isOpen={isInfoPopupOpen} onClose={closeAllPopups} title={infoTitle} message={infoMessage} />

    </CurrentUserContext.Provider>
  );
}

export default App;
