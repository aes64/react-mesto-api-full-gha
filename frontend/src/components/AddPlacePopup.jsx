import { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameCardRef = useRef();
  const linkCardRef = useRef();

  useEffect(() => {
    if (isOpen) {
      nameCardRef.current.value = "";
      linkCardRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmitAddCard(evt) {
    evt.preventDefault();
    onAddPlace({
      name: nameCardRef.current.value,
      link: linkCardRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Создать"
      title={"Новое место"}
      onSubmit={handleSubmitAddCard}
    >
      <input
        className="popup__input popup__input_type_place-name"
        id="place-name"
        name="name"
        type="text"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        ref={nameCardRef}
      />
      <span className="popup__error place-name-error"></span>
      <input
        className="popup__input popup__input_type_link"
        id="link"
        name="link"
        type="url"
        placeholder="Ссылка на картинку"
        required
        ref={linkCardRef}
      />
      <span className="popup__error link-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
