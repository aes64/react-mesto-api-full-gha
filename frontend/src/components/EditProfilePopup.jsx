import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentUser.name) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, isOpen]);

  function handleChangeForm(evt) {
    if (evt.target.name === "name") {
      setName(evt.target.value);
    }
    if (evt.target.name === "about") {
      setDescription(evt.target.value);
    }
  }

  function handleSubmitForm(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      title={"Редактировать профиль"}
      onSubmit={handleSubmitForm}
    >
      <input
        className="popup__input popup__input_type_name"
        id="name-input"
        name="name"
        type="text"
        minLength="2"
        maxLength="40"
        required
        placeholder="Имя"
        value={name}
        onChange={handleChangeForm}
      />
      <span className="popup__error name-input-error"></span>
      <input
        className="popup__input popup__input_type_caption"
        id="caption-input"
        name="about"
        type="text"
        minLength="2"
        maxLength="200"
        required
        placeholder="Описание"
        value={description}
        onChange={handleChangeForm}
      />
      <span className="popup__error caption-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
