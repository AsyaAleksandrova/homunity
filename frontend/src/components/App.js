import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';
import Main from './Main';
import RegisterPopup from "./RegisterPopup";
import LoginPopup from "./LoginPopup";
import InformPopup from "./InformPopup";
import Header from './Header';
import MyPage from './MyPage';

function App() {
  const history = useHistory();
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [infoTitle, setInfoTitle] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const isOpen = isLoginPopupOpen || isRegisterPopupOpen || isInfoPopupOpen;
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  //const [currentLogin, setCurrentLogin] = useState({ mame: '', email: '', token: '', _id: '' });

  const registerUser = ({ name, email, password}) => {
    return api.register(name, email, password)
      .then((res) => {
        setLoggedIn(true);
        setIsRegisterPopupOpen(false);
        setInfoTitle('Регистрация прошла успешно');
        setInfoMessage(`Мы отправили вам письмо на адрес ${res.user.email}. 
        Просьба перейти по ссылке для подтверждения адреса почты и активации аккаунта.
        Мы не хотим терять с вами связь на случай утраты пароля.`);
        setIsInfoPopupOpen(true);
        history.push('/');
      })
      .catch((e) => {
        api.catchError(e);
        setIsRegisterPopupOpen(false);
        setInfoTitle('Ошибка регистрации');
        switch(e.status) {
          case 409:
            setInfoMessage('Пользователь с таким email уже зарегистрирован.');
            setIsInfoPopupOpen(true);
            break;
          case 400:
            setInfoMessage('Переданые некорректные данные при создании пользователя.');
            setIsInfoPopupOpen(true);
            break;
          default:
            setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            setIsInfoPopupOpen(true);
            break;
        }
      });
  }

  const loginUser = ({ email, password}) => {
    return api.login(email, password)
      .then((res) => {
        localStorage.setItem('user', res._id );
        setCurrentUser(res.name, res.email, res._id);
        setLoggedIn(true);
        history.push('/');
        setIsLoginPopupOpen(false);
      })
      .catch((e) => {
        api.catchError(e);
        setIsRegisterPopupOpen(false);
        setInfoTitle('Ошибка входа');
        switch(e.status) {
          case 401:
            setInfoMessage('Некорректно указаны почта и/или пароль.');
            setIsInfoPopupOpen(true);
            break;
          case 403:
            setInfoMessage('Для продолжения перейдите по направленной ссылке для подтвеждения email. Мы отправили ссылку повторно.');
            setIsInfoPopupOpen(true);
            break;          
          default:
            setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
            setIsInfoPopupOpen(true);
            break;
        }
      });
  }

  const getAppData = () => {
    Promise.all([api.getUserInfo(localStorage.getItem('user'))])
      .then(([user]) => {
        setCurrentUser(user);
        setLoggedIn(true);
      })
      .catch((e) => {
        api.catchError(e);
        setIsRegisterPopupOpen(false);
        setInfoTitle('Ошибка получения данных о пользователе');
        setInfoMessage('Что-то пошло не так. Попробуйте повторить запрос.');
        setIsInfoPopupOpen(true);
      }); 
  }

  useEffect(() => {
    getAppData();
  }, [])
  
  const handleLoginClick = () => {
    closeAllPopups();
    setIsLoginPopupOpen(true);
  }

  const handleRegisterClick = () => {
    closeAllPopups();
    setIsRegisterPopupOpen(true);
  }
   
  const closeAllPopups = () => {
    setIsLoginPopupOpen(false);
    setIsRegisterPopupOpen(false);
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
      <Header loggedIn={loggedIn} currentUser={currentUser} />
      <Switch>  
        <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={MyPage} /> 

        <Route path="/main">
          <Main handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} />
        </Route> 

      </Switch>

      <RegisterPopup isOpen={isRegisterPopupOpen} onClose={closeAllPopups} onSubmit={registerUser} login={handleLoginClick} />
      <LoginPopup isOpen={isLoginPopupOpen} onClose={closeAllPopups} onSubmit={loginUser} register={handleRegisterClick} />
      <InformPopup isOpen={isInfoPopupOpen} onClose={closeAllPopups} title={infoTitle} message={infoMessage} />

    </CurrentUserContext.Provider>
  );
}

export default App;
