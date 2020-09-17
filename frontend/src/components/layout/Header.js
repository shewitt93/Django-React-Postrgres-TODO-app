import React, { Component } from "react";
import PropTypes from "prop-types";

function Header(props) {
  const logged_out_nav = (
    <ul>
      <li onClick={() => props.display_form("login")}>login</li>
      <li onClick={() => props.display_form("signup")}>signup</li>
    </ul>
  );

  const logged_in_nav = (
    <ul>
      <li onClick={props.handle_logout}>logout</li>
    </ul>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

Header.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired,
};

// class Header extends Component {
//   render() {
//     return (
//       <div className="ui inverted menu" style={{ borderRadius: "0" }}>
//         <a className="header item">TDT</a>
//         <a className="item">Dashboard</a>
//         <a className="item">User</a>
//         <a className="item">Settings</a>
//       </div>
//     );
//   }
// }

export default Header;
