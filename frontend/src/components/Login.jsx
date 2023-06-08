import React, { useState } from "react";

function Login({ onSubmit }) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setUser({
      ...user,
      [name]: value.toLowerCase(),
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit(user);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__fieldset">
          <input
            className="auth__input"
            id="email"
            placeholder="Email"
            name="email"
            type="email"
            required
            value={user.email}
            onChange={handleChange}
          ></input>
          <input
            className="auth__input"
            placeholder="Пароль"
            name="password"
            type="password"
            required
            onChange={handleChange}
          ></input>
          <button className="auth__button" type="submit">
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
