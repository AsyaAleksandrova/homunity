/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import {Resizable} from 're-resizable'
import { ValidateShortInput } from '../hooks/ValidateShortInput';
import { ValidateDate } from '../hooks/ValidateDate';
import ShortTextInput from './ShortTextInput';
import GenderInput from './GenderInput';
import DateInput from './DateInput'
import OptionalTextInput from './OptionalTextInput';

function EditMemberPopup({ isOpen, onClose, member, onSubmit, newOne }) {
   const title = `${newOne ? 'Новая карточка члена семьи' : 'Редактирование карточки'} `
   const [btnName, setBtnName] = useState('Сохранить');
   const [disableButton, setDisableButton] = useState(true);
   const [hideOptions, setHideOptions] = useState(true)
   const classInsideContainer = `popup__choice-inside-container ${hideOptions && 'popup__choice-inside-container_hidden'}`;
   const classHideButton = `popup__choice-hidebutton ${hideOptions && 'popup__choice-hidebutton_hidden'}`;
   
   const [name, setName, handleChangeName] = useForm('');
   const [nameError, checkNameError] = ValidateShortInput();

   const [gender, setGender] = useState('');
   const [genderError, setGenderError] = useState('');

   const [dateBirth, setDateBirth, handleChangeDateBirth] = useForm('');
   const [dateBirthError, checkDateBirthError] = ValidateDate();  

   // const [country, setCountry, handleChangeCountry] = useForm('');
   // const [countryError, checkCountryError] = ValidateShortInput(); 
   // const [addCountry, setAddCountry] = useState(false);

   // const [region, setRegion, handleChangeRegion] = useForm('');
   // const [regionError, checkRegionyError] = ValidateShortInput(); 
   // const [addRegion, setAddRegion] = useState(false);

   // опциональные поля:
   const [surname, setSurname, handleChangeSurname] = useForm('');
   const [surnameError, checkSurnameError] = ValidateShortInput(); 
   const [addSurname, setAddSurname] = useState(false);

   const [patronymic, setPatronymic, handleChangePatronymic] = useForm('');
   const [patronymicError, checkPatronymicError] = ValidateShortInput(); 
   const [addPatronymic, setAddPatronymic] = useState(false);   

   const [biography, setBiography, handleChangeBiography] = useForm('');
   const [addBiography, setAddBiography] = useState(false);
   const [hobby, setHobby, handleChangeHobby] = useForm('');
   const [addHobby, setAddHobby] = useState(false);
   const [achievements, setAchievements, handleChangeAchievements] = useForm('');
   const [addAchievements, setAddAchievements] = useState(false);
   const [rewards, setRewards, handleChangeRewards] = useForm('');
   const [addRewards, setAddRewards] = useState(false);
   const [trips, setTrips, handleChangeTrips] = useForm('');
   const [addTrips, setAddTrips] = useState(false);
   const [books, setBooks, handleChangeBooks] = useForm('');
   const [addBooks, setAddBooks] = useState(false);
   const [sport, setSport, handleChangeSport] = useForm('');
   const [addSport, setAddSport] = useState(false);
   const [music, setMusic, handleChangeMusic] = useForm('');
   const [addMusic, setAddMusic] = useState(false);
   const [cinema, setCinema, handleChangeCinema] = useForm('');
   const [addCinema, setAddCinema] = useState(false);
   const [games, setGames, handleChangeGames] = useForm('');
   const [addGames, setAddGames] = useState(false);
   const [schoolmates, setSchoolmates, handleChangeSchoolmates] = useForm('');
   const [addSchoolmates, setAddSchoolmates] = useState(false);
   const [firstlove, setFirstLove, handleChangeFirstlove] = useForm('');
   const [addFirstlove, setAddFirstlove] = useState(false);
   const [student, setStudent, handleChangeStudent] = useForm('');
   const [addStudent, setAddStudent] = useState(false);
   const [profession, setProfession, handleChangeProfession] = useForm('');
   const [addProfession, setAddProfession] = useState(false);
   const [home, setHome, handleChangeHome] = useForm('');
   const [addHome, setAddHome] = useState(false);
   const [recipe, setRecipe, handleChangeRecipe] = useForm('');
   const [addRecipe, setAddRecipe] = useState(false);

   function hide() {setHideOptions(!hideOptions)}
   function toggleSurname() {setAddSurname(!addSurname)}
   function togglePatronymic() {setAddPatronymic(!addPatronymic)}
   function toggleBiography() {setAddBiography(!addBiography)}
   function toggleHobby() { setAddHobby(!addHobby) }
   function toggleAchievements() { setAddAchievements(!addAchievements) }
   function toggleRewards() { setAddRewards(!addRewards) }
   function toggleTrips() { setAddTrips(!addTrips) }
   function toggleBooks() { setAddBooks(!addBooks) }
   function toggleSport() { setAddSport(!addSport) }
   function toggleMusic() { setAddMusic(!addMusic) }
   function toggleCinema() { setAddCinema(!addCinema) }
   function toggleGames() { setAddGames(!addGames) }
   function toggleSchoolmates() { setAddSchoolmates(!addSchoolmates) }
   function toggleFirstlove() { setAddFirstlove(!addFirstlove) }
   function toggleStudent() { setAddStudent(!addStudent) }
   function toggleProfession() { setAddProfession(!addProfession) }
   function toggleHome() { setAddHome(!addHome) }
   function toggleRecipe() { setAddRecipe(!addRecipe) }
   
   // проверка ошибок и обновление полей:
   useEffect(() => {
      checkButton();
   }, [surnameError, nameError, patronymicError, genderError, dateBirthError])   

   function checkButton() {
      if (!nameError && !surnameError && !patronymicError && !dateBirthError) {
         setDisableButton(false)
      } else setDisableButton(true)
   }

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Сораняем...');
      onSubmit({ surname, name, patronymic, dateBirth })
         .finally(() => {
            setBtnName('Сохранить')
         });
   }

   useEffect(() => {
      if (isOpen) {
         setName(member.name);
         setGender(member.gender);
         setDateBirth(member.dateBirth);
         setSurname(member.surname);
         setPatronymic(member.patronymic);
         setBiography(member.biography);
         setHobby(member.hobby);
         setAchievements(member.achievements);
         setRewards(member.rewards);
         setTrips(member.trips);
         setBooks(member.books);
         setSport(member.sport);
         setMusic(member.music);
         setCinema(member.cinema);
         setGames(member.games);
         setSchoolmates(member.schoolmates);
         setFirstLove(member.firstlove);
         setStudent(member.student);
         setProfession(member.profession);
         setHome(member.home);
         setRecipe(member.recipe);
      } else {
         setName('');
         setGender('');
         setDateBirth('');
         setSurname('');
         setPatronymic('');
         setBiography('');
         setHobby('');
         setAchievements('');
         setRewards('');
         setTrips('');
         setBooks('');
         setSport('');
         setMusic('');
         setCinema('');
         setGames('');
         setSchoolmates('');
         setFirstLove('');
         setStudent('');
         setProfession('');
         setHome('');
         setRecipe('');
      }
      setDisableButton(true);
   }, [isOpen]);

   // рендер

   return (
      <section className={`popup ${isOpen && 'popup_open'}`}>
         <Resizable
            defaultSize={{ width: '90%', height: 'auto' }}
            enable={{ top: false, right: true, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
            maxWidth = {'100%'}
            bounds = {'parent'}
            className="popup__content popup__content_fullscreen">
            <form onSubmit={handleSubmit} name='register' className="popup__form">
               <button onClick={onClose} type="button" className="popup__close"></button>
               <h2 className="popup__title">{title}</h2>
               <div className='popup__choice-container'>
                  <div className={classInsideContainer}>
                     <p className='popup__choice-into'>Добавить информацию</p>
                     {!addSurname && <button onClick={toggleSurname} className='popup__choice-button' type='button'>Фамилия</button>}
                     {!addPatronymic && <button onClick={togglePatronymic} className='popup__choice-button' type='button'>Отчество</button>}
                     {!addBiography && <button onClick={toggleBiography} className='popup__choice-button' type='button'>Биография</button>}
                     {!addHobby && <button onClick={ toggleHobby } className='popup__choice-button' type='button'>Увлечения</button>}
                     {!addAchievements && <button onClick={toggleAchievements} className='popup__choice-button' type='button'>Достижения</button>}
                     {!addRewards && <button onClick={toggleRewards} className='popup__choice-button' type='button'>Награды</button>}
                     {!addTrips && <button onClick={toggleTrips} className='popup__choice-button' type='button'>Путешествия</button>}
                     {!addBooks && <button onClick={toggleBooks} className='popup__choice-button' type='button'>Любимые книги</button>}
                     {!addSport && <button onClick={toggleSport} className='popup__choice-button' type='button'>Спорт</button>}
                     {!addMusic && <button onClick={toggleMusic} className='popup__choice-button' type='button'>Любимая музыка</button>}
                     {!addCinema && <button onClick={toggleCinema} className='popup__choice-button' type='button'>Театр и кино</button>}
                     {!addGames && <button onClick={toggleGames} className='popup__choice-button' type='button'>Детские игры</button>}
                     {!addSchoolmates && <button onClick={toggleSchoolmates} className='popup__choice-button' type='button'>Школьные друзья</button>}
                     {!addFirstlove && <button onClick={toggleFirstlove} className='popup__choice-button' type='button'>Первая любовь</button>}
                     {!addStudent && <button onCanPlay={toggleStudent} className='popup__choice-button' type='button'>Студенческие годы</button>}
                     {!addProfession && <button onClick={toggleProfession} className='popup__choice-button' type='button'>Работа и профессия</button>}
                     {!addHome && <button onClick={toggleHome} className='popup__choice-button' type='button'>Дом и быт</button>}
                     {!addRecipe && <button onClick={toggleRecipe} className='popup__choice-button' type='button'>Фирменные рецепты</button>}
                  </div>
                  <div className='popup__hidebutton-container'>
                     <button onClick={hide} type='button' className={classHideButton}></button>
                  </div>
               </div>
               <div className='popup__person_input_block'>
                  {addSurname && <ShortTextInput input={surname} handleChangeInput={handleChangeSurname} name='Фамилия' required={false} toggleInput={toggleSurname} inputError={surnameError} checkInputError={checkSurnameError} />}   
                  <ShortTextInput input={name} handleChangeInput={handleChangeName} name='Имя' required={true} inputError={nameError} checkInputError={checkNameError} />
                  {addPatronymic && <ShortTextInput input={patronymic} handleChangeInput={handleChangePatronymic} name='Отчество' required={false} toggleInput={togglePatronymic} inputError={patronymicError} checkInputError={checkPatronymicError} />}   
                  <GenderInput gender={gender} setGender={setGender} genderError={genderError} setGenderError={setGenderError} />
               </div>
               <div className='popup__person_input_block'>
                  <DateInput input={dateBirth} handleChangeInput={handleChangeDateBirth} name='Дата рождения' inputError={dateBirthError} checkInputError={checkDateBirthError} />
               </div>
               {addBiography && <OptionalTextInput input={biography} toggleInput={toggleBiography} handleChangeInput={handleChangeBiography} name='Биография'
                  placeholder='Краткая биография' />}
               {addHobby && <OptionalTextInput input={hobby} toggleInput={toggleHobby} handleChangeInput={handleChangeHobby} name='Хобби'
                  placeholder='Хобби' />}
               {addAchievements && <OptionalTextInput input={achievements} toggleInput={toggleAchievements} handleChangeInput={handleChangeAchievements} name='Достижения'
                  placeholder='Чем можно гордиться' />}
               {addRewards && <OptionalTextInput input={rewards} toggleInput={toggleRewards} handleChangeInput={handleChangeRewards} name='Награды'
                  placeholder='Сохранились ли школьные грамоты за конкурс рисунка?' />}
               {addTrips && <OptionalTextInput input={trips} toggleInput={toggleTrips} handleChangeInput={handleChangeTrips} name='Путешествия'
                  placeholder='Сейчас мы свободны путешествовать по всему миру, но во времена СССР поездки были редкими, а значит, запоминающимися на всю жизнь' />}
               {addBooks && <OptionalTextInput input={books} toggleInput={toggleBooks} handleChangeInput={handleChangeBooks} name='Книги которые вдохновляли'
                  placeholder='Возможно, что на книжной полке завалялась та самая книга, которая однажды изменила всю жизнь' />}
               {addSport && <OptionalTextInput input={sport} toggleInput={toggleSport} handleChangeInput={handleChangeSport} name='Спорт'
                  placeholder='О спорт! Ты - мир! (как написал основатель современного олимпийского движения, французский общественный деятель Пьер де Кубертэн)' />}
               {addMusic && <OptionalTextInput input={music} toggleInput={toggleMusic} handleChangeInput={handleChangeMusic} name='Любимая музыка'
                  placeholder='А ваши родители танцевали под "Дюну"?' />}
               {addCinema && <OptionalTextInput input={cinema} toggleInput={toggleCinema} handleChangeInput={handleChangeCinema} name='Театр и кино'
                  placeholder='Даже с появлением интернета они остаются актуальны' />}
               {addGames && <OptionalTextInput input={games} toggleInput={toggleGames} handleChangeInput={handleChangeGames} name='Детские игры'
                  placeholder='Как давно существует игра "казаи-разбойники"?' />}
               {addSchoolmates && <OptionalTextInput input={schoolmates} toggleInput={toggleSchoolmates} handleChangeInput={handleChangeSchoolmates} name='Школьные друзья'
                  placeholder='Говорят, школьная дружба самая крепкая. Согласны?' />}
               {addFirstlove && <OptionalTextInput input={firstlove} toggleInput={toggleFirstlove} handleChangeInput={handleChangeFirstlove} name='Первая любовь'
                  placeholder='Небось опять отличница с двоечником?' />}
               {addStudent && <OptionalTextInput input={student} toggleInput={toggleStudent} handleChangeInput={handleChangeStudent} name='Студенческие годы'
                  placeholder='Первая парта или последние ряды в аудитории?' />}
               {addProfession && <OptionalTextInput input={profession} toggleInput={toggleProfession} handleChangeInput={handleChangeProfession} name='Работа и профессия'
                  placeholder='Работа занимает большую часть нашего времени, поэтому важно найти свое призвание, чтобы основное время мы проводили с интересом и удовольствием!' />}
               {addHome && <OptionalTextInput input={home} toggleInput={toggleHome} handleChangeInput={handleChangeHome} name='Дом и быт'
                  placeholder='Пробовали на современных картах с панорамой найти дом, в котором жили 100 лет назад ваши предки?' />}
               {addRecipe && <OptionalTextInput input={recipe} toggleInput={toggleRecipe} handleChangeInput={handleChangeRecipe} name='Фирменные рецепты'
                  placeholder='Рецепт какого торта передается в вашей семье из поколения в поколение?' />}
               <button type="submit" className="popup__button popup__button_small" disabled={disableButton}>{btnName}</button>
            </form>
         </Resizable>
      </section>
   )
}

export default EditMemberPopup;
