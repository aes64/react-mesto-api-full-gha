function PopupWithForm(props) {
  return (
    <>
      <div
        className={`popup popup_${props.name} ${
          props.isOpen ? "popup_is-opened" : ""
        }`}
      >
        <div className="popup__container">
          <h2 className="popup__content-title">{props.title}</h2>
          <form className="popup__form">
            {props.children}
            <button
              className="popup__button-save popup__form-submit"
              type="submit"
              onClick={props.onSubmit}
            >
              {props.buttonText}
            </button>
          </form>
          <button
            className="popup__button-close link"
            type="button"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
