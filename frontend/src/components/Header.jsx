import logo from '../images/logo.svg'
import { Route, Link, Switch } from "react-router-dom";

function Header({email}) {
  return (
    <header className="header">
        <img
          src={logo}
          alt="логотип Место"
          className="header__logo"
        />
        <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__navigation link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__navigation link">
            Регистрация
          </Link>
        </Route>
        <Route path="/">
          <Link to="/sign-in" className="header__navigation link">
            <p className="header__email">{email}</p><p className="header__escape">Выйти</p>
          </Link>
        </Route>
      </Switch>
      </header>
  );
}

export default Header;
