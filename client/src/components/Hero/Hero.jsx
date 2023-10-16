import React from "react";
import "./Hero.css";
import CountUp from "react-countup"

import {motion, spring} from 'framer-motion'
import SearchBar from "../SearchBar/SearchBar";
const Hero = () => {
  return (
    <section className="hero-wrapper">
      <div className="paadings innerWidth flexCenter hero-container ">
        {/* l--- */}

        <div className="flexColStart hero-left">
          <div className="hero-title">
            <div className="orange-circle"/>
            <motion.h1
              initial = {{y:"2rem",opacity:0}}
              animate={{y:0,opacity:1}}
              transition={{
                duration :2,
                type:"spring"
              }}
            >

              Discover <br />
              Most Suitable <br />
              Property
            </motion.h1>
          </div>

          <div className="flexColStart hero-des">
            <span className="secondaryText">
              Find a variety of properties that suit you very easilty
            </span>
            <span className="secondaryText">
              Forget all difficulties in finding a residence for you 
            </span>
          </div>
          {/* Search Bar */}

          <SearchBar />

          <div className="flexCenter stats">
            <div className="flexColCenter stat">
              <span>
                  <CountUp start={8800} end ={9000} duration={4}/>
                <span>+</span>
                </span>
                <span className="secondaryText">Premium Products</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                  <CountUp start={1950} end ={2000} duration={4}/>
                <span>+</span>
                </span>
                <span className="secondaryText">Premium Products</span>
            </div>
            <div className="flexColCenter stat">
              <span>
                  <CountUp  end ={20} duration={4}/>
                <span>+</span>
                </span>
                <span className="secondaryText">Happy Customers</span>
            </div>
          </div>
        </div>

        {/* r----- */}
        <div className="flexCenter hero-right">
          <motion.div 
            initial={{x:"7rem",opacity:0}}
            animate={{ x: "0px", opacity: 1}}
            transition={{duration:2,type:"spring"}}
          className="image-container">
            <img src="./hero-image.png" alt="" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
