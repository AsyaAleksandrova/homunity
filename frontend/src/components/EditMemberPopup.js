import React, { useState, useEffect } from 'react';
import { useForm } from '../hooks/useForm';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faPersonDress } from '@fortawesome/free-solid-svg-icons';
import { faPersonCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { ValidateShortInput } from '../hooks/ValidateShortInput';
import { ValidateDate } from '../hooks/ValidateDate';
import OptionalTextInput from './OptionalTextInput';

function EditMemberPopup({ isOpen, onClose, member, onSubmit, newOne }) {
   const [btnName, setBtnName] = useState('Сохранить');
   const title = `${newOne ? 'Новая карточка члена семьи' : 'Редактирование карточки'} `
   const [disableButton, setDisableButton] = useState(true);
   const [hideOptions, setHideOptions] = useState(true)
   const classInsideContainer = `popup__choice-inside-container ${hideOptions && 'popup__choice-inside-container_hidden'}`;
   const classHideButton = `popup__choice-hidebutton ${hideOptions && 'popup__choice-hidebutton_hidden'}`;
   
   const [name, isChangedName, handleChangeName, refreshName] = useForm('');
   const [blurName, setBlurName] = useState(false);
   const [nameError, checkNameError] = ValidateShortInput();

   const [surname, isChangedSurname, handleChangeSurname, refreshSurname] = useForm('');
   const [blurSurname, setBlurSurame] = useState(false);
   const [surnameError, checkSurnameError] = ValidateShortInput(); 
   const [addSurname, setAddSurname] = useState(false);

   const [patronymic, isChangedPatronymic, handleChangePatronymic, refreshPatronymic] = useForm('');
   const [blurPatronymic, setBlurPatronymic] = useState(false);
   const [patronymicError, checkPatronymicError] = ValidateShortInput(); 
   const [addPatronymic, setAddPatronymic] = useState(false);

   const [gender, setGender] = useState('');
   const [male, setMale] = useState(false);
   const [female, setFemale] = useState(false);
   const [nogender, setNogender] = useState(false);
   const [genderError, setGenderError] = useState('');

   const [dateBirth, isChangedDateBirth, handleChangeDateBirth, refreshDateBirth] = useForm('');
   const [dateBirthNotSet, setDateBirthNotSet] = useState(false);
   const [blurDateBirth, setBlurDateBirth] = useState(false);
   const [dateBirthError, checkDateBirthError] = ValidateDate();
   const classCheckBirth = `popup__person-input popup__person-input_checkbox ${dateBirthNotSet && 'popup__person-input_checkbox_checked'}`   

   const [country, isChangedCountry, handleChangeCountry, refreshCountry] = useForm('');
   const [countryError, checkCountryError] = ValidateShortInput(); 
   const [addCountry, setAddCountry] = useState(false);

   const [region, isChangedRegion, handleChangeRegion, refreshRegion] = useForm('');
   const [regionError, checkRegionyError] = ValidateShortInput(); 
   const [addRegion, setAddRegion] = useState(false);

   // опциональные поля:

   const [biography, isChangedBiography, handleChangeBiography, refreshBiography] = useForm('');
   const [addBiography, setAddBiography] = useState(false);
   const [hobby, isChangedHobby, handleChangeHobby, refreshHobby] = useForm('');
   const [addHobby, setAddHobby] = useState(false);
   const [achievements, isChangedAchievements, handleChangeAchievements, refreshAchievements] = useForm('');
   const [addAchievements, setAddAchievements] = useState(false);
   const [rewards, isChangedRewards, handleChangeRewards, refreshRewards] = useForm('');
   const [addRewards, setAddRewards] = useState(false);
   const [trips, isChangedTrips, handleChangeTrips, refreshTrips] = useForm('');
   const [addTrips, setAddTrips] = useState(false);
   const [books, isChangedBooks, handleChangeBooks, refreshBooks] = useForm('');
   const [addBooks, setAddBooks] = useState(false);
   const [sport, isChangedSport, handleChangeSport, refreshSport] = useForm('');
   const [addSport, setAddSport] = useState(false);
   const [music, isChangedMusic, handleChangeMusic, refreshMusic] = useForm('');
   const [addMusic, setAddMusic] = useState(false);
   const [cinema, isChangedCinema, handleChangeCinema, refreshCinema] = useForm('');
   const [addCinema, setAddCinema] = useState(false);
   const [games, isChangedGames, handleChangeGames, refreshGames] = useForm('');
   const [addGames, setAddGames] = useState(false);
   const [schoolmates, isChangedSchoolmates, handleChangeSchoolmates, refreshSchoolmates] = useForm('');
   const [addSchoolmates, setAddSchoolmates] = useState(false);
   const [firstlove, isChangedFirstlove, handleChangeFirstlove, refreshFirstlove] = useForm('');
   const [addFirstlove, setAddFirstlove] = useState(false);
   const [student, isChangedStudent, handleChangeStudent, refreshStudent] = useForm('');
   const [addStudent, setAddStudent] = useState(false);
   const [profession, isChangedProfession, handleChangeProfession, refreshProfession] = useForm('');
   const [addProfession, setAddProfession] = useState(false);
   const [home, isChangedHome, handleChangeHome, refreshHome] = useForm('');
   const [addHome, setAddHome] = useState(false);
   const [recipe, isChangedRecipe, handleChangeRecipe, refreshRecipe] = useForm('');
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
   
   // проверка ошибок в обязательных полях:

   useEffect(() => {checkNameError(name)}, [name]);
   useEffect(() => {checkSurnameError(surname)}, [surname]);
   useEffect(() => {checkPatronymicError(patronymic)}, [patronymic]);

   function onClickMale() {
      if (!male) {setMale(true); setFemale(false); setNogender(false); setGender('Male'); setGenderError('')
      } else { setMale(false); setFemale(false); setNogender(false); setGender(''); setGenderError('Поле не может быть пустым')}}
   function onClickFemale() {
      if (!female) {setFemale(true); setMale(false); setNogender(false); setGender('Female'); setGenderError('')
      } else {setMale(false); setFemale(false); setNogender(false); setGender(''); setGenderError('Поле не может быть пустым')}}
   function onClickNoGender() {
      if (!nogender) {setNogender(true); setMale(false); setFemale(false); setGender('NoGender'); setGenderError('')
      } else {setMale(false); setFemale(false); setNogender(false); setGender(''); setGenderError('Поле не может быть пустым')}}   

   useEffect(() => {checkDateBirthError(dateBirth, dateBirthNotSet)}, [dateBirth, dateBirthNotSet]);
   function checkBirthNonSet() { setDateBirthNotSet(!dateBirthNotSet) }
   
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
      //refreshName();
      setDisableButton(true);
   }, [isOpen]);

   return (
      <section className={`popup ${isOpen && 'popup_open'}`}>
         <div className="popup__content popup__content_fullscreen">
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
                  {addSurname &&
                     <div className='popup__person-input_container'>
                        <label className="popup__person-input_label">Фамилия</label>
                        <input onBlur={setBlurSurame} onChange={handleChangeSurname} value={surname} type="text" name="surname" className="popup__person-input popup__person-input_small" placeholder="Фамилия" />
                        <button onClick={toggleSurname} className="popup__person-input_delete"></button>
                        {(blurSurname && surnameError) && <p className='popup__person-input_error'>{surnameError}</p>}
                     </div>
                  }   
                  <div className='popup__person-input_container'>
                     <label className="popup__person-input_label">Имя</label>
                     <input onBlur={ setBlurName } onChange={handleChangeName} value={name} type="text" name="name" required className="popup__person-input popup__person-input_small" placeholder="Имя" />
                     {(blurName && nameError) && <p className='popup__person-input_error'>{ nameError }</p>}
                  </div>
                  {addPatronymic &&
                     <div className='popup__person-input_container'>
                        <label className="popup__person-input_label">Отчество</label>
                        <input onBlur={setBlurPatronymic} onChange={handleChangePatronymic} value={patronymic} type="text" name="patronymic" className="popup__person-input popup__person-input_small" placeholder="Отчество" />
                        <button onClick={togglePatronymic} className="popup__person-input_delete"></button>
                        {(blurPatronymic && patronymicError) && <p className='popup__person-input_error'>{patronymicError}</p>}
                     </div>}   
                  <div className='popup__person-input_container'>
                     <label className="popup__person-input_label">Пол</label>
                     <div onClick={onClickMale} className="popup__person-input_gender">
                        <FontAwesomeIcon icon={faPerson} style={{ color: `${!male? '#969BA2': '#394650'}` }} transform="grow-9" />
                     </div>
                     <div onClick={onClickFemale} className="popup__person-input_gender">
                        <FontAwesomeIcon icon={faPersonDress} style={{ color: `${!female? '#969BA2': '#394650'}` }} transform="grow-9" />
                     </div>
                     <div onClick={onClickNoGender} className="popup__person-input_gender">
                        <FontAwesomeIcon icon={faPersonCircleQuestion} style={{ color: `${!nogender? '#969BA2': '#394650'}` }} transform="grow-9" />
                     </div>  
                     {(genderError) && <p className='popup__person-input_error'>{ genderError }</p>}
                  </div>                  
               </div>
               <div className='popup__person-input_container'>
                  <label className="popup__person-input_label">Дата рождения</label>
                  <input onBlur={ setBlurDateBirth } onChange={handleChangeDateBirth} value={dateBirth} type="date" name="dateBirth" className="popup__person-input popup__person-input_small" placeholder="" />
                  {(blurDateBirth && dateBirthError) && <p className='popup__person-input_error'>{dateBirthError}</p>}
                  <div onClick={checkBirthNonSet} className={classCheckBirth}>
                  </div>
                  <p className="popup__person-input_label">Не известна</p>
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
         </div>
      </section>
   )
}

export default EditMemberPopup;
