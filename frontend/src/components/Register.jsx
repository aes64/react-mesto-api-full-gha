import { Link } from "react-router-dom";
import { React, useState } from "react";

function Register({ onSubmit }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(user);
  };

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            className="auth__input"
            placeholder="Email"
            name="email"
            type="email"
            required
            onChange={handleChange}
            value={user.email}
          ></input>
          <input
            className="auth__input"
            placeholder="Пароль"
            name="password"
            type="password"
            required
            onChange={handleChange}
            value={user.password}
          ></input>
          <button className="auth__button" type="submit">
            Зарегистрироваться
          </button>
        </fieldset>
      </form>
      <p className="auth__caption">
        Уже зарегистрированы? <Link className="auth__link link" to="/sign-in">Войти</Link>
      </p>
    </div>
  );
}

export default Register;
