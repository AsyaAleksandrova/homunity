import React from 'react';

function PopupInform({ isOpen, onClose, title, message }) {
   const className = `popup popup_type_inform ${isOpen && 'popup_open'}`;
   return (
      <section className={className}>
         <div className="popup__content">
            <h2 className="popup__title">{ title }</h2>
            <p className='popup__text'>{ message }</p>
            <button onClick={onClose} type="button" className="popup__button">OK</button>
         </div>
      </section>
   )
}

export default PopupInform;