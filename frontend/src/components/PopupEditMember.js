/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import {Resizable} from 're-resizable'
import { ValidateShortInput } from '../hooks/ValidateShortInput';
import { ValidateDate } from '../hooks/ValidateDate';
import InputShortText from './InputShortText';
import InputGender from './InputGender';
import InputDate from './InputDate'
import InputOptionalText from './InputOptionalText';
import InputPhoto from './InputPhoto';

function PopupEditMember({ isOpen, onClose, member,  onSubmit, newOne, openPopupInfo }) {
   const title = `${newOne ? 'Новая карточка члена семьи' : 'Редактирование карточки'} `
   const [btnName, setBtnName] = useState('Сохранить');
   const [disableButton, setDisableButton] = useState(true);
   const [hideOptions, setHideOptions] = useState(true)
   const classInsideContainer = `popup__choice-inside-container ${hideOptions && 'popup__choice-inside-container_hidden'}`;
   const classHideButton = `popup__choice-hidebutton ${hideOptions && 'popup__choice-hidebutton_hidden'}`;
   
   const [name, setName, handleChangeName] = useForm('');
   const [nameError, checkNameError] = ValidateShortInput();
   const [blurName, setBlurName] = useState(false);

   const [gender, setGender] = useState('');
   const [genderError, setGenderError] = useState('');
   const [blurGender, setBlurGender] = useState(false);

   const [yearsOfLifeStart, setYearsOfLifeStart] = useState({strictDate: '', year: ''});
   const [dateBirthError, checkDateBirthError] = ValidateDate();
   const [blurBirth, setBlurBirth] = useState(false);

   const [yearsOfLifeEnd, setYearsOfLifeEnd] = useState({strictDate: '', year: '', tillNow: true});
   const [dateDeathError, checkDateDeathError] = ValidateDate();
   const [blurDeath, setBlurDeath] = useState(false);

   const [dateError, setDateError] = useState('');
   useEffect(() => {
      if (dateBirthError === '') {
         setDateError(dateDeathError);
      }
   }, [dateBirthError, dateDeathError])

   // const [country, setCountry, handleChangeCountry] = useForm('');
   // const [countryError, checkCountryError] = ValidateShortInput();
   // const [addCountry, setAddCountry] = useState(false);

   // const [region, setRegion, handleChangeRegion] = useForm('');
   // const [regionError, checkRegionyError] = ValidateShortInput();
   // const [addRegion, setAddRegion] = useState(false);

   // опциональные поля:
   const [photo, setPhoto] = useState({});
   const [addPhoto, setAddPhoto] = useState(false);

   const [surname, setSurname, handleChangeSurname] = useForm('');
   const [surnameError, checkSurnameError] = ValidateShortInput(); 
   const [blurSurname, setBlurSurname] = useState(false);
   const [addSurname, setAddSurname] = useState(false);

   const [patronymic, setPatronymic, handleChangePatronymic] = useForm('');
   const [patronymicError, checkPatronymicError] = ValidateShortInput(); 
   const [blurPatronymic, setBlurPatronymic] = useState(false);
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

   function hide() { setHideOptions(!hideOptions) }
   function togglePhoto() { setAddPhoto(!addPhoto);  if(!addPhoto){setPhoto({})}}
   function toggleSurname() { setAddSurname(!addSurname);  if(!addSurname){setSurname('')}}
   function togglePatronymic() { setAddPatronymic(!addPatronymic);  if(!addPatronymic){setPatronymic('')}}
   function toggleBiography() { setAddBiography(!addBiography); if(!addBiography){setBiography('')}}
   function toggleHobby() { setAddHobby(!addHobby); if(!addHobby){setHobby('')}}
   function toggleAchievements() { setAddAchievements(!addAchievements) }
   function toggleRewards() { setAddRewards(!addRewards); if(!addRewards){setRewards('')}}
   function toggleTrips() { setAddTrips(!addTrips); if(!addTrips){setTrips('')}}
   function toggleBooks() { setAddBooks(!addBooks); if(!addBooks){setBooks('')}}
   function toggleSport() { setAddSport(!addSport); if(!addSport) {setSport('')}}
   function toggleMusic() { setAddMusic(!addMusic); if(!addMusic) {setMusic('')}}
   function toggleCinema() { setAddCinema(!addCinema); if(!addCinema){setCinema('')}}
   function toggleGames() { setAddGames(!addGames); if(!addGames){setGames('')}}
   function toggleSchoolmates() { setAddSchoolmates(!addSchoolmates); if(!addSchoolmates){setSchoolmates('')}}
   function toggleFirstlove() { setAddFirstlove(!addFirstlove); if(!addFirstlove){setFirstLove('')}}
   function toggleStudent() { setAddStudent(!addStudent); if(!addStudent){setStudent('')}}
   function toggleProfession() { setAddProfession(!addProfession); if(!addProfession){setProfession('')}}
   function toggleHome() { setAddHome(!addHome); if(!addHome){setHome('')}}
   function toggleRecipe() { setAddRecipe(!addRecipe); if(!addRecipe){setRecipe('')}}
   
   // проверка ошибок:
   useEffect(() => {
      checkButton();
   }, [surnameError, nameError, patronymicError, genderError, dateError, addSurname, addPatronymic, blurName, blurSurname, blurPatronymic, blurGender, blurBirth, blurDeath])   

   function checkButton() {
      if (
         (!nameError && blurName) &&
         ((!surnameError ) || !addSurname) &&
         ((!patronymicError ) || !addPatronymic) &&
         (!dateError && blurBirth && (yearsOfLifeEnd.tillNow === true || blurDeath)) &&
         (!genderError && blurGender)
      ) {
         setDisableButton(false)
      } else setDisableButton(true)
   }

   // отправка формы и обновлеие полей:

   function handleSubmit(e) {
      e.preventDefault();
      setBtnName('Сохраняем...');
      onSubmit({
         member: {
            surname, name, patronymic, yearsOfLifeStart, yearsOfLifeEnd,
            description: {
               biography, hobby, achievements, rewards, trips,
               books, sport, music, cinema, games, schoolmates,
               firstlove, student, profession, home, recipe}
         },
         file: photo
      })
         .finally(() => {
            setBtnName('Сохранить')
         });
   }

   useEffect(() => {
      if (isOpen) {
         setPhoto({});
         setName(member.name);
         setGender(member.gender);
         setYearsOfLifeStart(member.yearsOfLifeStart);
         setYearsOfLifeEnd(member.yearsOfLifeEnd);
         setSurname(member.surname);
         setPatronymic(member.patronymic);
         setBiography(member.description.biography);
         setHobby(member.description.hobby);
         setAchievements(member.description.achievements);
         setRewards(member.description.rewards);
         setTrips(member.description.trips);
         setBooks(member.description.books);
         setSport(member.description.sport);
         setMusic(member.description.music);
         setCinema(member.description.cinema);
         setGames(member.description.games);
         setSchoolmates(member.description.schoolmates);
         setFirstLove(member.description.firstlove);
         setStudent(member.description.student);
         setProfession(member.description.profession);
         setHome(member.description.home);
         setRecipe(member.description.recipe);
      } else {
         setPhoto({}); setName(''); setGender(''); setYearsOfLifeStart({}); setYearsOfLifeEnd({}); setSurname(''); setPatronymic('');
         setBiography(''); setHobby(''); setAchievements(''); setRewards(''); setTrips('');
         setBooks(''); setSport(''); setMusic(''); setCinema(''); setGames(''); setSchoolmates('');
         setFirstLove(''); setStudent(''); setProfession(''); setHome(''); setRecipe('');
         setHideOptions(true)
         setAddSurname(false); setAddPatronymic(false); setAddBiography(false); setAddHobby(false);
         setAddAchievements(false); setAddRewards(false); setAddTrips(false); setAddBooks(false);
         setAddSport(false); setAddMusic(false); setAddCinema(false); setAddGames(false);
         setAddSchoolmates(false); setAddFirstlove(false); setAddStudent(false); setAddProfession(false);
         setAddHome(false); setAddRecipe(false);
      }
      setBlurName(false);
      setBlurSurname(false);
      setBlurPatronymic(false);
      setBlurGender(false);
      setBlurBirth(false);
      setBlurDeath(false);
      setDisableButton(true);
   }, [isOpen]);

   // рендер

   return (
      <section className={`popup popup_fullscreen ${isOpen && 'popup_open'}`}>
         <Resizable
            defaultSize={{ width: '90%', height: 'auto' }}
            enable={{ top: false, right: true, bottom: false, left: true, topRight: false, bottomRight: false, bottomLeft: false, topLeft: false }}
            maxWidth={'100%'}
            className="popup__content popup__content_fullscreen">
            <form onSubmit={handleSubmit} name='register' className="popup__form">
               <button onClick={onClose} type="button" className="popup__close"></button>
               <h2 className="popup__title">{title}</h2>
               <div className='popup__choice-container'>
                  <div className={classInsideContainer}>
                     <p className='popup__choice-into'>Выберите то, что хотите сохранить в памяти</p>
                     <p className='popup__choice-into'>Июньские зори, июльские полдни, августовские вечера — все прошло, кончилось,
                        ушло навсегда и осталось только в памяти. Теперь впереди долгая осень, белая зима, прохладная зеленеющая весна,
                        и за это время нужно обдумать минувшее лето и подвести итог. А если он что-нибудь забудет — что ж,
                        в погребе стоит вино из одуванчиков, на каждой бутылке выведено число, и в них — все дни лета, все до единого.
                        (Рэй Брэдбери, "Вино из одуванчиков")</p>
                     {!addPhoto && <button onClick={togglePhoto} className='popup__choice-button' type='button'>Фото</button>}
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
                     {!addStudent && <button onClick={toggleStudent} className='popup__choice-button' type='button'>Студенческие годы</button>}
                     {!addProfession && <button onClick={toggleProfession} className='popup__choice-button' type='button'>Работа и профессия</button>}
                     {!addHome && <button onClick={toggleHome} className='popup__choice-button' type='button'>Дом и быт</button>}
                     {!addRecipe && <button onClick={toggleRecipe} className='popup__choice-button' type='button'>Фирменные рецепты</button>}
                  </div>
                  <div className='popup__hidebutton-container'>
                     <button onClick={hide} type='button' className={classHideButton}></button>
                  </div>
               </div>
               <div className='popup__person_input_block'>
                  {addPhoto &&
                     <InputPhoto toggleInput={togglePhoto} input={photo} setInput={setPhoto} name='Фото' openPopupInfo={openPopupInfo} />}
                  {addSurname &&
                     <InputShortText input={surname} handleChangeInput={handleChangeSurname} name='Фамилия' required={false} toggleInput={toggleSurname}
                        inputError={surnameError} checkInputError={checkSurnameError} blurInput={blurSurname} setBlurInput={setBlurSurname} />}   
                  <InputShortText input={name} handleChangeInput={handleChangeName} name='Имя' required={true} inputError={nameError} checkInputError={checkNameError} blurInput={blurName} setBlurInput={setBlurName} />
                  {addPatronymic &&
                     <InputShortText input={patronymic} handleChangeInput={handleChangePatronymic} name='Отчество' required={false} toggleInput={togglePatronymic}
                        inputError={patronymicError} checkInputError={checkPatronymicError} blurInput={blurPatronymic} setBlurInput={setBlurPatronymic} />}   
                  <InputGender gender={gender} setGender={setGender} genderError={genderError} setGenderError={setGenderError} blurGender={blurGender} setBlurGender={setBlurGender} />
               </div>
               <div className='popup__person_input_block'>
                  <div className='popup__person-input_container'>
                     <label className="popup__person-input_label">Годы жизни</label>
                     <InputDate input={yearsOfLifeStart} setInput={setYearsOfLifeStart} checkInputError={checkDateBirthError} mayBeTillNow={false} blurInput={blurBirth} setBlurInput={setBlurBirth}  />
                     <p> - </p>
                     <InputDate input={yearsOfLifeEnd} setInput={setYearsOfLifeEnd} checkInputError={checkDateDeathError} mayBeTillNow={true} blurInput={blurDeath} setBlurInput={setBlurDeath} />
                     {dateError && <p className='popup__person-input_error popup__person-input_error_date'>{dateError}</p>}
                  </div> 
               </div>
               {addBiography && <InputOptionalText input={biography} toggleInput={toggleBiography} handleChangeInput={handleChangeBiography} name='Биография'
                  placeholder='Краткая биография' />}
               {addHobby && <InputOptionalText input={hobby} toggleInput={toggleHobby} handleChangeInput={handleChangeHobby} name='Увлечения'
                  placeholder='Хобби' />}
               {addAchievements && <InputOptionalText input={achievements} toggleInput={toggleAchievements} handleChangeInput={handleChangeAchievements} name='Достижения'
                  placeholder='Чем можно гордиться' />}
               {addRewards && <InputOptionalText input={rewards} toggleInput={toggleRewards} handleChangeInput={handleChangeRewards} name='Награды'
                  placeholder='Сохранились ли школьные грамоты за конкурс рисунка?' />}
               {addTrips && <InputOptionalText input={trips} toggleInput={toggleTrips} handleChangeInput={handleChangeTrips} name='Путешествия'
                  placeholder='Сейчас мы свободны путешествовать по всему миру, но во времена СССР поездки были редкими, а значит, запоминающимися на всю жизнь' />}
               {addBooks && <InputOptionalText input={books} toggleInput={toggleBooks} handleChangeInput={handleChangeBooks} name='Книги которые вдохновляли'
                  placeholder='Возможно, что на книжной полке завалялась та самая книга, которая однажды изменила всю жизнь' />}
               {addSport && <InputOptionalText input={sport} toggleInput={toggleSport} handleChangeInput={handleChangeSport} name='Спорт'
                  placeholder='О спорт! Ты - мир! (как написал основатель современного олимпийского движения, французский общественный деятель Пьер де Кубертэн)' />}
               {addMusic && <InputOptionalText input={music} toggleInput={toggleMusic} handleChangeInput={handleChangeMusic} name='Любимая музыка'
                  placeholder='А ваши родители танцевали под "Дюну"?' />}
               {addCinema && <InputOptionalText input={cinema} toggleInput={toggleCinema} handleChangeInput={handleChangeCinema} name='Театр и кино'
                  placeholder='Даже с появлением интернета они остаются актуальны' />}
               {addGames && <InputOptionalText input={games} toggleInput={toggleGames} handleChangeInput={handleChangeGames} name='Детские игры'
                  placeholder='Как давно существует игра "казаи-разбойники"?' />}
               {addSchoolmates && <InputOptionalText input={schoolmates} toggleInput={toggleSchoolmates} handleChangeInput={handleChangeSchoolmates} name='Школьные друзья'
                  placeholder='Говорят, школьная дружба самая крепкая. Согласны?' />}
               {addFirstlove && <InputOptionalText input={firstlove} toggleInput={toggleFirstlove} handleChangeInput={handleChangeFirstlove} name='Первая любовь'
                  placeholder='Небось опять отличница с двоечником?' />}
               {addStudent && <InputOptionalText input={student} toggleInput={toggleStudent} handleChangeInput={handleChangeStudent} name='Студенческие годы'
                  placeholder='Первая парта или последние ряды в аудитории?' />}
               {addProfession && <InputOptionalText input={profession} toggleInput={toggleProfession} handleChangeInput={handleChangeProfession} name='Работа и профессия'
                  placeholder='Работа занимает большую часть нашего времени, поэтому важно найти свое призвание, чтобы основное время мы проводили с интересом и удовольствием!' />}
               {addHome && <InputOptionalText input={home} toggleInput={toggleHome} handleChangeInput={handleChangeHome} name='Дом и быт'
                  placeholder='Пробовали на современных картах с панорамой найти дом, в котором жили 100 лет назад ваши предки?' />}
               {addRecipe && <InputOptionalText input={recipe} toggleInput={toggleRecipe} handleChangeInput={handleChangeRecipe} name='Фирменные рецепты'
                  placeholder='Рецепт какого торта передается в вашей семье из поколения в поколение?' />}
               <button type="submit" className="popup__button popup__button_small" disabled={disableButton}>{btnName}</button>
            </form>
         </Resizable>
      </section>
   )
}

export default PopupEditMember;
