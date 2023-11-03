import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";

import OutSideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModel from "../AddPropertyModel/AddPropertyModel";

import useAuthCheck from "../../hooks/useAuthCheck"

const Header = () => {

  const [modalOpened,setModalOpened] = useState(false)


  const [menuOpened, setMenuOpened] = useState(false);
  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { right: !menuOpened && "-100%" };
    }
  };

  const {validateLogin} = useAuthCheck()
  
  const handleAddPropertyClick =()=>{
    if(validateLogin()){
      setModalOpened(true)
    }
  }
  const {loginWithRedirect,isAuthenticated,user,logout} = useAuth0()

  
  
  return (
    <section className="h-wrapper">
      <div className="flexCenter paddings innerWidth h-container">
        {/* LOgo */}
        <Link to="/">
  <img src={`./logo.png?${new Date().getTime()}`} alt="" width={200} />
</Link>

        <OutSideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div className="flexCenter h-menu" style={getMenuStyles(menuOpened)}>
            <NavLink to="/properties">Properties</NavLink>
           

            <a href="mailto:rejoywilson11@gmail.com">Contact</a>
            
              {/* Add property */}
            <div onClick={handleAddPropertyClick}>Add Property</div>
              <AddPropertyModel opened={modalOpened} setOpened={setModalOpened}/>
             {/* Login Button */}
             {
                  !isAuthenticated ? (
                    <button className="button" onClick={loginWithRedirect}>
                    Login
                   </button>
                  ):(
                    <ProfileMenu user={user} logout={logout}/>
                  )}
            
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
