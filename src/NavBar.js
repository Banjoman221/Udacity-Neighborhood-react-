import React, { Component } from "react";
import Input from "./Input";

class NavBar extends Component {
  render() {
    let toggleNav;
    let nav;
    if (this.props.navToggled === false ) {
        toggleNav = this.props.openNav;
        nav = 'navigate'
    } else {
        toggleNav = this.props.closeNav;
        nav='navBar'
    }
    return (
      <div className="navComponent">
        <div className={nav}>
            <div className="nav" onClick={toggleNav}>
                <div className="hamburgerMenu" />
                <div className="hamburgerMenu" />
                <div className="hamburgerMenu" />
            </div>
        </div>
        {this.props.navToggled && (
          <div className="titleBar">
            <Input
              addresses={this.props.filteredMarkers}
              updateQuery={this.props.updateQuery}
              clickMarker={this.props.openClick}
              toggleNav={toggleNav}
            />
          </div>
        )}
      </div>
    );
  }
}

export default NavBar;
