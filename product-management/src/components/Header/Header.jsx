import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/Login/Login.action";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async() => {
    await dispatch(logoutUser());
    navigate("/");
  };
  return (
    <div className="phone-header">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/product">
          <b>Product Page</b>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul
            className="navbar-nav ml-auto  justify-content-end mt-2 mt-lg-0"
            style={{ flex: "auto" }}
          >
            <li className="nav-item active">
              <button className="secondary-btn" onClick={handleLogOut}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
export default Header;
