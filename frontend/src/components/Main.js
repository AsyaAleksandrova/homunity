import React from "react";

function Main({ handleLoginClick, handleRegisterClick}) {
  return (
    <div className="root">
      <main className="main">
        <section className="main__container">
          <h1 className="main__synthesis">Ecce homo!</h1>
          <p className="main__intro">
            Много ли вы знаете о том, как жили ваши бабушки и дедушки?
            В&nbsp;какие игры они играли в&nbsp;детстве, какое было их любимое лакомство и
            какую музыку они слушали? <br></br>
            <br></br>
            Создание странички для своей родословной - хороший повод пообщаться
            в&nbsp;тесном кругу семьи и стать чуточку ближе друг&nbsp;к&nbsp;другу!
            Так&nbsp;что зовите своих родных и приготовьтесь окунуться в&nbsp;воспоминания.<br></br>
            Горячее какао и уютный плед будут очень к&nbsp;месту<br></br>
            <br></br>
            А мы дополним ваши воспоминания историческим и общественным контекстом,
            чтобы лучше понимать время, в&nbsp;которое жил человек.
            <br></br><br></br>
          </p>
          <button onClick={handleLoginClick} type="button" className="main__button main__button_type_in">ВХОД</button>
          <button onClick={handleRegisterClick} type="button" className="main__button main__button_type_reg">РЕГИСТРАЦИЯ</button>
        </section>
      </main>
     </div>
  );
}

export default Main;
