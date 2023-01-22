import React from 'react';

function AcceptDeletePopup({ isOpen, onClose, onAccept }) {
   const className = `popup popup_type_inform ${isOpen && 'popup_open'}`;
   return (
      <section className={className}>
         <div className="popup__content">
            <h2 className="popup__title">Подтверждение</h2>
            <p className='popup__text'>Вы уверены, что хотите удалить раздел? Информация не будет сохранена.</p>
            <button type='button' onClick={onAccept} className=" popup__button popup__button_accept">Удалить</button>
            <button type='button' onClick={onClose} className="popup__button popup__button_cancel">Отменить</button>
         </div>
      </section>
   )
}

export default AcceptDeletePopup;