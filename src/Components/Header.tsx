import React, { Component} from "react";
import ParticlesBg from "particles-bg";
import "animate.css";


interface HeaderProps {
  data: any;
}

interface HeaderState {}

class Header extends Component<HeaderProps, HeaderState> {
  render() {
    if (this.props.data) {
      var name = this.props.data.name;
      var occupation = this.props.data.occupation;
      var description = this.props.data.description;
      var city = this.props.data.address.city;
      var networks = this.props.data.social.map(function (network: any) {
        return (
          <li key={network.name}>
            <a href={network.url}>
              <i className={network.className}></i>
            </a>
          </li>
        );
      });
    }
/*
    if (Object.keys(this.props.navProps).length !== 0) {
      console.log(this.props.navProps);
      var navProps = this.props.navProps.map(
        (navItem: { name: string; link: string }) => {
          return (
            <li>
              <a className="smoothscroll" href={"#" + navItem.link}>
                {navItem.name}
              </a>
            </li>
          );
        }
      );
      var navBar = () => {
        return (
          <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            {navProps}
          </ul>
        </nav>
        )
      }
    }
    */
    return (
      <header id="home">
        <ParticlesBg type="lines" bg={true} />
        <nav id="nav-wrap">
          <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
            Show navigation
          </a>
          <a className="mobile-btn" href="#home" title="Hide navigation">
            Hide navigation
          </a>

          <ul id="nav" className="nav">
            <li className="current">
              <a className="smoothscroll" href="#home">
                Home
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#about">
                About
              </a>
            </li>

            <li>
              <a className="smoothscroll" href="#resume">
                Resume
              </a>
            </li>
            <li>
              <a className="smoothscroll" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="row banner">
          <div className="banner-text animate__animated animate__bounceIn">
            <h1 className="responsive-headline">I'm {name}.</h1>
            <h3>
              I'm a {city} based <span>{occupation}</span>. {description}.
            </h3>
            <hr />
            <ul className="social">{networks}</ul>
          </div>
        </div>

        <p className="scrolldown">
          <a className="smoothscroll" href="#about">
            <i className="icon-down-circle"></i>
          </a>
        </p>
      </header>
    );
  }
}

export default Header;