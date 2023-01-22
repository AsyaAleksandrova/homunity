import React, { useState } from 'react';
import AcceptDeletePopup from './AcceptDeletePopup';

function PhotoInput({ toggleInput, setInput, name, setIsInfoPopupOpen, setInfoTitle, setInfoMessage }) {
   const [acceptDeletePopupOpen, setAcceptDeletePopupOpen] = useState(false);
   const [url, setUrl] = useState('')
   const fileReader = new FileReader();

   fileReader.onloadend = () => {
      setUrl(fileReader.result);
   }
   
   function onLoadFile(e) {
      e.preventDefault();
      let file = e.target.files[0];
      if (file) {
         if (file.size < 500001) {
            setInput(file)
            fileReader.readAsDataURL(file);
         } else {
            setInfoTitle('Ошибка загрузки файла');
            setInfoMessage('Превышен максимально допустимый размер изображения. Пожалуйста, воспользуйтесь бесплатными онлайн-сервисами для сжатия изображений');
            setIsInfoPopupOpen(true);
         }
      }
   }

   function closeAcceptDeletePoput() {
      setAcceptDeletePopupOpen(false)
   };
   function acceptDeletion() {
      setAcceptDeletePopupOpen(false);
      toggleInput();
   }

   return (
      <div className='popup__person-input_container'>
         <label className="popup__person-input_label">{name}</label>
         <label htmlFor='photo' className='popup__person-input_photo-label'>
            <img src={url ? url : 'free-icon-portrait.png'} alt='Ваше фото' className='popup__person-input_photo-preview'/>
         </label>
         <input onChange={onLoadFile} type='file' accept="image/*, .png, .jpg, .jpeg" id='photo' className="popup__person-input popup__person-input_photo" />
         <p className='popup__person-input_photo-text'>Размер файла не должен превышать 0.5 Мб. При необходимости, воспользуйтесь бесплатными онлайн-сервисами для сжатия изображений</p>
         <button type='button' onClick={setAcceptDeletePopupOpen} className="popup__person-input_delete"></button>
         <AcceptDeletePopup isOpen={acceptDeletePopupOpen} onAccept={acceptDeletion} onClose={closeAcceptDeletePoput} />
      </div>              
   )
}

export default PhotoInput;
