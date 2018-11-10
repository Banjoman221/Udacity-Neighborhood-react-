import React, { Component } from "react";
import Input from "./Input";

class NavBar extends Component {
  render() {
    let toggleNav;
    let ariaExpanded;
    let nav;
    let tab;
    if (this.props.navToggled === false) {
        /*
        * If navToggled is false change class and open navBar and change aria accessability
        */
        toggleNav = this.props.openNav;
        nav = 'navigate'
        ariaExpanded = 'false'
        tab='0'
    } else {
        /*
        * If the navigation bar is open change all back to where it was
        */
        tab='-1'
        ariaExpanded = 'true'
        toggleNav = this.props.closeNav;
        nav='navBar'
    }


    return (
      <nav className="navComponent">
          {/* Navbar with hamburgerMenu */}
        <div className={nav}>
            <a className="nav" href='#sideBar' onClick={toggleNav} role='button' aria-expanded={ariaExpanded} aria-label="Open main menu" tabIndex={tab}>
                <div className="hamburgerMenu" />
                <div className="hamburgerMenu" />
                <div className="hamburgerMenu" />
            </a>
        </div>
        {/* Input for filtering results */}
        {this.props.navToggled && (
          <div className="sideBar">
            <Input
              addresses={this.props.filteredMarkers}
              updateQuery={this.props.updateQuery}
              clickMarker={this.props.openClick}
              toggleNav={toggleNav}
              foursquare={this.props.foursquare}
              query={this.props.listQuery}
            />
    </div>
        )}
    </nav>
    );
  }
}

export default NavBar;
