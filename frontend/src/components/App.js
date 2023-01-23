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
        setInfoTitle('Регистрация прошла успешно');
        setInfoMessage(`Мы отправили вам письмо на адрес ${res.user.email}. 
        Просьба перейти по ссылке для подтверждения адреса почты и активации аккаунта.
        Мы не хотим терять с вами связь на случай утраты пароля.`);
        setIsInfoPopupOpen(true);
      })
      .catch((e) => {
        closeAllPopups();
        setInfoTitle('Ошибка регистрации');
        switch(e.status) {
          case 409: setInfoMessage('Пользователь с таким email уже зарегистрирован.');
            break;
          case 400: setInfoMessage('Переданые некорректные данные при создании пользователя.');
            break;
          default: setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
        setIsInfoPopupOpen(true);
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
        setInfoTitle('Ошибка входа');
        switch(e.status) {
          case 401: setInfoMessage('Некорректно указаны почта и/или пароль.');
            break;
          case 403: setInfoMessage('Для продолжения перейдите по направленной ссылке для подтвеждения email. Мы отправили ссылку повторно.');
            break;          
          default: setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
        setIsInfoPopupOpen(true);
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
        setInfoTitle('Ошибка');
        setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
        setIsInfoPopupOpen(true);
      })
  } 

  const confirmEmail = (id) => {
    return auth.checkToken(id)
      .then((res) => {
        localStorage.setItem('user_id', res.user._id );    
        setInfoTitle('Регистрация завершена');
        setInfoMessage('Ваш Email подтвержден. Спасибо за регистрацию на сайте!');
        setIsInfoPopupOpen(true);
      })
      .then(() => {
        getAppData();
      })
      .catch((e) => {
        history.push('/main');
        setInfoTitle('Регистрация завершена');
        switch(e.status) {
          case 401: setInfoMessage('Необходима авторизация.');
            break;
          default: setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
        setIsInfoPopupOpen(true);
      });
  }
  
  const refreshLink = ({ email }) => {
    return auth.refreshLink(email)
      .then((res) => {
        closeAllPopups();
        setInfoTitle('Восстановление пароля');
        setInfoMessage('На указанную почту отправлена ссылка для восстановления пароля.');
        setIsInfoPopupOpen(true);
      })
      .catch((e) => {
        closeAllPopups();
        setInfoTitle('Восстановление пароля');
        switch(e.status) {
          case 404: setInfoMessage('Проверьте корректность указанного адреса почты.');
            break;
          default: setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
        setIsInfoPopupOpen(true);
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
        setInfoTitle('Изменение пароля');
        switch(e.status) {
          case 404: setInfoMessage('Некорректная ссылка.');
            break;         
          default: setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
        setIsInfoPopupOpen(true);
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
        setInfoTitle('Изменение пароля');
        setInfoMessage('Пароль успешно изменен.');
        setIsInfoPopupOpen(true);
      })
      .then(() => {
        getAppData();
      })
      .catch((e) => {
        closeAllPopups();
        localStorage.removeItem('email');
        localStorage.removeItem('user_id');
        setInfoTitle('Изменение пароля');
        switch(e.status) {
          case 404: setInfoMessage('Некорректная ссылка.');
            break;
          case 400: setInfoMessage('Указаны некорректные параметры при изменении данных пользователя.');
            break;          
          default: setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            break;
        }
        history.push('/main');
        setIsInfoPopupOpen(true);
      });      
  }

  const getAppData = () => {
    Promise.all([auth.checkToken(localStorage.getItem('user_id')), familyApi.getMyFamily()])
      .then(([user, family]) => {
        setCurrentUser({ ...currentUser, name: user.user.name, email: user.user.email, _id: user.user._id });
        setMyFamily(family);
        setLoggedIn(true);
        history.push('/')
      })
      .catch((e) => {
        localStorage.removeItem('user_id');
        history.push('/main')
        setIsPopupRegisterOpen(false);
        setInfoTitle('Ошибка получения данных о пользователе. Необходима авторизация.');
        setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
        setIsInfoPopupOpen(true);
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
          currentUser={currentUser}
          setIsInfoPopupOpen={setIsInfoPopupOpen}
          setInfoTitle={setInfoTitle}
          setInfoMessage={setInfoMessage}
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
