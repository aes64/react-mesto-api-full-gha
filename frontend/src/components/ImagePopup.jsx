function ImagePopup(props) {
  return (
    <div
      className={`popup popup_photo-zoom popup_${props.name} ${
        props.isOpen ? "popup_is-opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_photo-zoom">
        <img
          className="popup__img"
          alt={props.card.name}
          src={props.card.link}
        />
        <p className="popup__title">{props.card.name}</p>
        <button
          className="popup__button-close popup__button-close_type_photo-zoom link"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
