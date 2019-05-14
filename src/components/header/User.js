import React from "react";
import MenuDropdown from "./Menu";
import "./User.scss";

const User = props => {
  return (
    <div className="App">
      <MenuDropdown
        user={props.currentUser}
        onLogout={props.logout}
        onLogin={props.login}
      />
    </div>
  );
};

export default User;
