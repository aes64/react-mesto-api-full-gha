import React from "react";
import pen from "../images/pen-edit.svg";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main(props) {
  const { avatar, name, about } = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__box">
          <div className="profile__box-avatar">
            <img
              src={pen}
              alt="карандаш"
              className="profile__edit-avatar"
              onClick={props.onEditAvatar}
            />
            <div
              style={{ backgroundImage: `url(${avatar})` }}
              className="profile__photo"
            ></div>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{name}</h1>
            <button
              className="profile__button-edit link"
              type="button"
              onClick={props.onEditProfile}
            ></button>
            <p className="profile__caption">{about}</p>
          </div>
        </div>
        <button
          className="profile__add-button link"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="gallery">
        {props.cards.map((card) => (
          <Card
            {...card}
            key={card._id}
            card={card}
            onCardClick={props.onHandleCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
