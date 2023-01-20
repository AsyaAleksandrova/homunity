/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import * as auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import Accept from './Accept'
import RegisterPopup from "./RegisterPopup";
import LoginPopup from "./LoginPopup";
import RefreshPassPopup from './RefreshPassPopup';
import ChangePass from './ChangePass';
import NewPassPopup from './NewPassPopup';
import InformPopup from "./InformPopup";
import MyPage from './MyPage';

function App() {
  const history = useHistory();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isRefreshPassPopupOpen, setIsRefreshPassPopupOpen] = useState(false);
  const [isNewPassPopupOpen, setIsNewPassPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const isOpen = isLoginPopupOpen || isRegisterPopupOpen || isInfoPopupOpen;
  const [currentUser, setCurrentUser] = useState({name: '', email: '', _id: ''});
  const [loggedIn, setLoggedIn] = useState(false);

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
        setCurrentUser({ ...currentUser, name: res.user.name, email: res.user.email, _id: res.user._id });
        setLoggedIn(true);
        history.push('/');
        closeAllPopups();
        setIsLoginPopupOpen(false);
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
        console.log(e)
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
        setIsNewPassPopupOpen(true);
      })
      .catch((e) => {
        console.log(e)
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
        setCurrentUser({name: res.user.name, email: res.user.email, _id: res.user._id});
        setLoggedIn(true);
        history.push('/');
        closeAllPopups();
        setInfoTitle('Изменение пароля');
        setInfoMessage('Пароль успешно изменен.');
        setIsInfoPopupOpen(true);
      })
      .catch((e) => {
        console.log(e)
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
    return auth.checkToken(localStorage.getItem('user_id'))
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.user.name, email: res.user.email, _id: res.user._id });
        setLoggedIn(true);
        history.push('/')
      })
      .catch((e) => {
        localStorage.removeItem('user_id');
        history.push('/main')
        setIsRegisterPopupOpen(false);
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
    setIsLoginPopupOpen(true);
  }

  const handleRegisterClick = () => {
    closeAllPopups();
    setIsRegisterPopupOpen(true);
  }

  const handleRefreshClick = () => {
    closeAllPopups();
    setIsRefreshPassPopupOpen(true);
  }  
   
  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
    setIsRefreshPassPopupOpen(false);
    setIsNewPassPopupOpen(false);
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
          component={MyPage}
        /> 

        <Route path="/main">
          <Main handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
        </Route> 
        <Route path="/accept">
          <Accept confirmEmail={ confirmEmail } />
        </Route>
        <Route path="/auth/refresh/pass/">
          <ChangePass changePass={ changePassLink } />
        </Route>         

      </Switch>

      <RegisterPopup isOpen={isRegisterPopupOpen} onClose={closeAllPopups} onSubmit={registerUser} login={handleLoginClick} />
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups} onSubmit={loginUser} refreshPass={handleRefreshClick} />
      <RefreshPassPopup isOpen={isRefreshPassPopupOpen} onClose={closeAllPopups} onSubmit={refreshLink} login={handleLoginClick} />
      <NewPassPopup isOpen={isNewPassPopupOpen} onClose={getAppData} onSubmit={refreshPass} />
      <InformPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups} title={infoTitle} message={infoMessage} />

    </CurrentUserContext.Provider>
  );
}

export default App;
