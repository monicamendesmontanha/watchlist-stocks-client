import React, { useState } from "react";
import logo from "./stocklogo.svg";
import gravexample from "./grav.png";
import "./Menu.scss";

const MenuDropdown = props => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div className="menu">
      <header>
        <img className="logo" src={logo} alt=" " />
        <div className="header-bar">
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
                  <nav id="drop-down">
                    <div className="nav-item">Account</div>
                    <div className="nav-item">{props.user.name}</div>
                    <button className="nav-item" onClick={props.onLogout}>
                      Logout
                    </button>
                  </nav>
                </>
              ) : null}
            </>
          ) : (
            <button onClick={props.onLogin}>Login</button> // once the user goes to log in, there it can go to signup
          )}
        </div>
      </header>
    </div>
  );
};

export default MenuDropdown;

// <p className="user-gravatar">{props.user.gravata}</p>
