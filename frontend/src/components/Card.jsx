import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  const user = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner === user._id;
  const cardDeleteButtonClassName = `gallery__button-delete link ${
    isOwn ? "" : "gallery__button-delete_type_hidden"
  }`;
  const isLiked = props.card.likes?.includes(user._id);
  const cardLikeButtonClassName = `gallery__button-like link ${isLiked ? 'gallery__button-like_active' : '' }`;

  return (
    <div className="gallery__element">
      <img
        src={props.link}
        alt={props.name}
        className="gallery__photo"
        onClick={handleCardClick}
      />
      <div className="gallery__element-description">
        <h2 className="gallery__element-title">{props.name}</h2>
        <div className="gallery__container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="gallery__counter-of-likes">
            {props.card.likes?.length}
          </span>
        </div>
      </div>
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
    </div>
  );
}

export default Card;
