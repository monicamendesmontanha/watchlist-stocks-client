import React, { useState } from "react";
import logo from "./stocklogo.svg";
import gravexample from "./grav.png";
import "./Menu.scss";

const MenuDropdown = props => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div className="menu">
      <header>
        <div className="second-box" />
        <a href="http://localhost:3000/#/">
          <img className="logo" src={logo} alt=" " />
        </a>

        <p className="signed-in-user-gravatar"> </p>
        {props.user ? (
          <>
            <img className="gravatar" src={gravexample} alt=" " />
            <input id="burger" type="checkbox" />
            <label
              id="label-menu"
              for="burger"
              onClick={() => setMenuVisible(!menuVisible)}
            >
              <span className="nav-line" />
              <span className="nav-line" />
              <span className="nav-line" />
            </label>

            {menuVisible ? (
              <>
                <nav className="drop-down">
                  {/* <div className="nav-item">Account</div> */}
                  <div className="nav-item">{props.user.name}</div>
                  <button
                    className="nav-item nav-button"
                    onClick={props.onLogout}
                  >
                    Logout
                  </button>
                </nav>
              </>
            ) : null}
          </>
        ) : (
          <button className="login-button" onClick={props.onLogin}>
            Login
          </button> // once the user goes to log in, there it can go to signup
        )}
      </header>
    </div>
  );
};

export default MenuDropdown;

// <p className="user-gravatar">{props.user.gravata}</p>
