import React from 'react';

function InformPopup({ isOpen, onClose, title, message }) {
   const className = `popup popup_type_inform ${isOpen && 'popup_open'}`;
   return (
      <section className={className}>
         <div className="popup__content">
            <h2 className="popup__title">{ title }</h2>
            <p className='popup__text'>{ message }</p>
            <p className='popup__question'>Остались вопросы? <button type='button' className='popup__link'>&rarr; ЗАПОЛНИТЕ ФОРМУ ОБРАТНОЙ СВЯЗИ</button></p>
            <button onClick={onClose} type="button" className="popup__button">OK</button>
         </div>
      </section>
   )
}

export default InformPopup;