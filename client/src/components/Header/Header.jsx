import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";

import OutSideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        {/* LOgo */}
        <Link to="/">
          <img src="./logo.png" alt="" width={200} />
        </Link>

        <OutSideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
           

            <a href="mailto:rejoywilson11@gmail.com">Contact</a>
             {/* Login Button */}
             <button className="button">
              Login
             </button>
          </div>
        </OutSideClickHandler>

        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
{/* <a href="">
          Residencies
        </a>
        <a href="">Our Value</a>
        <a href="">Contact Us</a>
        <a href="">Get Started</a> */}